import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  creds: Credenciais = {
    email: '',
    password: ''
  }
  hide = true;
  
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logar() {
    
    this.service.authenticate(this.creds).subscribe(resposta => {
      this.service.successfullLogin(resposta.headers.get('Authorization').substring(7));
      var info = resposta.body
      var infoUser = info.split("\n")
      var infoClient = infoUser[0].split(" ");
      var infoType = infoUser[1].split(" ");
      
      localStorage.setItem('Id', infoClient[1]);
      localStorage.setItem('TypeUser', infoType[2]);

      if (infoType[2] === '[ROLE_USER]') {
      this.router.navigate(['solicitacao'])
      } else {
        this.router.navigate(['companyManager'])
      }
      }, () => {
      this.toast.error('Verifique Email e/ou senha. Tente novamente.', 'Falha ao realizar login!');
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}
