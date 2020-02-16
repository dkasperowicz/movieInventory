import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { Error404Component } from './error404/error404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { AddMovieComponent } from './add-movie/add-movie.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule(
{
	declarations:
	[
		AppComponent,
		HeaderComponent,
		FooterComponent,
		ListMoviesComponent,
		Error404Component,
		AddMovieComponent
	],
	imports:
	[
		NgbModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MaterialModule,
		ReactiveFormsModule
	],
	providers: [
	{
		provide: MAT_DATE_LOCALE, useValue: "en-ca"
	}],
	bootstrap: [AppComponent]
})

export class AppModule{}
