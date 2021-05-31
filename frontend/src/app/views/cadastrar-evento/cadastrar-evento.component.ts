import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventosService } from 'src/app/eventos.service';
import { Evento } from '../models/evento.model';

@Component({
  selector: 'app-cadastrar-evento',
  templateUrl: './cadastrar-evento.component.html',
  styleUrls: ['./cadastrar-evento.component.css']
})
export class CadastrarEventoComponent implements OnInit {

  queryField = new FormControl();

  arrEventos: Array<any>;
  evento: any;

  participantes = [
    {
      nome: "",
      setor: "",
      patrocinador: "",
      valor: ""
    }
  ]

  constructor(
    private router: Router,
    private eventosService: EventosService    

  ) { }

  ngOnInit(): void {
  }

  adicionarParticipante(){
    this.router.navigate(['/adicionarParticipante']);
    console.log('Participante adicionado');
  }

  /*salvar(frm: FormGroup){
    console.log(frm);
    //  this.router.navigate(['/cadastrarEventos']);
        this.eventosService.cadastrar(this.evento)
        .subscribe(resposta => {
          this.arrEventos.push(resposta);

          frm.reset();
        });
  }*/

  cadastrar(){
    this.eventosService.cadastrar(this.evento)
        .subscribe(resposta => {
          this.arrEventos.push(resposta);
          console.log('teste');
          this.router.navigate(['/eventos']);
        });
  }

  finalizar(){
    console.log('Finalizado');
    this.router.navigate(['/eventos']);
  }

  imprimir(){
    console.log('Imprimir');
  }
}
