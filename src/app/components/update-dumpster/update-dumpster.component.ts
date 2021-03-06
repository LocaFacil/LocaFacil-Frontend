import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateDumpster, CreateUser, UpdateCompany, UpdateDumpster, UpdateUser } from 'src/app/models/createUser';
import { CreateuserService } from 'src/app/services/createuser.service';

interface tamanho {
  name: string;
  type: string;
}

interface tipoEntulho {
  name: string;
}

@Component({
  selector: 'app-update-dumpster',
  templateUrl: './update-dumpster.component.html',
  styleUrls: ['./update-dumpster.component.css']
})
export class UpdateDumpsterComponent implements OnInit {

  tamanhosControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  precoControl = new FormControl('', Validators.required);
  tamanhos: tamanho[] = [
    {name: 'Media', type: '1'},
    {name: 'Grande', type: '2'},
  ];

  TipoControl = new FormControl('', Validators.required);
  selectTipoFormControl = new FormControl('', Validators.required);

  createDumpster: CreateDumpster = {
    id: '',
    size: '',
    price: '',
    typetrash: '',
    status: ''
  }

  dumpster: UpdateDumpster = {
    id: '',
    size: '',
    price: '',
    statusid: 1
  }


  constructor(
    private service: CreateuserService,
    private  toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createDumpster.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {

    this.service.findByIdDumpster(this.createDumpster.id).subscribe( resposta => {
      this.createDumpster = resposta;
      // if (this.createDumpster.status == 'AVAILABLE') {
      //   this.createDumpster.status = 'ACESSÍVEL';
      // } else {
      //   this.createDumpster.status = 'OCUPADA';
      // }
    })
  }

  maskMoney = '00,00||000,00||0.000,00';

  create(): void {
    this.dumpster.id = this.createDumpster.id;
    this.dumpster.size = this.createDumpster.size;
    this.dumpster.price = this.createDumpster.price;

      this.service.updateDumpster(this.dumpster).subscribe(() => {
        this.toast.success('Caçamba editada com sucesso', 'Editar caçamba');
      }, ex => {
        this.toast.error('Erro ao editar caçamba, verifique os dados. Tente novamente.', 'Falha ao editar Caçamba!');
      })

  }
}