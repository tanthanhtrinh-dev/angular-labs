
import { slideInAnimation } from './app.animations';
import { Component } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
} from '@angular/router';
import { MessageService } from './messages/message.service';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'Reactive Froms';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  constructor(private authService: AuthService,
              private router: Router, 
              private messageService: MessageService) 
  {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
    this.messageService.isDisplayed = true;
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }
  displayMessages():void{
    this.router.navigate([{outlets: {popup: ['messages']}}]);
    this.messageService.isDisplayed = true;
  }
  hideMessages():void{    
    this.router.navigate([{outlets: {popup: null}}]);
    this.messageService.isDisplayed = false;
  }
  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
}
