import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OgranizationService } from './ogranization.service';
import OgranizationDb from './ogranizationDb';
import { take } from 'rxjs';

@Component({
  selector: 'app-ogranization',
  templateUrl: './ogranization.component.html',
  styleUrls: ['./ogranization.component.scss']
})
export class OgranizationComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('chartWrapper', { static: false }) chartWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('chartInner', { static: false }) chartInner!: ElementRef<HTMLDivElement>;

  orData!: TreeNode[];
  data!: OgranizationDb[];
  selectedNodes!: TreeNode[];
  private isScrolled = false;

  constructor(
    private oganizationService: OgranizationService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.oganizationService.getList().subscribe(({ data }) => {
      this.data = data;
      this.orData = this.formatMenu(this.data, null);
      this.isScrolled = false;
    });
  }

  ngAfterViewChecked(): void {
    if (
      !this.isScrolled &&
      this.chartWrapper?.nativeElement &&
      this.chartInner?.nativeElement // ✅ thêm điều kiện này
    ) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          const wrapper = this.chartWrapper.nativeElement;
          wrapper.scrollLeft = (wrapper.scrollWidth - wrapper.clientWidth) / 2;
          this.isScrolled = true;
          console.log('Scrolled to center');
  
          // ✅ Chỉ gọi autoScaleChart khi chắc chắn chartInner đã tồn tại
          this.autoScaleChart();
        }, 0);
      });
    }
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
    // Nếu có subscription, hủy ở đây
  }

  private autoScaleChart(): void {
    // const wrapper = this.chartWrapper.nativeElement;
    // const inner = this.chartInner.nativeElement;
  
    // const scaleX = wrapper.clientWidth / inner.scrollWidth;
    // const scaleY = wrapper.clientHeight / inner.scrollHeight;
    // const scale = Math.min(scaleX, scaleY, 1);
    // console.log('scale',scale);
    
    // // Cách an toàn
    // (inner.style as any).zoom = `${scale}`;
  }
  
  
}
