import { trigger, style, state, transition, animate, query, AnimationTriggerMetadata } from '@angular/animations';

export let expandToSide: AnimationTriggerMetadata = trigger('throwIn', [
  state('void', style({ width: 0, flexGrow: 0 })),
  transition('void <=> *', [animate(750)])
]);
export let dropDown: AnimationTriggerMetadata = trigger('dropDown', [
  state('open', style({ opacity: 1 })),
  state('close', style({ opacity: 0 })),
  transition('* <=> *', [animate(750)])
]);
export let routeAnimation: AnimationTriggerMetadata = trigger('fade', [
  transition('* => *', [
    query(
      ':enter',
      [style({ opacity: 0 })],
      { optional: true }
    ),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('0.5s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
      { optional: true }
    )
  ])

  // transition('* => *', [

  //   query(':enter',
  //     [
  //       style({ opacity: 0, position: 'absolute' })
  //     ],
  //     { optional: true }
  //   ),

  //   query(':leave',
  //     [
  //       style({ opacity: 1, position: 'absolute' }),
  //       animate('0.5s', style({ opacity: 0 }))
  //     ],
  //     { optional: true }
  //   ),

  //   query(':enter',
  //     [
  //       style({ opacity: 0, position: 'absolute' }),
  //       animate('0.5s', style({ opacity: 1 }))
  //     ],
  //     { optional: true }
  //   )

  // ])
]);
