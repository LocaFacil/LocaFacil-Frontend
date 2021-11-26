import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser, UpdateCompany, UpdateUser } from 'src/app/models/createUser';
import { CreateuserService } from 'src/app/services/createuser.service';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']
})
export class CompanyUpdateComponent implements OnInit {

  companyUpade: UpdateCompany = {
    id: '',
    name: '',
    email: '',
    phone: '',
    cnpj: '',
    password: '',

  }


  hide = true;
  perfil = 1;

  maskCnpj = '00.000.000/0000-00';
  maskPhone = '00 0000-0000||00 0 0000-0000';


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
    this.companyUpade.id = this.route.snapshot.paramMap.get('id');
    this.findByIdCompany();
  }

  validaCampos(): boolean {
    return this.nome.valid && this.email.valid && this.senha.valid
  }

  findByIdCompany(): void {
    this.service.findByIdCompany(this.companyUpade.id).subscribe(resposta => {
      this.companyUpade.name = resposta.name;
      this.companyUpade.email = resposta.email;
      this.companyUpade.phone = resposta.phone;
      this.companyUpade.cnpj = resposta.cnpj;
      this.companyUpade.password = resposta.password;
      //this.clientUpade = resposta;
    })
  }

  update(): void {
      this.service.updateCompany(this.companyUpade).subscribe(() => {
        this.toast.success('Dados atualizados com sucesso', 'Editar Dados');
      }, ex => {
        this.toast.error('Erro ao editar, verifique os dados. Tente novamente.', 'Falha ao Editar Dados!');
      })

  }
}
