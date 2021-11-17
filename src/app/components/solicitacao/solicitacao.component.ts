import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Solicitacao } from 'src/app/models/createUser';
import { CreateuserService } from 'src/app/services/createuser.service';
import { SolicitacaoDialogComponent } from './solicitacao-dialog/solicitacao-dialog.component';

interface tipos {
  name: string;
}


@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css']
})
export class SolicitacaoComponent implements OnInit {
  cpf_cnpj: any;
  idClient: any;
  retorno: any;

  solicitacao: Solicitacao = {
    id: '',
    size: '',
    address: '',
    addressnum: '',
    typetrash: '',
    dateinit: '',
    datefinal: ''
  }

  tipos: tipos[] = [
    {name: 'Isopor'},
    {name: 'Borracha'},
    {name: 'Gesso'},
    {name: 'Madeira'},
    {name: 'plástico'},
    {name: 'Metal'},
    {name: 'Outros'},
  ];

  tamanhoPeq(): any {
    this.solicitacao.size = 1;

  }

  tamanhoGrande(): any {
    this.solicitacao.size = 2
  }


  endereco = new FormControl(null, Validators.required);
  numero = new FormControl(null, Validators.minLength(1));
  tiposControl = new FormControl('', Validators.required);
  dateInicial = new FormControl('', Validators.required);
  dateFim = new FormControl('', Validators.required);
 
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private service: CreateuserService,
    public dialog: MatDialog,
    private  toast: ToastrService,
    ) {}

  ngOnInit(): void {
    this.idClient = localStorage.getItem('Id');
    this.verifyInfo();
  }

  openDialog() {
    this.dialog.open(SolicitacaoDialogComponent);
  }

  verifyInfo() { 
    this.solicitacao.size = 1;
    this.service.findByIdInfo(this.idClient).subscribe(resposta => {
      this.retorno = resposta;
      if (this.retorno == false) {
        this.openDialog();
      }
    })
  }

 maskDtDia = 'd0/M0/0000';
 maskPhone = '0000-00000';

 create(): void {
  debugger;
   let newDateStart: moment.Moment = moment.utc(this.solicitacao.dateinit).local();
   let newDateFinal: moment.Moment = moment.utc(this.solicitacao.datefinal).local();
   this.solicitacao.dateinit = newDateStart.format("DD/MM/YYYY");
   this.solicitacao.datefinal = newDateFinal.format("DD/MM/YYYY");
    debugger;
  this.service.createSolicitacao(this.solicitacao).subscribe(() => {
    this.toast.success('Solicitação realizada com sucesso', 'Solicitação');
  }, ex => {
    this.toast.error('Erro ao solicitar caçamba, verifique os dados. Tente novamente.', 'Falha ao solicitar caçamba!');
  })

}

}
