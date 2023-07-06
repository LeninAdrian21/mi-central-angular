import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VariablesService } from '../core/services/variables.service';
import { Observable, map, startWith } from 'rxjs';
import { Funcions } from 'src/functions/functions';
import { filter } from 'src/functions/variables';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styles: [
  ]
})
export class FilterComponent implements OnInit {
  selectedOperador:any;
  filterForm!: FormGroup;
  info:any = filter[this.data.collection].info;
  keyword:any =filter[this.data.collection].keyword;
  keywords:any =filter[this.data.collection].keywords;
  inputText:any = filter[this.data.collection].inputText;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  busqueda = new FormControl('');
  constructor(public dialogRef: MatDialogRef<FilterComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, private variables:VariablesService) { }
  ngOnInit(): void {
    console.log(this.inputText)
    this.filterForm = this.filterForm = this.formBuilder.group({
      filters: this.formBuilder.array([])
    });
    console.log(this.info);
    this.addFilter();
    this.ListarData();
    this.filteredOptions = this.busqueda.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    )
  }
  private _filter(value: any): any[] {
    const filterValue = value.toString().toLowerCase();
    return this.info[this.keyword].filter((option:any) => option.toString().toLowerCase().includes(filterValue));
  }
  get filters() {
    return this.filterForm.get('filters') as FormArray;
  }
  addFilter(){
    const filterGroup = this.formBuilder.group({
      field: ['', Validators.required],
      operator: ['', Validators.required],
      value: ['', Validators.required],
      rangeMin: [''],
      rangeMax: ['']
    });
    this.filters.push(filterGroup);
  }
  deleteFilter(index: number) {
    this.filters.removeAt(index);
  }
  ListarData(){
    this.variables.FilterObservable.subscribe(data => {
      Funcions.ListaAutoComplete(this.info,data)
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Filter(){
    const filters = this.filterForm.value.filters;
    console.log(filters);
  }
}
