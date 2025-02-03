import { Component, Input, OnInit } from '@angular/core';
import { IEmployee } from '../shared/model/employee';
import { ModelComponent } from '../shared/ui/model/model.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  imports: [ModelComponent, EmployeeFormComponent, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
  isModelOpen = false;
  employees: IEmployee[] = [];
  employee!: IEmployee;


  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.getAllEmployee();

  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe(
      {
        next: (response) => {
          console.log(response)
          this.employees = response?.data || []
        }
      }
    )

  }

  
  loadEmployee(employee: IEmployee) {
    this.employee = employee;
    this.openModel();
  }


  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        console.log(response)
        this.toastr.success(response?.msg);
        this.getAllEmployee();
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllEmployee();

  }
}
