import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, dumpsterList } from 'src/app/models/cliente';
import * as moment from 'moment';
import { ClientEntregar, ClientList } from 'src/app/models/createUser';
import { CreateuserService } from 'src/app/services/createuser.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  ELEMENT_DATA: ClientList[] = []

  clientEntregar: ClientEntregar = {
    id: '',
    size: '',
    address: '',
    addressnum: '',
    typetrash: '',
    dateinit: '',
    datefinal: '',
    clientid: '',
    dumpsterid: '',
    statusid: ''
  }

  displayedColumns: string[] = ['position', 'weight', 'address', 'addressnum', 'dateinit', 'datefinal', 'acoes'];
  dataSource = new MatTableDataSource<ClientList>(this.ELEMENT_DATA);
  id: string;
  entregue: any;
  

  constructor( private service: CreateuserService,  private route: ActivatedRoute, private router: Router, private  toast: ToastrService,) { }

  ngOnInit(): void {
    this.findAll();
  }

  navigateUpdade(id) {
    this.router.navigate([`dumpster/update/${id}`])
  }

  navigateDelete(id) {
    this.router.navigate([`dumpster/delete/${id}`])
  }

  findAll(){
    
    this.service.findAllCompany().subscribe(resposta => {
      
      this.ELEMENT_DATA = resposta

      this.dataSource = new MatTableDataSource<ClientList>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  entrege(id): void {
  this.clientEntregar.id = id;
   this.service.entregeDumpster(this.clientEntregar).subscribe(resposta => {
     this.toast.success('Ação realizada com sucesso', 'Entregue');
    location.reload();
   }, ex => {
     this.toast.error('Erro ao solicitar entrega de caçamba, verifique os dados. Tente novamente.', 'Falha!');
   })
 
 }

 recolhe(id): void {
   
  this.clientEntregar.id = id;
   this.service.recolheDumpster(this.clientEntregar).subscribe(resposta => {
     this.toast.success('Ação realizada com sucesso', 'Recolhimento');
     location.reload();

   }, ex => {
     this.toast.error('Erro ao solicitar recolhimento de caçamba, verifique os dados. Tente novamente.', 'Falha!');
   })
 
 }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}