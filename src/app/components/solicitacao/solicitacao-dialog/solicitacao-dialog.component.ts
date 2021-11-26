import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateCompany, CreateUser, UserInfo } from 'src/app/models/createUser';
import { CreateuserService } from 'src/app/services/createuser.service';
import { TermsDialogComponent } from '../../terms-dialog/terms-dialog.component';


@Component({
  selector: 'app-solicitacao-dialog',
  templateUrl: './solicitacao-dialog.component.html',
  styleUrls: ['./solicitacao-dialog.component.css']
})
export class SolicitacaoDialogComponent implements OnInit {
  
  clienteInfo: UserInfo = {
    name: '',
    email: '',
    password: '',
    cpf: '',
    phone: '',
    address: '',
    addressnum: ''
  }


  hide = true;
  perfil = 1;

  nome = new FormControl(null, Validators.minLength(3));
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(8));
  telefone = new FormControl(null, Validators.minLength(8));
  cpf = new FormControl(null, Validators.minLength(11));
  endereco = new FormControl(null, Validators.minLength(5));
  numero = new FormControl(null, Validators.minLength(1));
  retornoTerms: any;



  constructor(
    private service: CreateuserService,
    private  toast: ToastrService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.clienteInfo.id = localStorage.getItem('Id');
  }



  validaCampos(): boolean {
    return this.nome.valid && this.email.valid
  }

 
  maskCpf = '000.000.000-00';
  maskPhone = '00 0000-0000||00 0 0000-0000';

  openDialogTerms() {
    this.dialog.open(TermsDialogComponent);
  }

  verifyTerms() { 
    
    this.service.findAllTermo(this.clienteInfo.id).subscribe(resposta => {
      
      this.retornoTerms = resposta;
      if (this.retornoTerms == false) {
        this.openDialogTerms();
      }
    })
  }

  create(): void {
      this.service.updateInfoClient(this.clienteInfo).subscribe(() => {
        this.toast.success('Informações atualizadas com sucesso', 'Cadastro');
        location.reload();
        this.verifyTerms();
      }, ex => {
        this.toast.error('Erro ao cadastrar, verifique os dados. Tente novamente.', 'Falha ao realizar Cadastro!');
      })
  }


}