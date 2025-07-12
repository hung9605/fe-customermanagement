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
  private  destroy$ = new Subject<void>();
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
    this.destroy$.next();
    this.destroy$.complete();
  }

  public autoScaleChart(input: any): void {
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

  zoomedNode: TreeNode | null = null;

  zoomToNode(node: TreeNode) {
    // Nếu đã zoom node này thì thu nhỏ (toggle)
    if (this.zoomedNode === node) {
      this.zoomedNode = null;
    } else {
      this.zoomedNode = node;
    }
  
    // Scroll vào node sau khi Angular render xong
    setTimeout(() => {
      // Tìm phần tử DOM của node này (dựa vào tên hoặc thuộc tính)
      const inner = this.chartInner.nativeElement;
  
      const nodeElements = Array.from(inner.querySelectorAll('.p-organizationchart-node-content'));
      const targetEl = nodeElements.find((el: Element) =>
        el.textContent?.includes(node.data.name || ''));
      console.log('targetEl',targetEl);

      if (targetEl) {
        (targetEl as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    }, 200);
  }
  
  isZoomedNode(node: TreeNode): boolean {
    return this.zoomedNode === node;
  }
  
  
  
}