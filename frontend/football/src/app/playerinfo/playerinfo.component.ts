import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PlayersService } from '../service/players.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-playerinfo',
  standalone: true,
  imports: [MatTableModule, FormsModule, ReactiveFormsModule, MatInputModule, NgIf],
  templateUrl: './playerinfo.component.html',
  styleUrl: './playerinfo.component.css'
})
export class PlayerinfoComponent implements OnInit {
  players: any = [];
  player: any;
  displayedColumns: string[] = [];
  playerorpublic: boolean = true;
  playerByID: boolean = true;
  ID = new FormControl();
  constructor(private service: PlayersService, private router: Router) {

  }

  ngOnInit() {
    if (this.router.url.includes('publicAPI')) {
      this.playerorpublic = false;
      this.playerByID = false;
      this.displayedColumns = ['id', 'firstname', 'lastname', 'date_of_birth', 'gender', 'height', 'weight'];
      this.getAllPlayers();
    }
    else {
      this.displayedColumns = ['ID', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'height', 'weight'];
      this.getPlayers();
    }
  }

  getPlayerInfo() {
    this.service.getPlayer(this.ID.value).subscribe((data) => {
      this.players = [data];
      console.log(this.players)
    })
  }

  getAllPlayers() {
    this.service.getAllPlayers().subscribe((data) => {
      this.players = data.data;
    })

  }

  getPlayers() {
    this.service.getPlayers().subscribe((data) => {
      this.players = data.players;
    })

  }

  homepage() {
    this.router.navigateByUrl('');
  }

}
