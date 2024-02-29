import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  createMovieForm:any =FormGroup;
  onFileSelected: any;
  imageUrl: any;
 



  constructor(
    private movieService:MovieApiServiceService,
    private router: Router
  ) {} 

  ngOnInit(): void {
    this.createMovieForm = new FormGroup ({
      name: new FormControl ('',Validators.required),
      title: new FormControl ('', Validators.required),
      description: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required)
    });
  }
  

  onSubmit() {
    if (this.createMovieForm.valid) {
      try {
        this.movieService.addMovie(this.createMovieForm.value);
        this.createMovieForm.reset();
        window.alert('Movie created. Click OK to see all movies.');
        this.router.navigateByUrl('/pages/home');
      } catch (error:any) {
        if (error.message === 'A movie with these details already exists'){
          window.alert('A movie with these details already exists. Please check your input.');
        }
        else {
          console.error('Error creating user:',error);
          window.alert('Failed to create movie.Please try again.');
        }}
      } 
      else {
        window.alert('Form is not valid. Please check your input.');
      }
    }

} 
