import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { PlayersService } from '../service/players.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatInputModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingpageComponent {
  constructor(private router: Router){}
  getPlayerInfo(){
    this.router.navigateByUrl('playerinfo')
  }
  addPlayer(){
    this.router.navigateByUrl('addplayer')
  }
  getPublicPlayerInfo(){
    this.router.navigateByUrl('publicAPI')
  }
}
