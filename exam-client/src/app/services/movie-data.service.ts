import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';
import { Comment } from 'src/app/models/comment.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieDataService {
  constructor(private http: HttpClient) {}

  #URL_API = '/api';

  /* 
    Request list of movies based on 'query'
  */
  getReviewList(movieName: string) {
    const url = `${this.#URL_API}/search`;

    const params = new HttpParams().append('query', movieName);

    return this.http.get<Review[]>(url, { params });
  }

  /**
   * Convert form's data to params format to be sent as url encoded form
   */
  // postNewReview({ movieName, name, rating, comment }: Comment) {
  postNewReview(comment: Comment) {
    const url = `${this.#URL_API}/comment`;

    const newComment = new HttpParams().appendAll({...comment})

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return firstValueFrom(
      this.http.post<void>(url, newComment.toString(), { headers })
    ).catch(() => console.error('Failed to save new post'));
  }
}
