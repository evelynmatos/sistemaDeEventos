import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {

  participanteUrl = 'http://localhost:3000/participantes';

  constructor(
    private http: HttpClient
  ) { }

  listarParticipantes(){
    return this.http.get<any>(`${this.participanteUrl}`);
  }
}
