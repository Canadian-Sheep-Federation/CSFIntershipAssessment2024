import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PlayersService } from '../service/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postplayer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatInputModule],
  templateUrl: './postplayer.component.html',
  styleUrl: './postplayer.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PostplayerComponent {
  player: any;
  
  playerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required)
  });

  constructor(private service: PlayersService, private router: Router) {
  }

  onSubmit(){
    console.log(this.playerForm.value);
    this.postPlayer(this.playerForm.value);
    this.router.navigateByUrl('playerinfo')
  }

  postPlayer(player: any){
    this.service.postPlayer(player).subscribe((data) => {
      this.player = data;
      console.log(this.player);
    })
  }

  homepage(){
    this.router.navigateByUrl('');
  }
}
