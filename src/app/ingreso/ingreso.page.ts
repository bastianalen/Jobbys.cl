import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  formularioLogin: FormGroup;

  //nombreUsuario = localStorage.getItem('usuario');
  constructor(public router: Router, public menuCtrl: MenuController, private alertController: AlertController, public fb: FormBuilder) { 
    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contrasena': new FormControl("", Validators.required)
    })

  }
    

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  async ingresar(){
    localStorage.setItem('usuario','Denfred16');
    localStorage.setItem('contrasena','1234');


    var datos = this.formularioLogin.value;

    var usuario = localStorage.getItem('usuario');
    var contrasena = localStorage.getItem('contrasena');

    if(this.formularioLogin.invalid){
      const alert = await this.alertController.create({
        header:'Falta información',
        message: 'Debes ingresar los datos solicitados',
        buttons: ['OK']
      });
      await alert.present();
      return;
    } else if (usuario == datos.usuario && contrasena == datos.contrasena){
      localStorage.setItem('autenticado','true');
      this.router.navigate(["/inicio"]);
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
