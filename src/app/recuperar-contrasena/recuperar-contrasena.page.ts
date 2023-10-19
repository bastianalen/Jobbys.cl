import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {
  
  correoForm: FormGroup;

  validationMessages = {
    'correo': {
      'required': 'Correo electrónico es requerido.',
      'email': 'Por favor, ingresa un correo electrónico válido.'
    }
  };

  //nombreUsuario = localStorage.getItem('usuario');
  constructor( private alertController: AlertController, private navController: NavController, public menuCtrl: MenuController, private formBuilder: FormBuilder) { 
    this.correoForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    var autenticar = localStorage.getItem('autenticado');
    if( autenticar == 'true'){
      this.navController.navigateRoot('/inicio');
    }
  }

  get correo() {
    return this.correoForm.get('correo');
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  async recuperar(){

    var correoNuevo = this.correoForm.value;

    if(this.correoForm.invalid){
      const alert = await this.alertController.create({
        header:'Falta información',
        message: 'Debes ingresar los datos solicitados',
        buttons: ['OK']
      });
      await alert.present();
      return;
    } else if ( correoNuevo.correo != '' ){ 
      localStorage.setItem('correo', correoNuevo.correo);
      this.navController.navigateRoot('/ingreso');
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
