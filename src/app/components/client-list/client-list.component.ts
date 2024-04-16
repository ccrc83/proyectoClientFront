import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../modules/material/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form/client-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientsService } from '../../services/clients.service';
import { Subscription } from 'rxjs';
import { ClientDTO, Clients } from '../../model/client.model';


@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MaterialModule, MatToolbarModule,ClientFormComponent,HttpClientModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: [ClientsService]
})
export class ClientListComponent {
  displayedColumns: string[] = [
    'sharedKey',
    'businessId',
    'email',
    'phone',
    'dataAdded',
    'actions',
  ];
  clients: Clients[] = [];

  dataSource = new MatTableDataSource();
  filteredClients = new MatTableDataSource();
  searchValue = '';

  subscription$: Subscription[] = [];

  clientServices=inject(ClientsService);


  constructor(private cdRef: ChangeDetectorRef, public dialog: MatDialog ) {}

  ngOnInit(): void {
    this.getAllClients();
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

  save(client: ClientDTO) {
    this.subscription$ = [
      ...this.subscription$,
      this.clientServices.createClient(client).subscribe(res => {

      })
    ];
  }

  editClient(client: Clients) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: { client: client } // Pasar los datos del cliente como parte de la configuración del diálogo
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  deleteClient(client: Clients) {
    // Remove client from data source
    this.clients = this.clients.filter((c) => c !== client);
    // Update existing data source with filtered data
    this.dataSource.data = this.clients;
    // Update filtered data source
    this.filteredClients.data = this.clients;
    // Apply filter again (optional if using search)
    if (this.searchValue) {
      this.dataSource.filter = this.searchValue.trim().toLowerCase();
    }
    // Trigger change detection
    this.cdRef.detectChanges();
  }

  fetchData() {
    const url = 'your-api-endpoint'; // Replace with your API URL
    return null; //this.http.get<Client[]>(url); // GET request returning an array of Client objects
  }
  filterData() {
    // Convertir el término de búsqueda a minúsculas para hacer coincidencias insensibles a mayúsculas y minúsculas
    const searchTerm = this.searchValue ? this.searchValue.toLowerCase() : '';

    // Filtrar los clientes basados en el término de búsqueda en la columna "Shared Key"
    const filteredClients = this.clients.filter((client) =>
      client.sharedKey.toLowerCase().includes(searchTerm)
    );

    // Actualizar la fuente de datos de la tabla con los clientes filtrados
    this.dataSource.data = filteredClients;
  }

  openClientForm() {
    const dialogRef = this.dialog.open(ClientFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  addNewClient() {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: { client: { sharedKey: '', businessId: '', email: '', phone: '', dataAdded: '' } }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  exportClients() {
    const dataToExport = this.clients.map((client) => ({
      sharedKey: client.sharedKey,
      businessId: client.businessId,
      email: client.email,
      phone: client.phone,
      dataAdded: client.dataAdded,
    }));

    const csvData = this.convertToCSV(dataToExport);
    const blob = new Blob([csvData], { type: 'text/csv' });

    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'clients.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const csv = data.map((row) => Object.values(row).join(',')).join('\n');
    return `${header}\n${csv}`;
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }

}


