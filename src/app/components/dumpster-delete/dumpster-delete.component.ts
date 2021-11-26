import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateDumpster, CreateUser, UpdateCompany, UpdateUser } from 'src/app/models/createUser';
import { CreateuserService } from 'src/app/services/createuser.service';


@Component({
  selector: 'app-dumpster-delete',
  templateUrl: './dumpster-delete.component.html',
  styleUrls: ['./dumpster-delete.component.css']
})
export class DumpsterDeleteComponent implements OnInit {

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
    this.createDumpster.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {

    this.service.findByIdDumpster(this.createDumpster.id).subscribe( resposta => {
      this.createDumpster = resposta;
      if (this.createDumpster.size == 1) {
        this.createDumpster.size = 'Media'
      } else {
        this.createDumpster.size = 'Grande'
      }
    })
  }

  maskMoney = '00,00||000,00||0.000,00';

  id = localStorage.getItem('Id');

  delete(): void {
    
    this.service.delete(this.createDumpster.id).subscribe(() => {
      this.toast.success('Caçamba deletada com sucesso', 'Delete');
      this.router.navigate([`dumpster/list/${this.id}`])
    }, ex =>{
      this.toast.error('Erro ao deletar caçamba. Tente novamente.', 'Falha ao deletar Caçamba!');
    })
  }
}