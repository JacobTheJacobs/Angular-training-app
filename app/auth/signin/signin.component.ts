import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy  {
  maxDate;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authservice: AuthService, private uiService: UIService) {}

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {// implementing the spinner
      this.isLoading = isLoading;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authservice.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
