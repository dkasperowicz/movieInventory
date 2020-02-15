import {NgModule} from "@angular/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
//import {MatOptionModule} from "@angular/material/option";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";


@NgModule(
{
	exports:
	[
		FormsModule,
		MatDialogModule,
		MatFormFieldModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		MatSelectModule,
		//MatOptionModule,
		MatTooltipModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatDatepickerModule
	]
})

export class MaterialModule{}