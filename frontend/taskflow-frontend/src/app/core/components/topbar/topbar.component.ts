import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  user: any = null;
  showProfile = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.me().subscribe({
      next: (u) => (this.user = u),
      error: () => (this.user = null)
    });
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
