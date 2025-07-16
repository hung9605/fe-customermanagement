import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, AfterViewChecked, AfterViewInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OgranizationService } from './ogranization.service';
import OgranizationDb from './ogranizationDb';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ogranization',
  templateUrl: './ogranization.component.html',
  styleUrls: ['./ogranization.component.scss']
})
export class OgranizationComponent implements OnInit, OnDestroy {
  @ViewChild('chartWrapper', { static: false }) chartWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('chartInner', { read: ElementRef }) chartInner!: ElementRef<HTMLDivElement>;
  sLevel = Array.from({ length: 5 }, (_, i) => ({
    level: i + 1
  }));
  orData!: TreeNode[];
  data!: OgranizationDb[];
  selectedNodes!: TreeNode[];
  initFirst = true;
  zoomLevel = 1.5;
  scale = true;
  private  destroy$ = new Subject<void>();
  zoomedNode: HTMLElement | null = null;
  filteredData: TreeNode[] = [];
  isSearching = false;
  level: any = {level:0};
  constructor(
    private oganizationService: OgranizationService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.oganizationService.getList().pipe(takeUntil(this.destroy$)).subscribe(({ data }) => {
      this.data = data;
       this.orData = this.formatMenu(this.data, null);
      // console.log('getByLevel', this.getNodesAtLevel(this.orData,2,0 ));
      
      this.ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          this.autoScaleChart(0);
          this.initFirst = false;
        });
      });
    });
  }

  formatMenu(items: OgranizationDb[], parentId: any): TreeNode[] {
    return items
      .filter(item => item.parentId === parentId)
      .map(item => ({
        type: 'person',
        expanded: true,
        styleClass: item.styleClass,
        data: {
          image: item.image,
          title: item.role,
          name: item.fullName
        },
        children: this.formatMenu(items, item.id)
      }));
  }

  ngOnDestroy(): void {
    document.removeEventListener('click',this.onclickOutSide);
    this.destroy$.next();
    this.destroy$.complete();
  }

  autoScaleChart(input: any): void {
    this.scale = false;
    const wrapper = this.chartWrapper.nativeElement;
    const inner = this.chartInner.nativeElement;
    if (input == 1) {
      inner.style.transition = 'transform 0.5s ease';
      inner.style.transform = '';
      setTimeout(() => {
        wrapper.scrollLeft = (wrapper.scrollWidth - wrapper.clientWidth) / 2;
        wrapper.scrollTop = (wrapper.scrollHeight - wrapper.clientHeight) / 2;
      }, 500);
      return;
    }
    const scaleX = wrapper.clientWidth / inner.scrollWidth;
    const scaleY = wrapper.clientHeight / inner.scrollHeight;
    const scale = Math.min(scaleX, scaleY, 1);
    inner.style.transition = 'transform 1.2s ease';
    inner.style.transform = `scale(${scale})`;
    inner.style.transformOrigin = 'top left';
    this.scale = true;
  }

  private onclickOutSide = (event: Event) =>{
    if(this.zoomedNode && !this.zoomedNode.contains(event.target as Node)){
      this.resetZoom();
    }
  }

  resetZoom(){
    if(this.zoomedNode){
      this.zoomedNode.style.transition = 'transform 0.5s ease';
      this.zoomedNode.style.transform = '';
      this.zoomedNode.style.zIndex = ''; 
      this.zoomedNode = null;
    }
    document.removeEventListener('click',this.onclickOutSide);
  }

  zoomToNode(node: TreeNode) {
    if(!this.scale){
      return;
    }
    setTimeout(() => {
      const inner = this.chartInner.nativeElement;
      const wrapper = this.chartWrapper.nativeElement;
      const nodeElements = Array.from(inner.querySelectorAll('.p-organizationchart-node-content'));
      const targetEl = nodeElements.find((el: Element) =>
      el.textContent?.includes(node.data.name || ''));
      if (!targetEl) {
        return;
      };
        const target = targetEl as HTMLElement;
        if (this.zoomedNode === target) {
          this.resetZoom();
          return;
        }
        const scale = 10;
        nodeElements.forEach(el => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.transition = 'transform 0.5s ease';
          htmlEl.style.transform = '';
          htmlEl.style.zIndex = '';
        });
        target.style.transition = 'transform 0.5s ease';
        target.style.transform = `scale(${scale})`;
        target.style.transformOrigin = 'top left';
        target.style.zIndex = '9999';
        this.zoomedNode = target;
        document.removeEventListener('click', this.onclickOutSide);
        document.addEventListener('click', this.onclickOutSide);
    }, 0);
  }

  search(){
    this.filteredData = this.getNodesAtLevel(this.orData,this.level.level,0 );
    this.isSearching = true;
  }

   getNodesAtLevel(tree: TreeNode[], targetLevel: number, currentLevel = 0): TreeNode[] {
    const result: TreeNode[] = []; 
    for (const node of tree) {
      if (currentLevel === targetLevel) {
        result.push(node);
      }
  
      if (node.children) {
        result.push(...this.getNodesAtLevel(node.children, targetLevel, currentLevel + 1));
      }
    }
  
    return result;
  }
  
}