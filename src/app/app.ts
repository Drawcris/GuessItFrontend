import {Component, effect, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Sidenav } from './sidenav/sidenav';
import { Footer } from './footer/footer';
import { inject } from '@angular/core';
import { AuthService } from './auth/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Sidenav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn;


}
