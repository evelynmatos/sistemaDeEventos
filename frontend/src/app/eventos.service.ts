import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from './views/models/evento.model';


@Injectable({
  providedIn: 'root'
})
export class EventosService {

  eventosUrl = 'http://localhost:3000/eventos';

  constructor(
    private http: HttpClient
  ) { }

  cadastrar(eventao: Evento){
    return this.http.post(this.eventosUrl, eventao);
  }

  
  /*cadastrar(eventao: Evento): Observable <Evento>{
    return this.http.post(this.eventosUrl, eventao);
  }*/

  /*listar(){
    return this.http.get<any[]>(`${this.eventosUrl}`);
  }*/

  listar(){
    return this.http.get<Array<any>>(this.eventosUrl);
  }

  /*excluir(id: string){
    return this.http.delete<>(`${this.eventosUrl}`);
  }*/
}
