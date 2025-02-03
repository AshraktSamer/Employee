import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { IEmployee } from '../shared/model/employee';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule , RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  @Input() data: IEmployee | null = null;
  @Output() onCloseModel = new EventEmitter();

  employeeForm!: FormGroup;

constructor(private fb: FormBuilder,
            private employeeService: EmployeeService,
            private toastr: ToastrService

          ){
    this.employeeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      doj: new FormControl('', [Validators.required]),
    });

}


onClose() {
  this.onCloseModel.emit(false);
}

ngOnChanges(): void {
  if (this.data) {
    this.employeeForm.patchValue({
      name: this.data?.name,
      email: this.data.email,
      mobile: this.data.mobile,
      dob: this.data.dob? formatDate(this.data.dob , "yyyy-MM-dd", 'en') : '',
      doj: this.data.doj,
    });
  }
}

onSubmit() {
  if (this.employeeForm.valid) {
    if (this.data && this.data._id) { 
      const updatedEmployee: IEmployee = {
        ...this.data, 
        ...this.employeeForm.value 
      };
      this.employeeService
      .updateEmployee(updatedEmployee ,this.data._id )
      .subscribe({
          next: (response: any) => {
            this.resetEmployeeForm();
            this.toastr.success(response.message);
          },
        });
    } else {
      this.employeeService.addNewEmployee(this.employeeForm.value).subscribe({
        next: (response: any) => {
          this.resetEmployeeForm();
          this.toastr.success(response.message);
        },
      });
    }
  } else {
    this.employeeForm.markAllAsTouched();
  }
}

resetEmployeeForm() {
  this.employeeForm.reset();
  this.onClose();
}
}


