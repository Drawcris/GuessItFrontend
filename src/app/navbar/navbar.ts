import { Component } from '@angular/core';
import {inject} from '@angular/core';
import {AuthService} from '../auth/services/auth-service';
import {Router} from '@angular/router';
import {UserProfile} from '../auth/interfaces/my-profile-info';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  userProfile: UserProfile | null = null;

  ngOnInit() {
    this.authService.getCurrentUserInfo().subscribe(user => {
      this.userProfile = user.data;
    })
  }

  onSubmitLogoutButton(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
