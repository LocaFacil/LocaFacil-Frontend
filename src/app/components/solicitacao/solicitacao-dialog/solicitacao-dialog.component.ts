import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateCompany, CreateUser, UserInfo } from 'src/app/models/createUser';
import { CreateuserService } from 'src/app/services/createuser.service';

@Component({
  selector: 'app-solicitacao-dialog',
  templateUrl: './solicitacao-dialog.component.html',
  styleUrls: ['./solicitacao-dialog.component.css']
})
export class SolicitacaoDialogComponent implements OnInit {
  
  clienteInfo: UserInfo = {
    id: '',
    name: '',
    email: '',
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



  constructor(
    private service: CreateuserService,
    private  toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteInfo.id = localStorage.getItem('Id');
    this.findById();
  }

  findById(): void {
    debugger;
    this.service.findByIdClient(this.clienteInfo.id).subscribe(resposta => {
      this.clienteInfo.name = resposta.name;
      this.clienteInfo.email = resposta.email;
      console.log(resposta);
      
    })
  }

  validaCampos(): boolean {
    return this.nome.valid && this.email.valid
  }

  // findById(): void {
  //   this.service.findById(this.clientUpade.id).subscribe(resposta => {
  //     this.clientUpade.name = resposta.name;
  //     this.clientUpade.email = resposta.email;
  //     this.clientUpade.password = resposta.password;
  //     //this.clientUpade = resposta;
  //   })
  // }

  maskCpf = '000.000.000-00';
  maskPhone = '00 0000-0000||00 0 0000-0000';

  create(): void {
      debugger;
      this.service.updateInfoClient(this.clienteInfo).subscribe(() => {
        this.toast.success('Informações atualizadas com sucesso', 'Cadastro');
        this.router.navigate(['login']);
      }, ex => {
        this.toast.error('Erro ao cadastrar, verifique os dados. Tente novamente.', 'Falha ao realizar Cadastro!');
      })
  }
}