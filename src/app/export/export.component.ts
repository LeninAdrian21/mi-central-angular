import { ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { fileExport } from 'src/functions/variables';
import { Mensaje } from 'src/functions/functions';
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fieldCtrl = new FormControl();
  filteredField: Observable<string[]>;
  fields: string[] = fileExport[this.data.collection].field;
  allFields: string[] = fileExport[this.data.collection].fields;
  fieldText: any = fileExport[this.data.collection].fieldText;
  @ViewChild('fruitInput') fieldInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<ExportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdRef: ChangeDetectorRef, private ngZone: NgZone
  ) {
    this.filteredField = this.fieldCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFields.slice())),
    );
  }
  ngOnInit(): void {
    this.allFields = this.allFields.filter(item => !this.fields.includes(item));
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value && this.allFields.includes(value)) {
      this.fields.push(value);
      this.allFields = this.allFields.filter(item => !this.fields.includes(item));
    }else {
      Mensaje('No se permite agregar este elemento');
      event.value = '';
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fieldCtrl.setValue(null);
  }

  remove(field: string): void {
    const index = this.fields.indexOf(field);
    if (index >= 0) {
      this.fields.splice(index, 1);
      this.allFields.push(field);
      this.filteredField = this.fieldCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFields.slice())),
      );
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fields.push(event.option.value);
    console.log(event.option.value);
    this.allFields = this.allFields.filter(item => !this.fields.includes(item));
    this.fieldInput.nativeElement.value = '';
    this.fieldCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFields.filter(field => field.toLowerCase().includes(filterValue));
  }

}
