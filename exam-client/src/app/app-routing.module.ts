import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchReviewComponent } from './components/search-review/search-review.component';
import { MovieReviewListComponent } from './components/movie-review-list/movie-review-list.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';

const routes: Routes = [
  { path: 'view0', component: SearchReviewComponent, title: 'Movie Search' },
  { path: 'view1', component: MovieReviewListComponent, title: 'Search Result' },
  { path: 'view2/:movieName', component: PostCommentComponent, title: 'Comment on Movie' },
  { path: '', redirectTo: '/view0', pathMatch: 'full' },
  { path: '**', redirectTo: '/view0', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
