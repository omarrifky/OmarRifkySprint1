import { Component, Injectable, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";



@Component({
  selector: 'app-dashboard-items',
  template: `\
  <!DOCTYPE html>
<html ng-app>
<head>

<style>
#products {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#products td, #products th {
    border: 1px solid #ddd;
    padding: 8px;
}

#products tr:nth-child(even){background-color: #f2f2f2;}

#products tr:hover {background-color: red;}

#products th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
}
.btn {
    background-color: DodgerBlue;
    border: none;
    color: white;
    padding: 12px 16px;
    font-size: 16px;
    cursor: pointer;
}

/* Darker background on mouse-over */
.btn:hover {
    background-color: RoyalBlue;
}
</style>
</head>
<body>

<table id="products">
  <tr>
    <th>Name</th>
    <th>Price</th>
    <th>CreatedAt</th>
    <th>UpdatedAt</th>
    <th>Seller</th>
    <th></th>
    <th></th>
    
  </tr>
  <tr>
    <td><input type="text" id="productName" class="form-control"
    formControlName="userNameField" ngModel></td>
    <td><input type="number" min="1" id="productPrice" class="form-control"
    formControlName="userNameField" ngModel></td>
    <td></td>
    <td></td>
    <td></td>
    <td> </td>
    <td><button type="button" class="btn btn-primary" (click)="addProduct()">+</button></td>
  </tr>
<tr *ngFor="let item of data">
  <td>{{item.name}}</td>
  <td>{{item.price}}</td>
  <td>{{item.createdAt}}</td>
  <td>{{item.updatedAt}}</td>
  <td>{{item.sellername}}</td>
  <td><button type="button" class="btn btn-primary" (click)="editProduct(item._id)">Edit</button></td>
  <td><button type="button" class="btn btn-primary" (click)="deleteProduct(item._id)">-</button></td>
 
  </tr>
</table>
</body>
</html>` 
})
export class ProductsComponent implements OnInit
{
  data =[];
  constructor(private http: HttpClient,private router: Router){}

  ngOnInit() 
  {
       this.http.get('http://localhost:3000/api/product/getProducts').
       subscribe(res =>{this.data=res["data"]});
  }

  deleteProduct(ident:string)
  {
    var config = {
                  headers : 
                  {
                      'Content-Type':'application/json'
                  }
              }
    this.http.delete('http://localhost:3000/api/product/deleteProduct/'+ident,config).
    subscribe(res=>{window.location.reload();});
    
  }

  addProduct()
  {
    var user=JSON.parse(localStorage.getItem("user")).username;
    console.log((<HTMLInputElement>document.getElementById("productName")).value);
    console.log((<HTMLInputElement>document.getElementById("productPrice")).value);
    console.log(user);
      var info = 
    JSON.stringify({name:(<HTMLInputElement>document.getElementById("productName")).value,
                  price:(<HTMLInputElement>document.getElementById("productPrice")).value
                ,sellername:user})

        var config = 
     {
            headers : 
            {
                'Content-Type': 'application/json'
            }
        }
        this.http.post(environment.apiUrl+'/product/createProduct/',info, config)
        .subscribe((info:any) => {console.log(info);
            window.location.reload();
        });
        
}
editProduct(ident:string){
    var user=JSON.parse(localStorage.getItem("user")).username;
    var product;
    var pn = (<HTMLInputElement>document.getElementById("productName")).value;
    var pp = (<HTMLInputElement>document.getElementById("productPrice")).value;
    localStorage.setItem('productName',pn);
    localStorage.setItem('productPrice',pp);
    this.http.get('http://localhost:3000/api/product/getProduct'+ident).subscribe(
        res =>{
    product = res['data'];
    
              
        }

    );
    
    this.deleteProduct(ident);
    var info = 
    JSON.stringify({name:localStorage.getItem('productName'),
                  price:localStorage.getItem('productPrice')
                ,sellername:user,updatedAt:Date.now()})
             
    this.insert(pn,pp);

}
insert(pn : string ,pp:string ){
    var user=JSON.parse(localStorage.getItem("user")).username;
    var info = 
    JSON.stringify({name:pn,
                  price:pp
                ,sellername:user,updatedAt:Date.now()});
    console.log(info);
        var config = 
     {
            headers : 
            {
                'Content-Type': 'application/json'
            }
        }
        this.http.post(environment.apiUrl+'/product/createProduct/',info, config)
        
        .subscribe(res => {console.log(info);
            
            this.http.patch('http://localhost:3000/api/product/updateProduct/',info).subscribe(res=>{window.location.reload()})
        });
}
}