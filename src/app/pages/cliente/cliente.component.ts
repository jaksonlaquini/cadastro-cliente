import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupDialogComponent } from 'src/app/core/components/popup/popup-dialog.component';
import { Cliente } from 'src/app/domain/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  btnText = 'Salvar';
  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async createHandler(cliente: Cliente) {
    const formData = new FormData();
    formData.append('id', Math.floor(Math.random() * 100).toString());
    formData.append('nome', cliente.nome);
    formData.append('cpf', cliente.cpf);
    formData.append(
      'dataNascimento',
      cliente.dataNascimento ? cliente.dataNascimento.toDateString() : ''
    );
    formData.append('rendaMendal', cliente.rendaMensal.toString());
    formData.append('email', cliente.email);
    formData.append('dataCadastro', new Date().toDateString());

    try {
      await this.clienteService.criarCliente(cliente).subscribe((x) => {
        this.showPopUp('Cliente adicionado com sucesso!', false);
      });
    } catch (error) {
      this.showPopUp('Ocorreu um erro ao adicionar o cliente.', true);
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
