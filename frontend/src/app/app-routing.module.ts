import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent} from './views/home/home.component';
import { EventosComponent } from './views/eventos/eventos.component';
import { CadastrarEventoComponent } from './views/cadastrar-evento/cadastrar-evento.component';
import { AdicionarParticipanteComponent } from './views/adicionar-participante/adicionar-participante.component';
import { ParticipantesComponent } from './views/participantes/participantes.component';

const routes: Routes = [
  {
  path: "",
  component: HomeComponent 
  },
  {
  path: "eventos",
  component: EventosComponent 
  },
  {
  path: "cadastrarEventos",
  component: CadastrarEventoComponent
  },
  {
  path: "adicionarParticipante",
  component: AdicionarParticipanteComponent
  },
  {
  path: "participantes",
  component: ParticipantesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
