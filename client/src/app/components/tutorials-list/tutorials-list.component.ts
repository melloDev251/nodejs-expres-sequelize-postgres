import { TutorialService } from './../../services/tutorial.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials: any;
  currentTutorial = '';
  currentIndex = -1;
  title = '';
  public currentTutorial$: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined
  );
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};
    if (searchTitle) {
      params[`title`] = searchTitle;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.tutorialService.getAll(params).subscribe(
      (data) => {
        this.tutorials = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
        // alert("required fields 😁")
      }
    );
  }

  // pagination
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = this.tutorials;
    this.currentTutorial$.next(this.tutorials);
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: any, index: any): void {
    console.log('tutorial', tutorial);

    this.currentTutorial = tutorial;
    this.currentTutorial$.next(tutorial);
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll().subscribe(
      (res) => {
        this.retrieveTutorials();
        console.log(res);
      },
      (err) => {
        console.log(err);
        // alert("required fields 😁")
      }
    );
  }

  searchTitle(): void {
    //this.page = 1;
    this.tutorialService.findByTitle(this.title).subscribe(
      (data) => {
        this.tutorials = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // searchTitle(): void {
  //   this.page = 1;
  //   this.retrieveTutorials();
  // }
}
