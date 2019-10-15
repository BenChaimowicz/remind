import { trigger, style, state, transition, animate } from '@angular/animations';

export let expandToSide = trigger('throwIn', [
  state('void', style({ width: 0, flexGrow: 0 })),
  transition('void <=> *', [animate(750)])
]);
