import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../../services/formation.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formations: any[] = [];
  categories: Set<string> = new Set();

  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    this.formationService.getFormations().subscribe((data) => {
      this.formations = [...data];  //comme on a vue en classe Mr
      this.categories = new Set(
        this.formations.flatMap(formation => formation.categories)//Au lieu de parcourir chaque formation j ai utilisee flatMap
      ); 
    });
  }
}
