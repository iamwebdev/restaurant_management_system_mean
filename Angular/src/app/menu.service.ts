import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  readonly baseUrl = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  getAllItem(formData) {
    return this.http.get(this.baseUrl+'/add-menu',formData)
  }

  saveItem(formData) {
    return this.http.post(this.baseUrl+'/add-menu',formData)
  }

  getItemById(id) {
    return this.http.get(`${this.baseUrl}/add-menu/${id}`)
  }

  deleteItemById(id) {
    return this.http.delete(`${this.baseUrl}/delete-menu/${id}`)
  }

  updateItemById(formData, id) {
    return this.http.put(`${this.baseUrl}/add-menu/${id}`, formData)
  }
}