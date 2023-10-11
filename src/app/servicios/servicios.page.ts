import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


interface People {
id: string;
name: string;
username: string;
email:string;
}

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  people: People[] = []; 

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {

    this.httpClient.get<any>(' https://jsonplaceholder.typicode.com/users')
    .subscribe((res: any) =>{
      console.log(res);
      this.people = res as People[]

    });

  }

}
