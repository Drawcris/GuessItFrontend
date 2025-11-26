import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth-service';
import {UserProfile} from '../auth/interfaces/my-profile-info';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, RouterLink],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  private authService = inject(AuthService);

  isSidenavOpen = false;
  userProfile: UserProfile | null = null;

  ngOnInit() {
    this.authService.getCurrentUserInfo().subscribe(user => {
      this.userProfile = user.data;
    })
  }
}
