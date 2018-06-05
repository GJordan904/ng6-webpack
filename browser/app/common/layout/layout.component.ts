import { Component } from '@angular/core';
import { CommonComponent } from '../common-component';
import { MediaQueryService } from '../media-queries/media-query.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends CommonComponent {
  public year: string;

  constructor(public mQuery: MediaQueryService) {
    super(mQuery);
    this.year = new Date().getFullYear().toString();
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }
}
