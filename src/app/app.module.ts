import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

//Compomentes do sistema
import { NavComponent } from './components/nav/nav.component';
import { SolicitacaoComponent } from './components/solicitacao/solicitacao.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { LoginComponent } from './components/login/login.component';
import { Toast, ToastrModule } from 'ngx-toastr';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { RedefinirComponent } from './components/redefinir/redefinir.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { CompanyUpdateComponent } from './components/company-update/company-update.component';
import { DumpsterCreateComponent } from './components/dumpster-create/dumpster-create.component';
import { DumpsterListComponent } from './components/dumpster-list/dumpster-list.component';
import { UpdateDumpsterComponent } from './components/update-dumpster/update-dumpster.component';
import { DumpsterDeleteComponent } from './components/dumpster-delete/dumpster-delete.component';
import { ClienteInfoComponent } from './components/cliente/cliente-info/cliente-info.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SolicitacaoDialogComponent } from './components/solicitacao/solicitacao-dialog/solicitacao-dialog.component';
import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { TermsDialogComponent } from './components/terms-dialog/terms-dialog.component';
import { CompanyListComponent } from './components/company-list/company-list.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SolicitacaoComponent,
    ClienteListComponent,
    LoginComponent,
    CadastroComponent,
    RedefinirComponent,
    ClienteUpdateComponent,
    CompanyUpdateComponent,
    DumpsterCreateComponent,
    DumpsterListComponent,
    UpdateDumpsterComponent,
    DumpsterDeleteComponent,
    ClienteInfoComponent,
    SolicitacaoDialogComponent,
    TermsDialogComponent,
    CompanyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-left'
    })
  ],
  providers: [AuthInterceptorProvider, 
    {
      provide: LOCALE_ID,
      useValue: "pt-br",
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
