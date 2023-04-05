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

  getReviewList(movieName: string) {
    const url = `${this.#URL_API}/search`;

    const params = new HttpParams().append('query', movieName);

    return this.http.get<Review[]>(url, { params });
  }

  postNewReview({ movieName, name, rating, comment }: Comment) {
    const url = `${this.#URL_API}/comment`;

    const newComment = new HttpParams()
      .set('movieName', movieName)
      .set('name', name)
      .set('rating', rating)
      .set('comment', comment);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    // return this.http.post(url, formData);
    return firstValueFrom(
      this.http.post(url, newComment.toString(), { headers })
    ).catch((err) => console.error('Failed to save new post'));
  }
}
