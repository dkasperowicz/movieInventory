import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ApiService} from '../_services/api.service';
import {Router} from '@angular/router';
import {ActorInterface} from '../_interfaces/actor-interface';
import {ModalDeleteActorComponent} from '../modal-delete-actor/modal-delete-actor.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../_services/data.service';

@Component(
{
	selector: 'app-list-actors',
	templateUrl: './list-actors.component.html',
	styleUrls: ['./list-actors.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ListActorsComponent implements OnInit
{
	noActors: boolean = true;
	actorList = new MatTableDataSource<ActorInterface>();
	actorTableCols: String[] = ["givenName", "surname", "actions"];
	actorToDelete: number;

	@ViewChild(MatSort, {static: true}) sort: MatSort;
	@ViewChild(MatSort) set matSort(ms: MatSort)
	{
		this.sort = ms;
		this.setDataSourceAttributes();
	 }

	constructor(private dataService: DataService, private modalService: NgbModal, private apiService: ApiService, private router: Router){}
		
	ngOnInit(): void
	{
		this.getActorList();

		this.dataService.currentMessage.subscribe(message =>
		{
			if(message ===  "deleteActorConfirmed")
			{
				this.deleteActor();
			}
		});
	}

	addActor(): void
	{
		this.router.navigate(["/addActor"]);
	}

	confirmDelete(actorID: number): void
	{
		this.actorToDelete = actorID;
		this.modalService.open(ModalDeleteActorComponent);
	}

	private getActorList(): void
	{
		let json =
		{
			action: "getActors"
		};

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).length > 0)
			{
				this.noActors = false;
				
				this.actorList.data = response;
				this.getMovieAssociations();
			}
			else
			{
				this.noActors = true;
			}
		});
	}

	private getMovieAssociations(): void
	{
		for(let actor of this.actorList.data)
		{
			let json =
			{
				action: "getMoviesWithActor",
				actorID: actor.actorID
			}

			this.apiService.call(JSON.stringify(json)).subscribe(response =>
			{
				actor.inMovies = JSON.parse(JSON.stringify(response)).length;
			});
		}
	}

	private deleteActor(): void
	{
		let json =
		{
			actorID: this.actorToDelete,
			action: "deleteActor"
		};

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).success)
			{
				this.getActorList();
			}
			else
			{
				document.getElementById("deleteActorError" + this.actorToDelete).style.display = "block";
				document.getElementById("deleteActorError" + this.actorToDelete).setAttribute("aria-hidden", 'false');
			}
		});
	}

	closeAlert(actorID: number)
	{
		document.getElementById("deleteActorError" + actorID).style.display = "none";
		document.getElementById("deleteActorError" + actorID).setAttribute("aria-hidden", 'true');
	}

	private setDataSourceAttributes()
	{
		this.actorList.sort = this.sort;
	}
}