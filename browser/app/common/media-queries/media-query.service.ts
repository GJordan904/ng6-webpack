import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointState } from '@angular/cdk/layout';
import { Breakpoints, BreakpointState as BS, Breakpoint } from './breakpoints';

@Injectable({
  providedIn: 'root',
  useClass: MediaQueryService,
  deps: [ BreakpointObserver ],
})
export class MediaQueryService {
  public breakpointState: Observable<BS[]>;
  public phone: Observable<BreakpointState>;
  public tablet: Observable<BreakpointState>;
  public standard: Observable<BreakpointState>;
  public wide: Observable<BreakpointState>;
  public ultraWide: Observable<BreakpointState>;

  constructor(private breakpoints: BreakpointObserver) {
    this.createObservers();
  }

  private createObservers() {
    this.phone = this.breakpoints.observe(Breakpoints.PHONE);

    this.tablet = this.breakpoints.observe(Breakpoints.TABLET);

    this.standard = this.breakpoints.observe(Breakpoints.STANDARD);

    this.wide = this.breakpoints.observe(Breakpoints.WIDE);

    this.ultraWide = this.breakpoints.observe(Breakpoints.ULTRA_WIDE);

    const bPoints = [
      this.phone.pipe(map(state => ({ point: Breakpoint.Phone, active: state.matches, mobile: true }) )),
      this.tablet.pipe(map(state => ({ point: Breakpoint.Tablet, active: state.matches, mobile: true }) )),
      this.standard.pipe(map(state => ({ point: Breakpoint.Standard, active: state.matches, mobile: false }) )),
      this.wide.pipe(map(state => ({ point: Breakpoint.Wide, active: state.matches, mobile: false }) )),
      this.ultraWide.pipe(map(state => ({ point: Breakpoint.UltraWide, active: state.matches, mobile: false }) )),
    ];

    this.breakpointState = combineLatest<BS>(bPoints)
        .pipe(map((states: BS[]) => states.filter(state => state.active) ));
  }
}
