import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, MenuController } from '@ionic/angular';

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
  @ViewChild("titulo", { read: ElementRef, static: true }) titulo!: ElementRef;

  personajes: Character[] = [];

  usuario = localStorage.getItem('usuario');

  constructor(public menuCtrl: MenuController ,private httpClient: HttpClient, private animationCtrl: AnimationController) { }



  ngOnInit() {
    this.avanzarDerecha();
    this.httpClient.get<any>('https://rickandmortyapi.com/api/character')
    .subscribe((res: any) => {
      console.log(res);
      this.personajes = res.results as Character[]; // Usar la interfaz Character

    });
  }

  public crecer() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.titulo.nativeElement)
      .duration(2000)
      .iterations(Infinity)
      .fromTo('transform', 'scale3d(1,1,1)', 'scale3d(1.5,1.5,1.5)')
      .fromTo("color", "green", "blue")
      .fromTo('opacity', '1', '0');

    animation.play();
  }

  public avanzarDerecha() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.titulo.nativeElement)
      .duration(5000)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(200px)')
      // .fromTo('color', "blue", "red")
      .fromTo('opacity', '1', '0');

    animation.play();
  }

  ngAfterViewInit(){
    //API clima
    const kelvin =273.15;

    window.addEventListener("load",()  => {

      if (navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position) =>{
          const long = position.coords.longitude;
          const lat = position.coords.latitude;
          const api_id = "a700d3c639907ca980bf1a92065755ea";
          const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_id}`;
          console.log(position);
          

          fetch(url_base)
          .then((response) => {

            console.log("RESPUESTA JSON");
            return response.json();

          })

          .then((data) => {

            console.log("ESTA ES LA DATA")
            console.log(data);
            const temperature = document.querySelector(".temp");
            const summary = document.querySelector(".summary");
            const loc = document.querySelector(".location");
            if (temperature) {
              temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
            }
            if (summary) {
              summary.textContent = data.weather[0].description;
            }
            if (loc) {
              loc.textContent = data.name + "," + data.sys.country;
            }
            
          });

        });

      }
    })

  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }




}
