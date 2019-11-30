import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  readonly baseUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) {
  }

  getAllTableTypes() {
    return this.http.get(this.baseUrl+'/add-table');
  }

  saveTable(formData) {
    return this.http.post(this.baseUrl+'/add-table', formData)
  }

  getTableDataById(id) {
    return this.http.get(this.baseUrl+'/add-table/'+id)
  }

  updateTableById(id, formData) {
    return this.http.put(this.baseUrl+'/add-table/'+id, formData)
  }

  deleteTableById(id) {
    return this.http.delete(this.baseUrl+'/delete-table/'+id)
  }
}
