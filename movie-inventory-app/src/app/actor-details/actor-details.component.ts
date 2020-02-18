import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../_services/api.service';

@Component(
{
	selector: 'app-actor-details',
	templateUrl: './actor-details.component.html',
	styleUrls: ['./actor-details.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ActorDetailsComponent implements OnInit
{
	actorDetailsForm: FormGroup;
	noUpdateActor: boolean = true;
	submitted: boolean = false;
	noError: boolean = true;

	constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder){}

	ngOnInit(): void
	{
		let actorID = Number.parseInt(this.route.snapshot.paramMap.get("actorID"));

		if(actorID === undefined || actorID === null)
		{
			this.router.navigate(["**"]);
		}
		else
		{
			this.actorDetailsForm = this.formBuilder.group(
			{
				givenName: ["", [Validators.required]],
				surname: ["", [Validators.required]]
			});
		}

		let json =
		{
			action: "getActor",
			actorID: actorID
		};

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).length === 1)
			{
				this.actorDetailsForm.controls["givenName"].setValue(response[0].givenName);
				this.actorDetailsForm.controls["surname"].setValue(response[0].surname);
			}
			else
			{
				this.noError = false;
			}
		});
	}

	submit(formData): void
	{
		this.submitted = true;

		let json = JSON.parse(JSON.stringify(formData));

		json.action = "updateActor";
		json.actorID = Number.parseInt(this.route.snapshot.paramMap.get("actorID"));

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).success)
			{
				this.noUpdateActor = false;
			}
			else
			{
				this.noError = false;
			}

			this.submitted = false;
		});
	}

	returnHome(): void
	{
		this.router.navigate(["/"]);
	}
}