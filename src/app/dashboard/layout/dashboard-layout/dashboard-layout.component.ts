import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private authService = inject( AuthService );

  public user = computed( () => this.authService.currentUser() );

  constructor(){
    console.log('Paso por aqui: DashBoardLayout');

  }

  load() {
    console.log(this.user());
    console.log(this.authService.currentUser());
  }

  onLogOut() {
    this.authService.logOut();
  }
}
