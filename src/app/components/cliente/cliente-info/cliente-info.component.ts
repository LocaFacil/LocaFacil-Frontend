import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateCompany, CreateUser, UserInfo } from 'src/app/models/createUser';
import { CreateuserService } from 'src/app/services/createuser.service';

@Component({
  selector: 'app-cliente-info',
  templateUrl: './cliente-info.component.html',
  styleUrls: ['./cliente-info.component.css']
})
export class ClienteInfoComponent implements OnInit {
  cliente: CreateUser = {
    iduser: '',
    name: '',
    email: '',
    password: ''
  }

  clienteInfo: UserInfo = {
    id: '',
    cpf: '',
    phone: '',
    address: ''
  }


  hide = true;
  perfil = 1;

  nome = new FormControl(null, Validators.minLength(3));
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(8));
  telefone = new FormControl(null, Validators.minLength(8));
  cpf = new FormControl(null, Validators.minLength(11));
  endereco = new FormControl(null, Validators.minLength(5));



  constructor(
    private service: CreateuserService,
    private  toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.nome.valid && this.email.valid && this.senha.valid
  }

  create(): void {

      this.service.create(this.cliente).subscribe(() => {
        this.toast.success('Cadastro realizado com sucesso', 'Cadastro');
        this.router.navigate(['login']);
      }, ex => {
        this.toast.error('Erro ao cadastrar, verifique os dados. Tente novamente.', 'Falha ao realizar Cadastro!');
      })
  }
}
