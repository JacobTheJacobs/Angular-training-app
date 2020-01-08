import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  @Output() closedNav = new EventEmitter<void>();

  isAuth = false;

  authSubsription: Subscription; //for subscribing and un unsuscribe

  constructor(private authServise: AuthService) {}

  ngOnInit() {
    this.authSubsription = this.authServise.authChange.subscribe(
      // storing the subscription
      authStatus => {
        this.isAuth = authStatus;
      }
    );
  }

  onClose() {
    this.closedNav.emit();
  }

  onLogout() {
    this.onClose();
    this.authServise.logout();

  }
}
