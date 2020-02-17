import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../_services/data.service';

@Component(
{
	selector: 'app-modal-delete',
	templateUrl: './modal-delete.component.html',
	styleUrls: ['./modal-delete.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ModalDeleteComponent implements OnInit
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