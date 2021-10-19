import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateDumpster, CreateUser, UpdateCompany, UpdateUser } from 'src/app/models/createUser';
import { CreateuserService } from 'src/app/services/createuser.service';

interface tamanho {
  name: string;
  type: string;
}

interface tipoEntulho {
  name: string;
}

@Component({
  selector: 'app-dumpster-create',
  templateUrl: './dumpster-create.component.html',
  styleUrls: ['./dumpster-create.component.css']
})
export class DumpsterCreateComponent implements OnInit {

  tamanhosControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  precoControl = new FormControl('', Validators.required);
  tamanhos: tamanho[] = [
    {name: 'Media', type: '1'},
    {name: 'Grande', type: '2'},
  ];

  TipoControl = new FormControl('', Validators.required);
  selectTipoFormControl = new FormControl('', Validators.required);

  tipoEntulhos: tipoEntulho[] = [
    {name: 'Borracha'},
    {name: 'Isopor'},
    {name: 'Outro'}
  ];

  createDumpster: CreateDumpster = {
    id: '',
    size: '',
    price: '',
    typetrash: ''
  }


  constructor(
    private service: CreateuserService,
    private  toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  maskMoney = '00,00||000,00||0.000,00';

  create(): void {
    debugger;
      this.service.createDumpster(this.createDumpster).subscribe(() => {
        this.toast.success('Caçamba criada com sucesso', 'Criar caçamba');
      }, ex => {
        this.toast.error('Erro ao criar caçamba, verifique os dados. Tente novamente.', 'Falha ao criar Caçamba!');
      })

  }
}