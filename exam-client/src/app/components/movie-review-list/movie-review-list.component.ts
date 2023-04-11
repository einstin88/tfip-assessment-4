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
  loadingMsg!: string

  ngOnInit(): void {
    const movieName = this.route.snapshot.queryParams['query'] as string;
    localStorage.setItem('movieName', movieName); // To help user navigate back to result page from view 2
    // console.info('Query movies: ', movieName);
    this.title.setTitle(`Result for: ${movieName}`);

    this.loadingMsg = 'Fetching movie list...'
    this.sub$ = this.svc.getReviewList(movieName).subscribe((reviews) => {
      this.reviews = reviews;
      if (reviews.length == 0)
        this.loadingMsg = 'Your search produces no result'
    });
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
