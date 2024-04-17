import { Component,OnInit, Inject, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MaterialModule} from '../../modules/material/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientsService } from '../../services/clients.service';
import { ClientDTO, Clients } from '../../model/client.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';


@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,DatePipe,MatDatepickerModule,MatInputModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
  providers: [{provide: ClientsService},
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    
  ]
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
      sharedKey: [(this.clientData as Clients).sharedKey, ''],
      businessId: [(this.clientData as Clients).businessId, Validators.required],
      email: [(this.clientData as Clients).email, [Validators.required, Validators.email]],
      phone: [(this.clientData as Clients).phone, Validators.required],
      dataAdded: [(this.clientData as Clients).dataAdded, Validators.required]
    });
    this.isEditing = !!this.data.client.sharedKey;
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
    

    if (this.data.isEditing){
      const ClientDTO= {   
        sharedKey :this.clientForm.controls['sharedKey'].value,
        businessId: this.clientForm.controls['businessId'].value,
        email: this.clientForm.controls['email'].value,
        phone: this.clientForm.controls['phone'].value,
        dataAdded:this.clientForm.controls['dataAdded'].value
      };
      this.edit(ClientDTO);
    }
    else {
        const Clients= {      
          
          businessId: this.clientForm.controls['businessId'].value,
          email: this.clientForm.controls['email'].value,
          phone: this.clientForm.controls['phone'].value,
          dataAdded:this.clientForm.controls['dataAdded'].value
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

  getAllClients() {
    this.subscription$ = [
      ...this.subscription$,
      this.clientServices.getAllClients().subscribe(res => {

        this.clients = res?.content;
        this.filteredClients.data = this.clients;
      })
    ];
  }

}