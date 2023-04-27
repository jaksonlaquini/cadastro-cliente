import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmacaoDialogComponent } from 'src/app/core/components/confirmacao-dialog/confirmacao-dialog.component';
import { Cliente } from 'src/app/domain/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-tabela-cliente',
  templateUrl: './tabela-cliente.component.html',
  styleUrls: ['./tabela-cliente.component.scss'],
})
export class TabelaClienteComponent implements OnInit {
  displayedColumns = ['nome', 'cpf', 'dataCadastro', 'rendaMensal', 'acoes'];
  @Input() dataSource = new MatTableDataSource<Cliente>([]);
  @Output() atualizarTabela = new EventEmitter<void>();

  constructor(
    private clienteService: ClienteService,
    public dialog: MatDialog,
    public messageService: MessageService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async openDialogRemoverCliente(id: string) {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Exclusão de cliente',
        mensagem: 'Deseja realmente EXCLUIR esse cliente?',
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        this.clienteService.removerCliente(id).subscribe((x) => {
          this.messageService.showMessage(
            'Cliente removido com sucesso',
            'success'
          );
        });

        this.atualizarTabela.emit();
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
