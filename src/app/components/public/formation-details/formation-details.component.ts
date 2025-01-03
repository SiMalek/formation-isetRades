import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../../../services/formation.service';
import { SessionService } from '../../../services/session.service';
import { TrainerService } from '../../../services/trainer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formation-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent implements OnInit {
  formationData: any;
  sessionList: any[] = [];
  trainerList: any[] = [];
  selectedTrainer: any;
  isSessionFull = false;
  displayRegistrationForm = false;
  candidateInfo = { fullName: '', emailAddress: '' };

  constructor(
    private activatedRoute: ActivatedRoute,
    private formationService: FormationService,
    private sessionService: SessionService,
    private trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    const formationId = this.activatedRoute.snapshot.params['id'];
    console.log('Formation ID:', formationId);

    this.formationService.getFormation(formationId).subscribe((data) => {
      console.log('Formation Data:', data);
      this.formationData = data;
      this.fetchSessions();
    });

    this.fetchTrainers();
  }

  fetchSessions(): void {
    this.sessionService.getSessions().subscribe((allSessions) => {
      console.log('All Sessions:', allSessions);
      this.sessionList = allSessions.filter(
        (session: any) => session.formationId === Number(this.formationData.id)
      );
      console.log('Filtered Sessions:', this.sessionList);
    });
  }

  fetchTrainers(): void {
    this.trainerService.getTrainers().subscribe((allTrainers) => {
      this.trainerList = allTrainers;
    });
  }

  resolveTrainerNames(trainerIds: number[]): string {
    return trainerIds
      .map((id) => {
        const trainer = this.trainerList.find((t) => t.id = id);
        return trainer ? `${trainer.firstName} ${trainer.lastName}` : 'Unknown Trainer';
      })
      .join(', ');
  }

  resolveTrainerDetails(trainerId: number): void {
    this.trainerService.getTrainerById(trainerId).subscribe((trainerDetails) => {
      this.selectedTrainer = trainerDetails;
    });
  }

  initiateRegistration(sessionId: number): void {
    const session = this.sessionList.find((s) => s.id === sessionId);
    if (session && session.candidateIds.length < 15) {
      this.displayRegistrationForm = true;
    } else {
      this.isSessionFull = true;
    }
  }

  submitRegistration(): void {
    alert('Registration successful!');
    this.displayRegistrationForm = false;
  }
}
