import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginatorCustom } from 'src/app/core/components/paginator/paginator.component';
import { Cliente } from 'src/app/domain/models/Cliente';
import { ClienteFilter } from 'src/app/domain/models/ClienteFilter';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.scss'],
})
export class ListarClienteComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Input() clientes: Cliente[] = [];
  dataSource = new MatTableDataSource<Cliente>([]);
  total = 0;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private paginatorIntl: MatPaginatorCustom
  ) {}

  ngOnInit(): void {
    if (this.paginator) {
      this.paginator._intl = this.paginatorIntl;
      this.paginator.pageSize = 5;
    }
    this.recarregarTabela();
  }

  changePage(evento: PageEvent) {
    this.carregarClientes();
  }

  recarregarTabela() {
    this.carregarTotalClientes();
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService
      .getPaginado(this.paginator.pageIndex + 1, this.paginator.pageSize)
      .subscribe((p) => {
        this.clientes = p;
        this.dataSource.data = p;
      });
  }

  carregarTotalClientes() {
    this.clienteService.getAll().subscribe((p) => {
      this.total = p?.length;
    });
  }

  navigateToClienteNovo(): void {
    this.router.navigate(['/cliente/novo']);
  }

  exibirPesquisa(filtro: ClienteFilter) {
    return filtro && (filtro.nome || filtro.cpf || filtro.dataNascimento);
  }

  filtrar(filtro: ClienteFilter) {
    if (this.exibirPesquisa(filtro)) {
      let descricao: string | Date;
      let value = '';
      if (filtro.nome) {
        descricao = 'nome';
        value = filtro.nome;
      } else if (filtro.cpf) {
        descricao = 'cpf';
        value = filtro.cpf;
      } else {
        descricao = 'dataNascimento';
        value = filtro.dataNascimento
          ? new Date(filtro.dataNascimento).toDateString()
          : '';
      }

      this.clienteService.getFiltroCliente(descricao, value).subscribe((p) => {
        this.dataSource.data = p;
      });
    } else {
      this.carregarClientes();
    }
  }
}
