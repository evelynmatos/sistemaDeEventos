import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipanteService } from 'src/app/participante.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {

  queryField = new FormControl();

  public participantes: any;
  public arrParticipantes: Array<any> = [];

  constructor(
    private router: Router,
    private participanteService: ParticipanteService
  ) { }

  ngOnInit(): void {
    this.listarParticipantes();
  }

  listarParticipantes(){
    this.participanteService.listarParticipantes().subscribe(participantes => {
      this.participantes = participantes;
      this.arrParticipantes = this.participantes.participantes;
    }, err => {
      console.log('Erro ao listar os participantes');
    })
  }

  excluir(){
    console.log('Evento Excluído');
  }

  editar(){
    console.log('Evento Editado');
  }

  cadastrar(){

  }

  finalizar(){
    this.router.navigate(['/eventos']);
  }

}
