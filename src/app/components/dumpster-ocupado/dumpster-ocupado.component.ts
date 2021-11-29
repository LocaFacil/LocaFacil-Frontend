import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, dumpsterList } from 'src/app/models/cliente';
import { CreateuserService } from 'src/app/services/createuser.service';


@Component({
  selector: 'app-dumpster-ocupado',
  templateUrl: './dumpster-ocupado.component.html',
  styleUrls: ['./dumpster-ocupado.component.css']
})
export class DumpsterOcupadoComponent implements OnInit {
  ELEMENT_DATA: dumpsterList[] = []

  

  idCompany = this.route.snapshot.paramMap.get('id');
  
  displayedColumns: string[] = ['position', 'name', 'situacao'];
  dataSource = new MatTableDataSource<dumpsterList>(this.ELEMENT_DATA);

  constructor( private service: CreateuserService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idCompany = this.route.snapshot.paramMap.get('id');
    
    
    this.findAll();
  }

  navigateUpdade(id) {
    this.router.navigate([`dumpster/update/${id}`])
  }

  navigateDelete(id) {
    this.router.navigate([`dumpster/delete/${id}`])
  }

  findAll(){
    this.service.ocupados().subscribe(resposta => {
      
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<dumpsterList>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }


  getStatus(status: string): string {
    if (status == 'WAITING')
        return  'ESPERANDO'
    else if (status == 'BUSY')
        return 'OCUPADO'
    else 
      return 'DISPONÍVEL'
      
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
