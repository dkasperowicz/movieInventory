import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs/internal/Observable';
import {environment} from 'src/environments/environment';

@Injectable(
{
	providedIn: 'root'
})

export class ApiService
{
	private apiURL: string = environment.apiURL;
	private ParseHeaders = 
	{
		headers: new HttpHeaders(
		{
			"Content-Type": "application/json"
		})
	};

	constructor(private httpClient: HttpClient){}

	call(data: string): Observable<any>
	{
		return this.httpClient.post(this.apiURL, data, this.ParseHeaders);
	}
}