import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clients, ClientDTO } from '../model/client.model';



@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) {}

  getAllClients(page: number = 0, size: number = 50): Observable<Clients[]> {
    const params = { page, size };
    return this.http.get<Clients[]>(`${this.apiUrl}/getAllClients`, { params });
  }

  getClientBySharedKey(sharedKey: string): Observable<Clients> {
    return this.http.get<Clients>(`${this.apiUrl}/search?sharedKey=${sharedKey}`);
  }

  createClient(client: ClientDTO): Observable<Clients> {
    return this.http.post<Clients>(`${this.apiUrl}/createClient`, client);
  }

  deleteClient(sharedKey: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteClient?sharedKey=${sharedKey}`);
  }
}