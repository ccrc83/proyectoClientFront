import { Component,OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MaterialModule} from '../../modules/material/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


// Define la interfaz Client
interface Client {
  sharedKey: string;
  businessId: string;
  email: string;
  phone: string;
  dataAdded: string;
}
@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;
  clientData: Client;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clientData = data.client;
  }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      sharedKey: [this.clientData.sharedKey, Validators.required],
      businessId: [this.clientData.businessId, Validators.required],
      email: [this.clientData.email, [Validators.required, Validators.email]],
      phone: [this.clientData.phone, Validators.required],
      dataAdded: [this.clientData.dataAdded, Validators.required]
    });
  }

  onSubmit() {
    console.log(this.clientForm.value);
    this.dialogRef.close(this.clientForm.value);
  }

  clearForm() {
    this.clientForm.reset();
  }
}