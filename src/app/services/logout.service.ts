import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, timer } from 'rxjs';
import { LogoutConfirmComponent } from '../components/logout-confirm/logout-confirm.component';

@Injectable({ providedIn: 'root' })
export class LogoutService {
  logoutCountdown!: Subscription;
  dialogInstance!: MatDialogRef<LogoutConfirmComponent>;
  storedTimeToLogout!: number;

  constructor(private matDialog: MatDialog) {}

  startLogoutCountDown(timeToLogout: number) {
    this.storedTimeToLogout = timeToLogout;
    this.logoutCountdown = this.createCountdown(timeToLogout).subscribe(() =>
      this.matDialog.open(LogoutConfirmComponent)
    );
  }

  createCountdown(timeToLogout: number): Observable<number> {
    return timer(timeToLogout);
  }

  cancelLogout() {
    this.logoutCountdown.unsubscribe();
  }

  restartCountdown() {
    // we want to be sure that there is an active subscription that we can clear out
    if (this.logoutCountdown) {
      this.cancelLogout();
      this.startLogoutCountDown(this.storedTimeToLogout);
    }
  }

  ourLogoutFunction() {
    // call our specific log out logic
    alert('USER LOGGED OUT!');
  }
}
