import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { A11yModule } from "@angular/cdk/a11y";
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-home-page',
  imports: [MatGridListModule, MatCardModule, MatIconModule, A11yModule, MatTableModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
 
}
