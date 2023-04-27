import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteUpdateComponent } from './pages/cliente/cliente-update/cliente-update.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ListarClienteComponent } from './pages/cliente/listar-cliente/listar-cliente.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cliente/novo', component: ClienteComponent },
  { path: 'cliente/atualizar/:id', component: ClienteUpdateComponent },
  { path: 'clientes', component: ListarClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
