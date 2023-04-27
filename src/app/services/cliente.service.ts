import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PopupDialogComponent } from '../core/components/popup/popup-dialog.component';
import { Cliente } from '../domain/models/Cliente';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}clientes`;
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  criarCliente(formData: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, formData).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  getPaginado(pagina: number, limite: number): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(`${this.apiUrl}/?_page=${pagina}&_limit=${limite}`)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  getFiltroCliente(descricao: string, value: string): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(`${this.apiUrl}?${descricao}=${value}`)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  getById(id: string): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  atualizarCliente(formData: Cliente, id: string): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Cliente>(url, formData).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  removerCliente(id: string): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Cliente>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showPopUp('Ocorreu um erro!', true);
    return EMPTY;
  }

  async showPopUp(mensagem: string, isError: boolean) {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      data: {
        mensagem: mensagem,
        error: isError,
      },
    });

    dialogRef.afterClosed().subscribe((x) => {});
  }
}
