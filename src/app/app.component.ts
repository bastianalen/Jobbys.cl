import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Share } from '@capacitor/share';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'inicio', icon: 'home' },
    { title: 'Servicios', url: 'servicios', icon: 'hammer' },

  ];
  constructor(public router: Router, private menu: MenuController) {}

  compartirAPP() {
    Share.share({
      title:'Compartir APP',
      url: 'https://jobbys.cl/',
      dialogTitle: 'Jobbys APP',
    });
  }

  cerrarSesion(){
    localStorage.removeItem('autenticado');
    this.router.navigate(["/ingreso"]);
    this.menu.close();
  }
}
