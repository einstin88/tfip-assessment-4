import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';

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
}
