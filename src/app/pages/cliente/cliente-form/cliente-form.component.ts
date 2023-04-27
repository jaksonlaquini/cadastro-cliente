import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Validacoes } from 'src/app/core/validadores/validacoes';
import { Cliente } from 'src/app/domain/models/Cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Cliente>();
  @Input() btnText!: string;
  @Input() cliente = <Cliente>{};

  clienteForm!: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validacoes.ValidarSobrenomeInformado]],
      cpf: ['', [Validators.required, Validacoes.ValidaCpf]],
      dataNascimento: ['', [Validators.required, Validacoes.validarIdade]],
      email: ['', [Validators.required, Validators.email]],
      rendaMensal: ['', Validators.required],
    });

    if (this.cliente.id) {
      this.clienteForm.get('cpf')?.disable({ onlySelf: true });
    }
  }

  get editar() {
    return this.cliente.id ? false : true;
  }

  submit() {
    Object.values(this.clienteForm.controls).forEach((c) => {
      c.markAsTouched();
      c.updateValueAndValidity();
    });

    if (this.clienteForm.invalid) {
      return;
    }

    this.cliente.dataCadastro = new Date();
    this.onSubmit.emit(this.cliente);
  }

  limparDataNascimento() {
    this.cliente.dataNascimento = null;
    this.clienteForm.get('dataNascimento')?.clearValidators();
    this.clienteForm
      .get('dataNascimento')
      ?.setValidators([Validators.required, Validacoes.validarIdade]);
    this.clienteForm.get('dataNascimento')?.updateValueAndValidity();
  }

  limparFormulario() {
    this.cliente = <Cliente>{};
    this.clienteForm.reset();
    this.clienteForm.get('cpf')?.enable({ onlySelf: true });
  }
}
