import {trigger, state, style, animate, transition, AnimationTriggerMetadata} from '@angular/animations';

export function fade(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('fade', [
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate(timing + ' ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        opacity: 0
      }))
    ])
  ]);
}

export function collapse(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('collapse', [
    state('closed', style({height: 0, position: 'absolute'})),
    state('open', style({height: '*', position: 'absolute'})),
    transition('closed <=> open', animate(timing + ' ' + easing))
  ]);
}

export function zoom(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('zoom', [
    transition(':enter', [
      style({ transform: 'scale(0)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        transform: 'scale(1)'
      }))
    ])
  ])
}

export function slideLeft(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('slideLeft', [
    transition(':enter', [
      style({ transform: 'translateX(100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        transform: 'translateX(-100%)'
      }))
    ])
  ]);
}

export function slideRight(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('slideRight', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        transform: 'translateX(100%)'
      }))
    ])
  ]);
}

export function slideUp(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('slideUp', [
    transition(':enter', [
      style({ transform: 'translateY(100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        transform: 'translateY(-100%)'
      }))
    ])
  ]);
}

export function slideDown(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('slideDown', [
    transition(':enter', [
      style({ transform: 'translateY(-100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        transform: 'translateY(100%)'
      }))
    ])
  ]);
}

export function leftFadeOut(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('leftFadeOut', [
    transition(':enter', [
      style({ transform: 'translateX(100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }))
    ])
  ]);
}

export function rightFadeOut(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('rightFadeOut', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ]);
}

export function upFadeOut(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('upFadeOut', [
    transition(':enter', [
      style({ transform: 'translateY(100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        opacity: 0,
        transform: 'translateY(-100%)'
      }))
    ])
  ]);
}

export function downFadeOut(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('downFadeOut', [
    transition(':enter', [
      style({ transform: 'translateY(-100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ])
  ]);
}

export function leftFade(timings: string, start: string, stop: string, id = ''): AnimationTriggerMetadata {
  return trigger(`leftFade${id}`, [
    transition(':enter', [
      style({ opacity: 0 }),
      style({ transform: `translateX(${start})` }),
      animate(timings)
    ]),
    transition(':leave', [
      animate(timings, style({
        opacity: 0,
        transform: `translateX(${stop})`
      }))
    ])
  ]);
}

export function rightFade(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('rightFade', [
    transition(':enter', [
      style({ opacity: 0 }),
      style({ transform: 'translateX(-100%)' }),
      animate(timing + ' ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ]);
}

export function upFade(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('upFade', [
    transition(':enter', [
      style({ opacity: 0 }),
      style({ transform: 'translateY(100%)' }),
      animate(timing + ' ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        opacity: 0,
        transform: 'translateY(-100%)'
      }))
    ])
  ]);
}

export function downFade(timing: string, easing: string): AnimationTriggerMetadata {
  return trigger('downFade', [
    transition(':enter', [
      style({ opacity: 0 }),
      style({ transform: 'translateY(-100%)' }),
      animate(timing + ' ' + easing)
    ]),
    transition(':leave', [
      animate(timing + ' ' + easing, style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ])
  ]);
}

