import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { A11yModule } from "@angular/cdk/a11y";
import {MatTableModule} from '@angular/material/table';
import { inject } from '@angular/core';
import {AuthService} from '../../../auth/services/auth-service';
import {UserProfile} from '../../../auth/interfaces/my-profile-info';


@Component({
  selector: 'app-home-page',
  imports: [MatGridListModule, MatCardModule, MatIconModule, A11yModule, MatTableModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private authService: AuthService = inject(AuthService);

  userProfile: UserProfile | null = null;

  ngOnInit() {
    this.authService.getCurrentUserInfo().subscribe(user => {
      this.userProfile = user.data;
    })
  }

}
