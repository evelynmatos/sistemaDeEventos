import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventosService } from 'src/app/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  queryField = new FormControl();

  /*public eventos: Array<any> = [];
  private eventosLista: any;*/

  arrEventos: Array<any>;
  evento: any;
  
  constructor(
    private router: Router,
    private eventosService: EventosService    
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  /*listar(){
    this.eventosService.listar().subscribe(eventos => {
      this.eventosLista = eventos;
      this.eventos = this.eventosLista.eventos;
    }, err => {
      console.log('Erro ao listar os eventos');
    })
  }*/

  listar(){
    this.eventosService.listar().subscribe(resposta => this.evento = resposta);
  }

  cadastrar(){
    this.router.navigate(['/cadastrarEventos']);
      /*this.eventosService.cadastrar(this.evento)
      .subscribe(resposta => {
        this.arrEventos.push(resposta);
      });*/
    }

  onSearch(){
    console.log(this.queryField.value);
  }

  excluir(){
    //this.eventosService.excluir();
  }

  editar(){
    console.log('Evento Editado');
  }

  page(){
    this.router.navigate(['/participantes']);
  }
}
