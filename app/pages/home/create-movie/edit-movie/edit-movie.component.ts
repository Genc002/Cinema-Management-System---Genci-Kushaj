import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
editMovieForm:any = FormGroup;
MovieDetails:any
userId:any
  movieService: any;
  movieId: any;
  MoviesApiServiceService: any;
  constructor(private route:ActivatedRoute,
    private service:MovieApiServiceService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.movieId = params ['movieId'];
    });
    this.editMovieForm= new FormGroup ({
      name: new FormControl ('',Validators.required),
      title: new FormControl ('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  
  this.fetchMoviedetails()

  }

fetchMoviedetails() {
 this.MovieDetails = this.MoviesApiServiceService.getUserById(JSON.parse(this.movieId));
  this.fillInputs()
}

fillInputs() {
  this.editMovieForm.get('name').setValue(this.MovieDetails.firstname);
  this.editMovieForm.get('title').setValue(this.MovieDetails.title);
  this.editMovieForm.get('status').setValue(this.MovieDetails.description);
}

onSubmit() {
  if (this.editMovieForm.valid) {
    try {
      let payload = {
        id:JSON.parse(this.movieId),
        name:this.editMovieForm.value.name,
        title:this.editMovieForm.value.title,
        description:this.editMovieForm.value.description
      }

      this.movieService.updateMovie(payload);
      this.editMovieForm.reset();
      window.alert('Movie edited. Click OK to see all movies.');
      this.router.navigateByUrl('/pages/all-movies');

    }
    catch (error:any) {
      console.error('Error editing movie:',error);
      window.alert('Failed to edit movie. Please try again.');
    }
  }
}}
