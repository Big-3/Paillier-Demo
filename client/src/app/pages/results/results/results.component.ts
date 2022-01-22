import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/shared/services/poll.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results: any;

  constructor(private pollService: PollService) {
    this.pollService.getResults().subscribe(
      (value) => {
        this.results = value.results;
      }
    );
   }

  ngOnInit(): void {
  }

}
