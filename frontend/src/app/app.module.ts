import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './views/home/home.component';
import { EventosComponent } from './views/eventos/eventos.component';
import { CadastrarEventoComponent } from './views/cadastrar-evento/cadastrar-evento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { AdicionarParticipanteComponent } from './views/adicionar-participante/adicionar-participante.component';
import { EventosService } from './eventos.service';
import { ParticipanteService } from './participante.service';
import { ParticipantesComponent } from './views/participantes/participantes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EventosComponent,
    CadastrarEventoComponent,
    AdicionarParticipanteComponent,
    ParticipantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [ 
    EventosService,
    ParticipanteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
