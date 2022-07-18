import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  username: string;

  constructor(private authSrv: AuthService) {
  }

  ngOnInit(): void {
    this.authSrv.currentUser.subscribe(user => {
      this.username = user === undefined ? '' : user.name;
    });
  }

  isRegistered() {
    return this.authSrv.isRegistered();
  }

  deregister() {
    this.authSrv.deregister();
  }
}
