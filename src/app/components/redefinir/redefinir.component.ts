import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPass } from 'src/app/models/resetPassword';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-redefinir',
  templateUrl: './redefinir.component.html',
  styleUrls: ['./redefinir.component.css']
})
export class RedefinirComponent implements OnInit {

  resetP: ResetPass = {
    email: ''
  }

  email = new FormControl(null, Validators.email);
 
  constructor( 
    private service: ResetPasswordService,
    private toast: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.email.valid
  }

  reset() {
    this.service.reset(this.resetP).subscribe(() => {
      this.toast.success('Enviamos um email com a nova senha. Verifique seu email.', 'Recuperar Senha');
      this.router.navigate(['login'])
    }, ex=> {

    })
  }
}
