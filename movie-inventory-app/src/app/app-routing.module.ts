import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {Error404Component} from './error404/error404.component';
import {AddMovieComponent} from './add-movie/add-movie.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {HomeComponent} from './home/home.component';
import {AddActorComponent} from './add-actor/add-actor.component';
import {ActorDetailsComponent} from './actor-details/actor-details.component';

const routes: Routes =
[
	{
		path: "",
		component: HomeComponent
	},
	{
		path: "addActor",
		component: AddActorComponent
	},
	{
		path: "actorDetails/:actorID",
		component: ActorDetailsComponent
	},
	{
		path: "addMovie",
		component: AddMovieComponent
	},
	{
		path: "details/:movieID",
		component: MovieDetailsComponent
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