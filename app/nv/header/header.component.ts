import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {

 @Output() sideNavToggle = new EventEmitter<void>();

 isAuth = false;

 authSubsription: Subscription; // for subscribing and un unsuscribe

  constructor(private authServise: AuthService) { }

  ngOnInit() {
    this.authSubsription = this.authServise.authChange.subscribe(// storing the subscription
      authStatus => {this.isAuth = authStatus;}
      );
  }

  onToggle() {
   this.sideNavToggle.emit();
  }

  ngOnDestroy() {
    this.authSubsription.unsubscribe(); // removes unneedded memory
  }

  onLogout() {
    this.authServise.logout();
  }
}
