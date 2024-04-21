import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import {MaterialModule} from '../../modules/material/material.module'
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [MaterialModule,MatDatepickerModule,MatNativeDateModule,MatInputModule],
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    
  ]
})
export class AdvancedSearchComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

  
  @Output() filterChange = new EventEmitter<any>();

  filters: any = {
    sharedKey: '',
    businessId: '',
    email: '',
    phone: '',
    dataAdded: ''
  };

  applyFilter() {
    this.filterChange.emit(this.filters);
  }

  closeSearchForm(){
    this.close.emit();
  }

  @ViewChild('datePicker') datepicker?: MatDatepicker<any>;



}
