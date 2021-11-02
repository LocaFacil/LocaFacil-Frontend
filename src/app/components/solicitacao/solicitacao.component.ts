import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateuserService } from 'src/app/services/createuser.service';
import { SolicitacaoDialogComponent } from './solicitacao-dialog/solicitacao-dialog.component';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css']
})
export class SolicitacaoComponent implements OnInit {
  cpf_cnpj: any;
  idClient: any;
  retorno: any;
 
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private service: CreateuserService,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.idClient = localStorage.getItem('Id');
    this.verifyInfo();
  }

  openDialog() {
    this.dialog.open(SolicitacaoDialogComponent);
  }

  verifyInfo() { 
    this.service.findByIdInfo(this.idClient).subscribe(resposta => {
      this.retorno = resposta;
      if (this.retorno == false) {
        // this.router.navigate([`client/info/${this.idClient}`])
        this.openDialog();
      }
    })
  }

  isCPF(): boolean{
    return this.cpf_cnpj == null ? true : this.cpf_cnpj.length < 12 ? true : false;
 }
 
 getCpfCnpjMask(): string{
    return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
 }

 maskDtDia = 'd0/M0/0000';
 maskPhone = '0000-00000';

}
