import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { CompanyUpdateComponent } from './components/company-update/company-update.component';
import { DumpsterCreateComponent } from './components/dumpster-create/dumpster-create.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { RedefinirComponent } from './components/redefinir/redefinir.component';
import { SolicitacaoComponent } from './components/solicitacao/solicitacao.component';


const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  {path: 'createuser', component: CadastroComponent},
  { path: 'redefinirSenha', component: RedefinirComponent },

  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'solicitacao', component: SolicitacaoComponent },
      { path: 'clientManager', component: ClienteListComponent },
      { path: 'client/update/:id', component: ClienteUpdateComponent },
      { path: 'company/update/:id', component: CompanyUpdateComponent },
      { path: 'dumpster/create', component: DumpsterCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
