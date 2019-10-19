import { trigger, style, state, transition, animate } from '@angular/animations';

export let expandToSide = trigger('throwIn', [
  state('void', style({ width: 0, flexGrow: 0 })),
  transition('void <=> *', [animate(750)])
]);
export let dropDown = trigger('dropDown', [
  state('open', style({ opacity: 1 })),
  state('close', style({ opacity: 0 })),
  transition('* <=> *', [animate(750)])
]);
