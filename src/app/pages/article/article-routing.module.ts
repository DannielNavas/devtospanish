import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ArticleComponent from './article.component';

const routes: Routes = [
  {
    path: ':title',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class ArticleRoutingModule {}
