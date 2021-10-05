import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  ELEMENT_DATA: Cliente[] = [
    {
      tamanho: 'caçamba grande',
      preco: '500',
      dataRecolhimento: '15/08/2021',
      situacao: 'Em uso'
    }
  ]
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acaoRenovar', 'acaoRecolhimento'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
