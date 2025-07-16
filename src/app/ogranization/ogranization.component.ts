import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, AfterViewChecked, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
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
  @ViewChildren('chartWrapperList') chartWrapperList!: QueryList<ElementRef>;
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
      this.ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          this.initFirst = false;
          this.autoScaleChart(0);
          
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
    if(this.isSearching ){
      this.autoScaleAllCharts(input);
      return;
    }
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
  zoomToNodeSearch(node: TreeNode) {
    if(!this.scale){
      return;
    }
    setTimeout(() => {
    let target: HTMLElement | null = null;
        this.chartWrapperList.forEach(wrapperRef => {
          const chartEl = wrapperRef.nativeElement;
          const nodeElements = Array.from(chartEl.querySelectorAll('.p-organizationchart-node-content'));
          const match = nodeElements.find(el =>
            (el as HTMLElement).textContent?.includes(node.data.name || '')
          );
          if (match) {
            target = match as HTMLElement;
          }
        });

        if (!target) return;
        const targetNode = target as HTMLElement;
        if (this.zoomedNode === target) {
          this.resetZoom();
          return;
        }

         // 4. Reset zoom cho tất cả node trong cả page
    const allNodes = document.querySelectorAll('.p-organizationchart-node-content');
    allNodes.forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.transition = 'transform 0.5s ease';
      htmlEl.style.transform = '';
      htmlEl.style.zIndex = '';
    });

    // 5. Zoom đúng node
    const scale = 2;
    targetNode.style.transition = 'transform 0.5s ease';
    targetNode.style.transform = `scale(${scale})`;
    targetNode.style.transformOrigin = 'top left';
    targetNode.style.zIndex = '9999';
    this.zoomedNode = targetNode;

    // 6. Gắn listener để click ngoài thì reset
    document.removeEventListener('click', this.onclickOutSide);
    document.addEventListener('click', this.onclickOutSide);

    });
      
  }

  zoomToNode(node: TreeNode) {
    if(!this.scale){
      return;
    }

    if(this.isSearching){
      this.zoomToNodeSearch(node);
    }

    setTimeout(() => {
      const inner = this.chartInner.nativeElement;
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
    setTimeout(() => {
      this.autoScaleAllCharts(0);
    }, 0);
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

  autoScaleAllCharts(scaleMode: number): void {
    this.scale = (scaleMode === 0); // ví dụ nếu bạn dùng nút On/Off scale
  
    this.chartWrapperList.forEach((wrapperRef: ElementRef) => {
      const wrapperEl = wrapperRef.nativeElement as HTMLElement;
      const innerEl = wrapperEl.querySelector('.p-organizationchart') as HTMLElement;
  
      if (!innerEl) return;
  
      if (scaleMode === 1) {
        innerEl.style.transform = '';
        wrapperEl.scrollLeft = (wrapperEl.scrollWidth - wrapperEl.clientWidth) / 2;
        wrapperEl.scrollTop = (wrapperEl.scrollHeight - wrapperEl.clientHeight) / 2;
      } else {
        const scaleX = wrapperEl.clientWidth / innerEl.scrollWidth;
        const scaleY = wrapperEl.clientHeight / innerEl.scrollHeight;
        const scale = Math.min(scaleX, scaleY, 1); // không zoom quá lớn
        innerEl.style.transition = 'transform 0.3s ease';
        innerEl.style.transform = `scale(${scale})`;
        innerEl.style.transformOrigin = 'left center';
        wrapperEl.scrollLeft = (wrapperEl.scrollWidth - wrapperEl.clientWidth) / 2;
        wrapperEl.scrollTop = (wrapperEl.scrollHeight - wrapperEl.clientHeight) / 2;
        this.scale = true;
      }
    });
  }
  
  
}