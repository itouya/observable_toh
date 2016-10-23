import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styles: [`
    label {
      width: 10em;
    }`]
})
export class NavigationComponent {
  public radioModel: string = 'Dashboard';

  constructor(private router: Router) { }

  goDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goHeroes(): void {
    this.router.navigate(['/heroes']);
  }
}
