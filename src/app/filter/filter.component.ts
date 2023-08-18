import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { VariablesService } from "../core/services/variables.service";
import { Funcions, Mensaje } from "src/functions/functions";
import { filter } from "src/functions/variables";
import { CrudService } from "../services/crud.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styles: [
  ]
})
export class FilterComponent implements OnInit {
  filterForm!: FormGroup;
  filteredOptions:any = [];
  info:any = filter[this.data.collection].info;
  keyword = [filter[this.data.collection].keyword];
  keywords = [filter[this.data.collection].keywords];
  inputText:any = filter[this.data.collection].inputText;
  selectOptions:any[] =[];
  submit = false;
  operator  = filter[this.data.collection].operatorOptions;
  value = false;
  min = false;
  max = false;
  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private variables:VariablesService,
    private service: CrudService,
  ){}
  ngOnInit(): void {
    this.filterForm = this.filterForm = this.formBuilder.group({
      filters: this.formBuilder.array([])
    });
    this.ListarData();
    if(this.data.filters &&  this.data.filters.length > 0) {
      this.data.filters.forEach((obj:any) => {
        const filterGroup = this.formBuilder.group({
          field: [obj.field, Validators.required],
          operator: [obj.operator, Validators.required],
          value: [obj.value],
          min:  [obj.min],
          max:  [obj.max]
        });
        this.filters.push(filterGroup);
        this.keyword.push(filter[this.data.collection].keyword);
        this.keywords.push(filter[this.data.collection].keywords);
      });
    }else {
      this.addFilter();
    }
  }
  get filters() {
    return this.filterForm.get('filters') as FormArray;
  }
  ListarData(){
    this.variables.FilterObservable.subscribe(data => {
      Funcions.ListaAutoComplete(this.info,data);
    })
  }
  addFilter(){
    const filterGroup = this.formBuilder.group({
      field: ['',Validators.required],
      operator: ['',Validators.required],
      value: [''],
      min:  [''],
      max:  ['']
    });
    this.filters.push(filterGroup);
    this.keyword.push(filter[this.data.collection].keyword);
    this.keywords.push(filter[this.data.collection].keywords);
  }
  deleteFilter(index: number) {
    this.filters.removeAt(index);
  }
  Filter(){
    const filtersArray = this.filterForm.get('filters') as FormArray;
    const fieldValues = filtersArray.controls.map((control:any) => control.get('field').value);
    const filtersValues = filtersArray.getRawValue();
    const hasDuplicates = fieldValues.some((value, index) => {
      return fieldValues.indexOf(value) !== index;
    });
    this.submit = true;
    if(this.filterForm.invalid){
      Mensaje('Campos invalidos')
      return
    }
    if (hasDuplicates) {
      return Mensaje('Hay campos duplicados en el formulario')
    }
    this.variables.FiltersObservableData = filtersValues;
    this.dialogRef.close(filtersValues);

  }
  Close(): void {
    this.dialogRef.close();
  }
  fieldChange(index: number) {
    const filterControl:any = (this.filterForm.get('filters') as FormArray).controls[index];
    const fieldControl:any = filterControl.get('field');
    const valueControl = filterControl.get('value');
    const minControl = filterControl.get('min');
    const maxControl = filterControl.get('max');
    const previousField = fieldControl.value;
    this.keyword[index] = fieldControl.value
    fieldControl.valueChanges.subscribe((newField: string) => {
      if (newField !== previousField) {
        this.selectOptions[index] = newField;
        valueControl.patchValue('');
        maxControl.patchValue('');
        minControl.patchValue('');
      }
    });
  }
  operatorChange(index: number){
    const filterControl:any = (this.filterForm.get('filters') as FormArray).controls[index];
    filterControl.get('value')?.clearValidators();
    filterControl.get('min')?.clearValidators();
    filterControl.get('max')?.clearValidators();
    filterControl.get('value')?.updateValueAndValidity();
    filterControl.get('min')?.updateValueAndValidity();
    filterControl.get('max')?.updateValueAndValidity();
    const operator = filterControl.get('operator')?.value;
    if(operator == '==' || operator == '!=' || operator == 'contain'){
      filterControl.get('value')?.setValidators([Validators.required]);
    }
    if(operator == '>' || operator == '>='){
      filterControl.get('min')?.setValidators([Validators.required]);
    }
    if(operator == '<' || operator == '<='){
      filterControl.get('max')?.setValidators([Validators.required]);
    }
    if(operator == 'range'){
      filterControl.get('min')?.setValidators([Validators.required]);
      filterControl.get('max')?.setValidators([Validators.required]);
    }
    const fieldControl:any = filterControl.get('field');
    const operatorControl:any = filterControl.get('operator');
    const valueControl = filterControl.get('value');
    const rangeMinControl = filterControl.get('min');
    const rangeMaxControl = filterControl.get('max');
    const previousField = fieldControl.value;
    const previousOperator = operatorControl;

    fieldControl.valueChanges.subscribe((newField: string) => {
      if (newField !== previousField) {
        valueControl.patchValue('');
        rangeMaxControl.patchValue('');
        rangeMinControl.patchValue('');
      }
    });
    operatorControl.valueChanges.subscribe((newField: string) => {
      if (newField !== previousOperator) {
        valueControl.patchValue('');
        rangeMaxControl.patchValue('');
        rangeMinControl.patchValue('');
      }
    });
  }
  // FilterForms(value:any):any[]{
  //   const filtersControls = this.filterForm.get('filters') as FormArray;
  //   const options = filtersControls.controls.map((control:any) => {
  //     const field = control.get('field').value;
  //     const value = control.get('value').value;
  //     return this.info[field]?.filter((item: string) => item.toString().toLowerCase().includes(value.toString().toLowerCase())) || [];
  //   });
  //   return options;
  // }
}
