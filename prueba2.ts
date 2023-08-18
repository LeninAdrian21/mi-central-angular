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
  filterForm!: FormGroup;
  info:any = filter[this.data.collection].info;
  keyword:any =filter[this.data.collection].keyword;
  keywords:any = filter[this.data.collection].keywords;
  inputText:any = filter[this.data.collection].inputText;
  filteredOptions:any;
  selectOptions:any[] =[];
  constructor(public dialogRef: MatDialogRef<FilterComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, private variables:VariablesService) { }
  ngOnInit(): void {
    this.filteredOptions = [];
    this.filterForm = this.filterForm = this.formBuilder.group({
      filters: this.formBuilder.array([])
    });
    // console.log(this.info);
    this.addFilter();
    this.ListarData();
    // const fieldChanges = (this.filterForm.get('filters') as FormArray).valueChanges.pipe(
    //   map((filters: any[]) => filters.map(filter => filter.field))
    // );

    // fieldChanges.subscribe((fields: string[]) => {
    //   const filterControls = (this.filterForm.get('filters') as FormArray).controls;
    //   console.log(filterControls);
    //   if (filterControls) {
    //     filterControls.forEach((control, index) => {
    //       const fieldControl:any = control.get('field');
    //       const valueControl:any = control.get('value');
    //       if (fieldControl.value !== fields[index]) {
    //         valueControl.patchValue('');
    //       }
    //     });
    //   }
    // });
    this.filterForm.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value))
    ).subscribe(filteredOptions => {
      this.filteredOptions = filteredOptions;
    });
    // console.log(this.filteredOptions)
    // const control:any =  this.filterForm.get('filters');
    // const valueControl = control.valueChanges.pipe(
    //   startWith(control.value),
    //   map((filters: any[]) => filters.map(filter => filter.value))
    // );

    // this.filteredOptions = valueControl.pipe(
    //   map(value => this._filter(value || ''))
    // );
    // const form:any = this.filterForm.get('value');
    // this.filteredOptions = form.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || ''))
    // )

  }
  // private _filter(value: any): any[] {
  //   const filterValue = value.toString().toLowerCase();
  //   return this.info[this.keyword].filter((option:any) => option.toString().toLowerCase().includes(filterValue));
  // }
  // filterOptions(value: string): any[] {
  //   // console.log(value,'Filtro');
  //   const filterControls = this.filterForm.get('filters') as FormArray;
  //   const selectedFields = filterControls.controls.map((control:any) => control.get('field').value);
  //   const options = selectedFields.map(field => this.info[field] || []);
  //   console.log(options);

  //   const filterValue = value.toString().toLowerCase();
  //   const filteredOptions = options.map(option => option.filter((item:any) => item.toString().toLowerCase().includes(filterValue)));
  //   // console.log(filteredOptions);


  //   return filteredOptions;
  // }
  filterOptions(value:any): any[] {
    const filterControls = this.filterForm.get('filters') as FormArray;
    const options = filterControls.controls.map((control:any) => {
      const field = control.get('field').value;
      const value = control.get('value').value;
      return this.info[field]?.filter((item: string) => item.toString().toLowerCase().includes(value.toString().toLowerCase())) || [];
    });
    return options;
  }
  onFieldChange(index: number) {
    const filterControl:any = (this.filterForm.get('filters') as FormArray).controls[index];
    const fieldControl:any = filterControl.get('field');
    const valueControl = filterControl.get('value');
    const minControl = filterControl.get('min');
    const maxControl = filterControl.get('max');
    const previousField = fieldControl.value;
    fieldControl.valueChanges.subscribe((newField: string) => {
      if (newField !== previousField) {
        this.selectOptions[index] = newField;
        valueControl.patchValue('');
        maxControl.patchValue('');
        minControl.patchValue('');
      }
    });
  }
  get filters() {
    return this.filterForm.get('filters') as FormArray;
  }
  Tocar(value:any){
    console.log(value);
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
  Close(): void {
    this.dialogRef.close();
  }
  Filter(){
    const filtersArray = this.filterForm.get('filters') as FormArray;
    const fieldValues = filtersArray.controls.map((control:any) => control.get('field').value);
    const filtersValues = filtersArray.getRawValue();
    const hasDuplicates = fieldValues.some((value, index) => {
      return fieldValues.indexOf(value) !== index;
    });

    if (hasDuplicates) {
      console.log('Hay campos duplicados en el formulario');
    } else {
      console.log('No hay campos duplicados en el formulario');
    }
    console.log(filtersValues);
    // const filters = this.filterForm.value.filters;
    // console.log(filters);
  }
  onOperatorChange(index: number){
    const filterControl:any = (this.filterForm.get('filters') as FormArray).controls[index];
    const fieldControl:any = filterControl.get('field');
    const valueControl = filterControl.get('value');
    const rangeMinControl = filterControl.get('rangeMin');
    const rangeMaxControl = filterControl.get('rangeMax');
    const previousField = fieldControl.value;
    fieldControl.valueChanges.subscribe((newField: string) => {
      if (newField !== previousField) {
        valueControl.patchValue('');
        rangeMaxControl.patchValue('');
        rangeMinControl.patchValue('');
      }
    });
  }
}
