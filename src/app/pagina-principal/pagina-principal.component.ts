import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss']
})
export class PaginaPrincipalComponent {
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
  }
coins(){
    this.router.navigate(['prueba'], {relativeTo:this.route});
  }
}
