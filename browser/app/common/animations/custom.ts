import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function moveToAnimation(): AnimationTriggerMetadata {
  return trigger('moveTo', [
    state('hidden', style({display: 'none'})),
    state('sized', style({display: 'block'})),
    state('positioned',
      style({top: '{{et}}', left: '{{el}}'}),
      {params: {et: '15px', el: '15px'} }
    ),

    transition('sized => positioned', animate('{{timing}}' + 'ms ' + '{{easing}}'), {params: {timing: 140, easing: 'ease-in-out'}}),
    transition('positioned => void', [
      animate('{{timing}}' + 'ms ' + '{{easing}}', style({
        transform: 'translate3d(-100%, -100%, -50%)'
      }))
    ], {params: {timing: 140, easing: 'ease-in-out'}})
  ]);
}
