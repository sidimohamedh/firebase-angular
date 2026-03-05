import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { DataService } from '../../shared/data.service';
import { Student } from '../../model/student';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  studentsList: Student[] = [];

  form: FormGroup = new FormGroup({});
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private fb: FormBuilder,
  ) {
    this.initForm();
    this.getAllStudents();
  }

  initForm() {
    this.form = this.fb.group({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
    });
  }

  logout() {
    this.authService.logout();
  }

  getAllStudents() {
    this.dataService.getAllStudents().subscribe(
      (res) => {
        this.studentsList = res.map((student: any) => {
          const data = student.payload.doc.data();
          data.id = student.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching students');
      },
    );
  }

  addStudent() {
    if (this.form.invalid) {
      alert('Fill all input fields');
      return;
    }

    this.dataService.addStudent(this.form.value);
    this.form.reset();
    this.getAllStudents();
  }

  updateStudent(sutudent: Student) {
    if (sutudent) {
      this.form.patchValue(sutudent);
      sutudent.first_name = this.form.value.first_name;
      sutudent.last_name = this.form.value.last_name;
      sutudent.email = this.form.value.email;
      sutudent.mobile = this.form.value.mobile;
    }
    this.dataService.updateStudent(sutudent);
  }

  deleteStudent(student: Student) {
    if (
      window.confirm(
        'Are you sure you want to delete ' +
          student.first_name +
          ' ' +
          student.last_name +
          '?',
      )
    ) {
      this.dataService.deleteStudent(student);
    }
  }
}
