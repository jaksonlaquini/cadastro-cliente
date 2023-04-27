import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmacaoDialogComponent } from './core/components/confirmacao-dialog/confirmacao-dialog.component';
import { FiltroComponent } from './core/components/filtro/filtro.component';
import { NavMainComponent } from './core/components/nav-main/nav-main.component';

import { MatNativeDateModule } from '@angular/material/core';

import localePt from '@angular/common/locales/pt';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorCustom } from './core/components/paginator/paginator.component';
import { PopupDialogComponent } from './core/components/popup/popup-dialog.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { ClienteUpdateComponent } from './pages/cliente/cliente-update/cliente-update.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ListarClienteComponent } from './pages/cliente/listar-cliente/listar-cliente.component';
import { TabelaClienteComponent } from './pages/cliente/listar-cliente/tabela-cliente/tabela-cliente.component';
import { MessageService } from './services/message.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    NavMainComponent,
    ConfirmacaoDialogComponent,
    ClienteComponent,
    ListarClienteComponent,
    TabelaClienteComponent,
    ClienteFormComponent,
    ClienteUpdateComponent,
    FiltroComponent,
    PopupDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [
    MatPaginatorCustom,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
