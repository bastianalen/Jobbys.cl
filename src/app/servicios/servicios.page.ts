import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Product {
id: string;
title: string;
image:string;

}

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  productos: Product[] = []; 


  constructor(private httpClient:HttpClient) { }

  ngOnInit() {

    this.httpClient.get<any>('https://fakestoreapi.com/products')
    .subscribe((res: any) =>{
      console.log(res);
      this.productos = res as Product[]

    });

  }

}
