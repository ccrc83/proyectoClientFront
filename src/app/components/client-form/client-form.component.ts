import { Component,OnInit, Inject, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MaterialModule} from '../../modules/material/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientsService } from '../../services/clients.service';
import { ClientDTO, Clients } from '../../model/client.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


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
  styleUrl: './client-form.component.css',
  providers: [ClientsService]
})

export class ClientFormComponent implements OnInit {
  private _clientServices: ClientsService | undefined;
  clientForm!: FormGroup;
  clientData: Client;
  clients: Clients[] = [];

  dataSource = new MatTableDataSource();
  filteredClients = new MatTableDataSource();

  searchValue = '';
  

  subscription$: Subscription[] = [];

  clientServices=inject(ClientsService);


  constructor(
    
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {
    this.clientData = data.client;
  }

 
  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      sharedKey: [(this.clientData as Client).sharedKey, Validators.required],
      businessId: [(this.clientData as Client).businessId, Validators.required],
      email: [(this.clientData as Client).email, [Validators.required, Validators.email]],
      phone: [(this.clientData as Client).phone, Validators.required],
      dataAdded: [(this.clientData as Client).dataAdded, Validators.required]
    });
  }

  save(client: ClientDTO) {
    this.subscription$ = [
      ...this.subscription$,
      this.clientServices.createClient(client).subscribe(res => {
      })
    ];
  }

  onSubmit() {
    const ClientDTO: ClientDTO = {
      sharedKey: this.clientForm.controls['sharedKey'].value,
      businessId: this.clientForm.controls['businessId'].value,
      email: this.clientForm.controls['email'].value,
      phone: this.clientForm.controls['phone'].value,
      dataAdded:null
    };

    this.save(ClientDTO);
    this.dialogRef.close(this.clientForm.value);
  }

  clearForm() {
    this.clientForm.reset();
  }

  closeDialog() {
    this.dialogRef.close(this.clientForm.value);
  }
}