import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, interval, takeUntil } from 'rxjs';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-logout-confirm',
  templateUrl: './logout-confirm.component.html',
  styleUrls: ['./logout-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutConfirmComponent implements OnInit, OnDestroy {
  count = 30;

  private destroyed$ = new Subject<void>();

  constructor(
    private changeDetection: ChangeDetectorRef,
    private logoutService: LogoutService,
    private matDialogRef: MatDialogRef<LogoutConfirmComponent>
  ) {}

  ngOnInit(): void {
    interval(1000)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        if (this.count === 1) {
          this.logoutService.ourLogoutFunction();
          this.destroyed$.next();
        }

        this.count--;

        this.changeDetection.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  restartCountdown() {
    this.matDialogRef.close();
    this.logoutService.restartCountdown();
  }
}
