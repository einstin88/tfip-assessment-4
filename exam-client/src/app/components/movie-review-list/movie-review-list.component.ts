import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/models/review.model';
import { MovieDataService } from 'src/app/services/movie-data.service';

@Component({
  selector: 'app-movie-review-list',
  templateUrl: './movie-review-list.component.html',
  styleUrls: ['./movie-review-list.component.css'],
})
export class MovieReviewListComponent implements OnInit {
  constructor(private route: ActivatedRoute, private svc: MovieDataService) {}

  sub$!: Subscription;
  reviews: Review[] = [];

  ngOnInit(): void {
    const movieName = this.route.snapshot.queryParams['query'];
    console.info('Query movies: ', movieName);
    this.sub$ = this.svc.getReviewList(movieName).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }
}
