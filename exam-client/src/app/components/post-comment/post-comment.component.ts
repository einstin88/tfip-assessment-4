import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDataService } from 'src/app/services/movie-data.service';

import { Comment } from 'src/app/models/comment.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
})
export class PostCommentComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private svc: MovieDataService,
    private title: Title
  ) {}

  movieName!: string;
  commentForm!: FormGroup;

  ngOnInit(): void {
    this.movieName = this.route.snapshot.params['movieName'] as string;
    this.title.setTitle(`Comment: ${this.movieName}`)

    this.commentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnDestroy(): void {
    this.commentForm.reset();
  }

  // Handles form submission
  processForm() {
    const formData = this.commentForm.value as Comment;
    formData.movieName = this.movieName;
    // console.log('Form to submit: ', JSON.stringify(formData));

    this.svc.postNewReview(formData);

    this.backToResultPage();
  }

  // Navigate back to result page (view 1)
  async backToResultPage() {
    const queryParams = { query: await localStorage.getItem('movieName') };
    // console.log('Query was: ', query);

    this.router.navigate(['/view1'], { queryParams });
  }
}
