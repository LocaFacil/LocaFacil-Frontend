import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {



  resposta = null;
  data: string;
  type: string;
  

  constructor(private router: Router,
    private authService: AuthService,
    private toast: ToastrService,
    private http: HttpClient) { }


  ngOnInit(): void {
    //this.router.navigate(['solicitacao'])
    this.type = localStorage.getItem('TypeUser');
  }

  id = localStorage.getItem('Id');

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout', { timeOut: 7000 })
  }
}
