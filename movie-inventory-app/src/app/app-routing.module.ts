import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ListMoviesComponent} from './list-movies/list-movies.component';
import {Error404Component} from './error404/error404.component';
import {AddMovieComponent} from './add-movie/add-movie.component';

const routes: Routes =
[
	{
		path: "",
		component: ListMoviesComponent
	},
	{
		path: "addMovie",
		component: AddMovieComponent
	},
	{
		path: "**",
		component: Error404Component
	}
];

@NgModule(
{
	imports:
	[
		RouterModule.forRoot
		(
			routes,
			{
				scrollPositionRestoration: "enabled"
			}
		)
	],
	exports:
	[
		RouterModule
	]
})

export class AppRoutingModule{}