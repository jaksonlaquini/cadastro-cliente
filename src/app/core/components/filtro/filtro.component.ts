import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClienteFilter } from 'src/app/domain/models/ClienteFilter';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss'],
})
export class FiltroComponent implements OnInit {
  filtro = <ClienteFilter>{};
  @Output() filtrarCliente = new EventEmitter<ClienteFilter>();
  ngOnInit() {}

  limparDataNascimento() {
    this.filtro.dataNascimento = null;
  }

  pesquisar() {
    if (this.filtro) {
      this.filtrarCliente.emit(this.filtro);
    }
  }
}
