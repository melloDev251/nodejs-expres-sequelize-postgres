import { TutorialService } from './../../services/tutorial.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent implements OnInit {
  tutorial = {
    title: '',
    description: '',
    published: false,
  };

  submitted = false;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {}

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
    };

    this.tutorialService.create(data).subscribe(
      (res) => {
        console.log(res);
        this.submitted = true;
      },
      (err) => {
        console.log(err);
        // alert("required fields 😁")
      }
    );
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false,
    };
  }
}
