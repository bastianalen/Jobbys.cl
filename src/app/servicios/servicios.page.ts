import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


interface Products {
id: string;
title: string;
description: string;
images:string;
}

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  product: Products[] = []; 

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {

    this.httpClient.get<any>('https://api.escuelajs.co/api/v1/products')
    .subscribe((res: any) =>{
      console.log(res);
      var ads = res.splice(0,40);
      console.log(ads);
      this.product = ads as Products[]

    });

  }

}
