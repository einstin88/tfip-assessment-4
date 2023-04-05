import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchReviewComponent } from './components/search-review/search-review.component';
import { MovieReviewListComponent } from './components/movie-review-list/movie-review-list.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';

const routes: Routes = [
  { path: 'view0', component: SearchReviewComponent },
  { path: 'view1', component: MovieReviewListComponent },
  { path: 'view2', component: PostCommentComponent },
  { path: '', redirectTo: '/view0', pathMatch: 'full' },
  { path: '**', redirectTo: '/view0', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
