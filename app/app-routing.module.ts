import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/home/movie-details/movie-details.component';
import { SearchComponent } from './pages/home/search/search.component';
import { CreateMovieComponent } from './pages/home/create-movie/create-movie.component';
import { EditMovieComponent } from './pages/home/create-movie/edit-movie/edit-movie.component';


const routes: Routes = [
    {path:"",component:HomeComponent},
      {path:"create-movie",component:CreateMovieComponent},
      {path:"edit-movie/:id",component:EditMovieComponent},
  {path:'search',component:SearchComponent},
  {path:'movie/:id',component:MovieDetailsComponent},  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }