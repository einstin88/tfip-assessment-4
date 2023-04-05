import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/models/review.model';
import { MovieDataService } from 'src/app/services/movie-data.service';

@Component({
  selector: 'app-movie-review-list',
  templateUrl: './movie-review-list.component.html',
  styleUrls: ['./movie-review-list.component.css'],
})
export class MovieReviewListComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private svc: MovieDataService,
    private title: Title
  ) {}

  sub$!: Subscription;
  reviews: Review[] = [];

  async ngOnInit(): Promise<void> {
    const movieName = this.route.snapshot.queryParams['query'] as string;
    await localStorage.setItem('movieName', movieName); // To help user navigate back to result page from view 2
    // console.info('Query movies: ', movieName);
    this.title.setTitle(`Result for: ${movieName}`);

    this.sub$ = this.svc.getReviewList(movieName).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
