import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipanteService } from 'src/app/participante.service';

@Component({
  selector: 'app-adicionar-participante',
  templateUrl: './adicionar-participante.component.html',
  styleUrls: ['./adicionar-participante.component.css']
})
export class AdicionarParticipanteComponent implements OnInit {

  public participantes: Array<any> = [];
  private participanteLista: any;

  constructor(
    private participanteService: ParticipanteService,  
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarParticipantes();
  }
  
  listarParticipantes(){
    this.participanteService.listarParticipantes().subscribe(participantes => {
      this.participanteLista = participantes;
      this.participantes = this.participanteLista.eventos;
    }, err => {
      console.log('Erro ao listar os participantes');
    })
  }
  salvar(){
    this.router.navigate(['/cadastrarEventos']);
    console.log('salvar');
  }

  cancelar(){
    console.log('cancelar');
    this.router.navigate(['/cadastrarEventos']);
  }
}
