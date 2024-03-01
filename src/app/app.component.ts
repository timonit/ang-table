import { CompanyAPI } from '@/entities/company/api/company.api';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ang-table';

  companyAPI = new CompanyAPI();

  companies: any[] = [];

  async ngOnInit(): Promise<void> {
    this.companyAPI.setItemPerPage(50)
    this.companies = await this.companyAPI.get(1, {});
  }
}
