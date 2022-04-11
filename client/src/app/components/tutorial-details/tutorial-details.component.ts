import { TutorialService } from './../../services/tutorial.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  currentTutorial: any;
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getTutorial(this.route.snapshot.paramMap.get('id'));
  }

  getTutorial(id: any): void {
    this.tutorialService.get(id).subscribe(
      (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
        // alert("required fields 😁")
      }
    );
  }

  updatePublished(status:any): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status,
    };

    this.tutorialService.update(this.currentTutorial.id, data).subscribe(
      (res) => {
        this.currentTutorial.published = status;
        console.log(res);
      },
      (err) => {
        console.log(err);
        // alert("required fields 😁")
      }
    );
  }

  updateTutorial(): void {
    this.tutorialService
      .update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        (res) => {
          this.message = 'Tutorial was updated successfully!';
          console.log(res);
        },
        (err) => {
          console.log(err);
          // alert("required fields 😁")
        }
      );
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe(
      (res) => {
        this.router.navigate(['/tutorials']);
        console.log(res);
      },
      (err) => {
        console.log(err);
        // alert("required fields 😁")
      }
    );
  }
}
