import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';


const materialModules=[
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatTableModule,
  MatPaginatorModule,
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports:[...materialModules]
})
export class MaterialModule { }
