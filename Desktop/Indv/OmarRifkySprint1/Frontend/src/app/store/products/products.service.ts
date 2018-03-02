import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpModule } from '@angular/http';


Injectable()
export class ProductsService {
    constructor( private httpClient: HttpClient){}
    getProducts(){
        return this.httpClient.get(environment.apiUrl + 'product/getProducts');
    }
}