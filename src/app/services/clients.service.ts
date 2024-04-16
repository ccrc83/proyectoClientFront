import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clients, ClientDTO, ClientsResponse } from '../model/client.model';



@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) {}

  getAllClients(page: number = 0, size: number = 50): Observable<ClientsResponse> {
    const params = { page, size };
    return this.http.get<ClientsResponse>(`${this.apiUrl}/getAllClients`, { params });
  }

  getClientBySharedKey(sharedKey: string): Observable<Clients> {
    return this.http.get<Clients>(`${this.apiUrl}/search?sharedKey=${sharedKey}`);
  }

  createClient(client: ClientDTO): Observable<Clients> {
    return this.http.post<Clients>(`${this.apiUrl}/createClient`, client);
  }

  editClient(client: Clients): Observable<Clients> {
    return this.http.post<Clients>(`${this.apiUrl}/createClient`, client);
  }

  deleteClient(sharedKey: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteClient?sharedKey=${sharedKey}`);
  }
}