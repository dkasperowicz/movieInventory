import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DataService} from '../_services/data.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component(
{
	selector: 'app-modal-delete-actor',
	templateUrl: './modal-delete-actor.component.html',
	styleUrls: ['./modal-delete-actor.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ModalDeleteActorComponent implements OnInit
{
	dataServiceMessage: string;

	constructor(private dataService: DataService, public activeModal: NgbActiveModal){}
	
	ngOnInit(): void
	{
		this.dataService.currentMessage.subscribe(message => this.dataServiceMessage = message);
	}

	setMessage(message: string): void
	{
		this.dataService.changeMessage(message);
		this.activeModal.dismiss();
	}
}