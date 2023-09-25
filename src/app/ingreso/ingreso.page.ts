import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  formularioIngreso: FormGroup;

  //nombreUsuario = localStorage.getItem('usuario');
  constructor(private navController: NavController, public router: Router, public menuCtrl: MenuController, private alertController: AlertController, public fb: FormBuilder) { 

    this.formularioIngreso = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contrasena': new FormControl("", Validators.required)
    });

  }
    

  ngOnInit() {
    var autenticar = localStorage.getItem('autenticado');
    if( autenticar == 'true'){
      this.navController.navigateRoot('/inicio');
    }
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  async ingresar(){
    var datos = this.formularioIngreso.value;

    var usuario = localStorage.getItem('usuario');
    var contrasena = localStorage.getItem('contrasena');

    if(this.formularioIngreso.invalid){
      const alert = await this.alertController.create({
        header:'Falta información',
        message: 'Debes ingresar los datos solicitados',
        buttons: ['OK']
      });
      await alert.present();
      return;
    } else if (usuario == datos.usuario && contrasena == datos.contrasena){
      localStorage.setItem('autenticado','true');
      this.navController.navigateRoot('/inicio');
      //this.router.navigate(["/inicio"]);
    } else {
      const alert = this.alertController.create({
        header: 'Error',
        message: 'Datos incorrectos',
        buttons: ['OK']
      });

      (await alert).present();
      this.router.navigate(["/ingreso"]);
    }

  }

}
