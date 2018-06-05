export enum Breakpoint {
  Phone     = 'PHONE',
  Tablet    = 'TABLET',
  Standard  = 'STANDARD',
  Wide      = 'WIDE',
  UltraWide = 'ULTRA_WIDE',
}

export interface BreakpointState {
  point: Breakpoint;
  active: boolean;
  mobile: boolean;
}

export const Breakpoints = {
  [Breakpoint.Phone]:     '(max-width: 599px) and (orientation: portrait), ' +
                          '(max-width: 959px) and (orientation: landscape)',

  [Breakpoint.Tablet]:    '(min-width: 600px) and (max-width: 839px) and (orientation: portrait), ' +
                          '(min-width: 960px) and (max-width: 1279px) and (orientation: landscape)',
  [Breakpoint.Standard]:  '(min-width: 1280px) and (max-width: 1919px)',

  [Breakpoint.Wide]:      '(min-width: 1920px) and (max-width: 2559px)',

  [Breakpoint.UltraWide]: '(min-width: 2560px)',
};