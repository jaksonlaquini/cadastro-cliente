import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupDialogComponent } from 'src/app/core/components/popup/popup-dialog.component';
import { Cliente } from 'src/app/domain/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.scss'],
})
export class ClienteUpdateComponent implements OnInit {
  cliente!: Cliente;

  constructor(
    private messageService: MessageService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.clienteService.getById(id).subscribe((p) => {
          if (p) {
            this.cliente = p;
          } else {
            this.messageService.showMessage(
              'Cliente não encontrado!',
              'warning'
            );

            this.router.navigate(['/clientes']);
          }
        });
      } catch (e) {
        this.messageService.showMessage(
          'Ocorreu um erro ao recuperar o cliente',
          'error'
        );

        this.router.navigate(['/clientes']);
      }
    }
  }

  async atualizarHandler(cliente: Cliente) {
    const formData = new FormData();
    formData.append('nome', cliente.nome);
    formData.append('cpf', cliente.cpf);
    formData.append(
      'dataNascimento',
      cliente.dataNascimento
        ? new Date(cliente.dataNascimento).toDateString()
        : ''
    );
    formData.append('email', cliente.email);
    formData.append('rendaMensal', cliente.rendaMensal.toString());
    formData.append('dataCadastro', cliente.dataCadastro.toDateString());

    try {
      await this.clienteService
        .atualizarCliente(cliente, cliente.id!)
        .subscribe((c) => {
          this.showPopUp('Cliente Atualizado com sucesso!', false);
        });
    } catch (error) {
      this.showPopUp('Ocorreu um erro ao atualizar o cliente.', true);
    }
  }

  async showPopUp(mensagem: string, isError: boolean) {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      data: {
        mensagem: mensagem,
        error: isError,
      },
    });

    dialogRef.afterClosed().subscribe((x) => {
      if (!isError) {
        this.router.navigate(['/clientes']);
      }
    });
  }
}
