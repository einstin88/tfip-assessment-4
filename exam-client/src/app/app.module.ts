import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchReviewComponent } from './components/search-review/search-review.component';
import { MovieReviewListComponent } from './components/movie-review-list/movie-review-list.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { MovieDataService } from './services/movie-data.service';

@NgModule({
  declarations: [AppComponent, SearchReviewComponent, MovieReviewListComponent, PostCommentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [MovieDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
