import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BreakpointState } from './media-queries/breakpoints';
import { MediaQueryService } from './media-queries/media-query.service';

export class CommonComponent implements OnInit, OnDestroy {
  protected _unsubscriber: Subject<void> = new Subject();

  constructor(public mQuery: MediaQueryService) { }

  public ngOnInit(): void {
    this.mQuery.breakpointState
      .pipe(takeUntil(this._unsubscriber))
      .subscribe(bps => this.adjustLayout(bps[0]));
  }

  public ngOnDestroy(): void {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

  protected adjustLayout(bps: BreakpointState): void { }

}
