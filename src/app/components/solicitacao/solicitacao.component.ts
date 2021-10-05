import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css']
})
export class SolicitacaoComponent implements OnInit {
  cpf_cnpj: any;
 
  constructor() { }

  ngOnInit(): void {
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
