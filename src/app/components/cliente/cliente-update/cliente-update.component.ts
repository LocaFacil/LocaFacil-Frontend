import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser, UpdateUser } from 'src/app/models/createUser';
import { CreateuserService } from 'src/app/services/createuser.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  clientUpade: UpdateUser = {
    id: '',
    name: '',
    email: '',
    password: '',
    cpf: '',
    address: '',
    addressnum: '',
    termsUse: true
  }

  maskCpf = '000.000.000-00';


  hide = true;
  perfil = 1;

  nome = new FormControl(null, Validators.minLength(3));
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(8));


  constructor(
    private service: CreateuserService,
    private  toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clientUpade.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  validaCampos(): boolean {
    return this.nome.valid && this.email.valid && this.senha.valid
  }

  findById(): void {
    this.service.findById(this.clientUpade.id).subscribe(resposta => {
      this.clientUpade.name = resposta.name;
      this.clientUpade.email = resposta.email;
      this.clientUpade.password = resposta.password;
      this.clientUpade.cpf = resposta.cpf;
      this.clientUpade.address = resposta.address;
      this.clientUpade.addressnum = resposta.addressnum;
    })
  }

  update(): void {
    if (this.perfil === 1) {
      this.service.update(this.clientUpade).subscribe(() => {
        this.toast.success('Dados atualizados com sucesso', 'Editar Dados');
      }, ex => {
        this.toast.error('Erro ao editar, verifique os dados. Tente novamente.', 'Falha ao Editar Dados!');
      })
    }
  }

}