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
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
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

  displayedColumns: string[] = ['position', 'weight', 'dateinit', 'datefinal', 'acoes'];
  dataSource = new MatTableDataSource<ClientList>(this.ELEMENT_DATA);
  id: string;
  entregue: any;
  

  constructor( private service: CreateuserService,  private route: ActivatedRoute, private router: Router, private  toast: ToastrService,) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('Id');
    this.findAll();
  }

  navigateUpdade(id) {
    this.router.navigate([`dumpster/update/${id}`])
  }

  navigateDelete(id) {
    this.router.navigate([`dumpster/delete/${id}`])
  }

  findAll(){
    
    this.service.findAllUser(this.id).subscribe(resposta => {
      
      this.ELEMENT_DATA = resposta

      // let newDateStart: moment.Moment = moment.utc(this.ELEMENT_DATA[0].dateinit).local();
      // let newDateSFinal: moment.Moment = moment.utc(this.ELEMENT_DATA[0].datefinal).local();
      // this.ELEMENT_DATA[0].dateinit = newDateStart.format("DD/MM/YYYY");
      // this.ELEMENT_DATA[0].datefinal = newDateSFinal.format("DD/MM/YYYY");

      this.dataSource = new MatTableDataSource<ClientList>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  entregar(id): void {
  this.clientEntregar.id = id;
   this.service.entregarDumpster(this.clientEntregar).subscribe(resposta => {
     this.toast.success('Ação realizada com sucesso', 'Entregue');

   }, ex => {
     this.toast.error('Erro ao solicitar entrega de caçamba, verifique os dados. Tente novamente.', 'Falha!');
   })
 
 }

 renovar(id): void {
  this.clientEntregar.id = id;
   this.service.renovacaoDumpster(this.clientEntregar).subscribe(resposta => {
     this.toast.success('Ação realizada com sucesso', 'Renovação');

   }, ex => {
     this.toast.error('Erro ao solicitar renovação de caçamba, verifique os dados. Tente novamente.', 'Falha!');
   })
 
 }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}