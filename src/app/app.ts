import { Component, signal } from '@angular/core';
import { RouterLink ,RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Sidenav } from './sidenav/sidenav';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Sidenav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   isLoggedIn = true;
}
