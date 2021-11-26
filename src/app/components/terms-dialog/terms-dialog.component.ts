import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Solicitacao, UserInfo } from 'src/app/models/createUser';
import { CreateuserService } from 'src/app/services/createuser.service';
import { SolicitacaoDialogComponent } from '../solicitacao/solicitacao-dialog/solicitacao-dialog.component';

@Component({
  selector: 'app-terms-dialog',
  templateUrl: './terms-dialog.component.html',
  styleUrls: ['./terms-dialog.component.css']
})
export class TermsDialogComponent implements OnInit {

  solicitacao: Solicitacao = {
    id: '',
    size: '',
    address: '',
    addressnum: '',
    typetrash: '',
    dateinit: '',
    datefinal: ''
  }

  infoClient: UserInfo = {
    id: '',
    name: '',
    email: '',
    password: '',
    cpf: '',
    phone: '',
    address: '',
    addressnum: '',
    termsUse: true,
  }
  id: string;
  retorno: any;

  constructor(
    private service: CreateuserService,
    public dialog: MatDialog,
    private  toast: ToastrService,) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('Id');
  }


  terms(): void {
    this.infoClient.id = this.id
    this.service.temsUse(this.infoClient).subscribe(() => {
      this.toast.success('Ação realizada com sucesso', 'Termos de uso');
      location.reload();
      // this.verifyInfo();
    }, ex => {
      this.toast.error('Erro ao aceitar. Tente novamente.', 'Falha aceitar termos!');
    })
}

// verifyInfo() { 
//   this.solicitacao.size = 1;
//   this.service.findByIdInfo(this.infoClient.id).subscribe(resposta => {
//     this.retorno = resposta;
//     if (this.retorno == false) {
//       this.openDialog();
//     }
//   })
// }

}
