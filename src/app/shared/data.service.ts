import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  // Add Student
  addStudent(Student: Student) {
    Student.id = this.afs.createId();
    return this.afs.collection('/students').add(Student);
  }

  // Get All Students
  getAllStudents() {
    return this.afs.collection('/students').snapshotChanges();
  }

  // Delete Student
  deleteStudent(student: Student) {
    return this.afs.doc('/students/' + student.id).delete();
  }

  // Update Student
  updateStudent(student: Student) {
    return this.afs.doc('/students/' + student.id).update(student);
  }
  // updateStudent(student: Student) {
  //   this.deleteStudent(student);
  //   this.addStudent(student);
  // }
}
