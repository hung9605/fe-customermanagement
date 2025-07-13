import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OgranizationService } from './ogranization.service';
import OgranizationDb from './ogranizationDb';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ogranization',
  templateUrl: './ogranization.component.html',
  styleUrls: ['./ogranization.component.scss']
})
export class OgranizationComponent implements OnInit, OnDestroy {

  @ViewChild('chartWrapper', { static: false }) chartWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('chartInner', { read: ElementRef }) chartInner!: ElementRef<HTMLDivElement>;

  orData!: TreeNode[];
  data!: OgranizationDb[];
  selectedNodes!: TreeNode[];
  initFirst = true;
  zoomLevel = 1.5;
  scale = true;
  private  destroy$ = new Subject<void>();
  zoomedNode: HTMLElement | null = null;
  constructor(
    private oganizationService: OgranizationService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.oganizationService.getList().pipe(takeUntil(this.destroy$)).subscribe(({ data }) => {
      this.data = data;
      this.orData = this.formatMenu(this.data, null);
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.autoScaleChart(0);
          this.initFirst = false;
          this.scale = false;
        }, 0);
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

  public autoScaleChart(input: any): void {
    this.scale = false;
    const wrapper = this.chartWrapper.nativeElement;
    const inner = this.chartInner.nativeElement;
    if (input == 1) {
      (inner.style as any).zoom = '';
      wrapper.scrollLeft = (wrapper.scrollWidth - wrapper.clientWidth) / 2;
      wrapper.scrollTop = (wrapper.scrollHeight - wrapper.clientHeight) / 2;
      return;
    }
    const scaleX = wrapper.clientWidth / inner.scrollWidth;
    const scaleY = wrapper.clientHeight / inner.scrollHeight;
    const scale = Math.min(scaleX, scaleY, 1);
    (inner.style as any).zoom = `${scale}`;
    this.scale = true;
  }

  // zoomToNode(node: TreeNode){
  //   console.log("zoom");
    
  //     const inner = this.chartInner.nativeElement; 
  //     (inner.style as any).zoom = `${this.zoomLevel}`;
  //     setTimeout(() => {
  //       const nodeEl = Array.from(inner.querySelectorAll('.p-organizationchart-node-content'))
  //         .find((el: Element) => el.textContent?.includes(node.data.name || ''));
    
  //       if (nodeEl) {
  //         nodeEl.scrollIntoView({
  //           behavior: 'smooth',
  //           block: 'center',
  //           inline: 'center'
  //         });
  //       }
  //     }, 0);
  // }

  private onclickOutSide = (event: Event) =>{
    if(this.zoomedNode && !this.zoomedNode.contains(event.target as Node)){
      this.resetZoom();
    }
  }

  resetZoom(){
    if(this.zoomedNode){
      this.zoomedNode.style.transform = '';
      this.zoomedNode.style.zIndex = '';
      this.zoomedNode.style.transition = 'transform 0.3s ease';
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
      console.log('targetEl',targetEl);
      
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
          htmlEl.style.transform = '';
          htmlEl.style.zIndex = '';
          htmlEl.style.transition = 'transform 0.3s ease';
        });
        target.style.transform = `scale(${scale})`;
        target.style.transformOrigin = 'center center';
        target.style.zIndex = '10';
        this.zoomedNode = target;
        target.style.transition = 'transform 0.3s ease';
        const currentHeight = target.offsetHeight;
        const newHeight = currentHeight * 2;
        inner.style.height = `${newHeight}px`;
        wrapper.style.height = `${newHeight}px`;
        document.removeEventListener('click', this.onclickOutSide);
        document.addEventListener('click', this.onclickOutSide);
      
    }, 0);
  }
  
 
  
  
}