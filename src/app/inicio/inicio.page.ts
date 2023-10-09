import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

interface Character {
  name: string;
  image: string;
  id: string;
  
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  personajes: Character[] = [];

  constructor(public menuCtrl: MenuController ,private httpClient: HttpClient) { }



  ngOnInit() {

    this.httpClient.get<any>('https://rickandmortyapi.com/api/character')
    .subscribe((res: any) => {
      console.log(res);
      this.personajes = res.results as Character[]; // Usar la interfaz Character
    });

  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }
}
