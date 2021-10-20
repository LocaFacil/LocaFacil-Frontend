
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente, dumpsterList } from 'src/app/models/cliente';
import { CreateuserService } from 'src/app/services/createuser.service';

@Component({
  selector: 'app-dumpster-list',
  templateUrl: './dumpster-list.component.html',
  styleUrls: ['./dumpster-list.component.css'],
  
})
export class DumpsterListComponent implements OnInit {
  ELEMENT_DATA: dumpsterList[] = []
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'situacao', 'acoes'];
  dataSource = new MatTableDataSource<dumpsterList>(this.ELEMENT_DATA);

  constructor( private service: CreateuserService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<dumpsterList>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}