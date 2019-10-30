import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routeAnimation
  ]
})
export class AppComponent {
  title = 'Remind';

  public getRouterOutletState(outlet): boolean {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
