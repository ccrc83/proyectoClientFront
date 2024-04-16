import { Component,OnInit, Inject, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MaterialModule} from '../../modules/material/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientsService } from '../../services/clients.service';
import { ClientDTO, Clients } from '../../model/client.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';



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
  clientData: Clients;
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
    this.isEditing = !!this.data.client.sharedKey;
    this.clientForm = this.formBuilder.group({
      sharedKey: [(this.clientData as Clients).sharedKey, Validators.required],
      businessId: [(this.clientData as Clients).businessId, Validators.required],
      email: [(this.clientData as Clients).email, [Validators.required, Validators.email]],
      phone: [(this.clientData as Clients).phone, Validators.required],
      dataAdded: [(this.clientData as Clients).dataAdded, Validators.required]
    });
  }

  save(client: ClientDTO) {
    this.subscription$ = [
      ...this.subscription$,
      this.clientServices.createClient(client).subscribe(res => {
      })
    ];
  }

  
  edit(client: ClientDTO) {
    this.subscription$ = [
      ...this.subscription$,
      this.clientServices.createClient(client).subscribe(res => {
      })
    ];
  }
  isEditing: boolean = false;
  onSubmit() {
    

    if (this.isEditing){
      const ClientDTO= {      
        businessId: this.clientForm.controls['businessId'].value,
        email: this.clientForm.controls['email'].value,
        phone: this.clientForm.controls['phone'].value,
        dataAdded:null
      };
      this.edit(ClientDTO);
    }
    else {
        const Clients= {      
          businessId: this.clientForm.controls['businessId'].value,
          email: this.clientForm.controls['email'].value,
          phone: this.clientForm.controls['phone'].value,
          dataAdded:null
        };
        this.save(Clients);
      
    }
    
    this.dialogRef.close(this.clientForm.value);
  }

  clearForm() {
    this.clientForm.reset();
  }

  closeDialog() {
    this.dialogRef.close(this.clientForm.value);
  }

  

}