import { Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() showhead:boolean = true;
  items = [{label:'tnd'}];
  srcImage = environment.SRC_IMAGE;
}
