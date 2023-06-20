import { Component, OnInit } from '@angular/core';
import { LogoutService } from './services/logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private logoutService: LogoutService) {}

  // if we want to restart our countdown on ANY user interaction with the UI
  // @HostListener('document:click')
  // onClick() {
  //   this.logoutService.restartCountdown();
  // }

  ngOnInit(): void {
    this.logoutService.startLogoutCountDown(10000);
  }

  restartCountdown() {
    this.logoutService.restartCountdown();
  }
}
