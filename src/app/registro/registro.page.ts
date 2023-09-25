import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  //nombreUsuario = localStorage.getItem('usuario');
  constructor( private navController: NavController, public router: Router, private alertController: AlertController, public menuCtrl: MenuController, public fb: FormBuilder) { 

    this.formularioRegistro = this.fb.group({
      'nombreUsuario': new FormControl("", Validators.required),
      'contrasenaPrincipal': new FormControl("", Validators.required),
      'contrasenaValidacion': new FormControl("", Validators.required)
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

  async registrarse(){
    var datosNuevos = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header:'Falta información',
        message: 'Debes ingresar los datos solicitados',
        buttons: ['OK']
      });
      await alert.present();
      return;
    } else if ( datosNuevos.nombreUsuario != '' && datosNuevos.contrasenaPrincipal == datosNuevos.contrasenaValidacion){ 
      localStorage.setItem('usuario', datosNuevos.nombreUsuario);
      localStorage.setItem('contrasena', datosNuevos.contrasenaPrincipal);
      this.router.navigate(["/ingreso"]);
    } else if ( datosNuevos.contrasenaPrincipal != datosNuevos.contrasenaValidacion){ 
      const alert = this.alertController.create({
        header: 'Contraseña invalida',
        message: 'Las contraseñas no coinciden',
        buttons: ['OK']
      });

      (await alert).present();
    } else {
      const alert = this.alertController.create({
        header: 'Error',
        message: 'Datos incorrectos',
        buttons: ['OK']
      });

      (await alert).present();
    }

  }

}
