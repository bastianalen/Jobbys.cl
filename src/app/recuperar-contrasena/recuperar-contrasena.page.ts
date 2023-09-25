import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  //nombreUsuario = localStorage.getItem('usuario');
  constructor( private navController: NavController, public menuCtrl: MenuController) { }

  ngOnInit() {
    var autenticar = localStorage.getItem('autenticado');
    if( autenticar == 'true'){
      this.navController.navigateRoot('/inicio');
    }
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }
}
