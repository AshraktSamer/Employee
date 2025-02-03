import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IEmployee } from '../pages/shared/model/employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = "http://localhost:4000/employee"

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<ApiResponse<IEmployee[]>>{
    return this.http.get<ApiResponse<IEmployee[]>>(`${this.apiUrl}`)
  }

  getEmployee(id: string): Observable<ApiResponse<IEmployee>>{
    return this.http.get<ApiResponse<IEmployee>>(`${this.apiUrl}/${id}`)


  }

  addNewEmployee(employee:IEmployee):Observable<ApiResponse<IEmployee>>{
    return this.http.post<ApiResponse<IEmployee>>(`${this.apiUrl}` , employee)


  }

  updateEmployee(employee:IEmployee , id: string):Observable<ApiResponse<IEmployee>>{
    return this.http.put<ApiResponse<IEmployee>>(`${this.apiUrl}/${id}` , employee)

  }

  deleteEmployee(id:string):Observable<ApiResponse<IEmployee>>{
    return this.http.delete<ApiResponse<IEmployee>>(`${this.apiUrl}/${id}`)


  }


}
