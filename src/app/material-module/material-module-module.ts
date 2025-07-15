import { NgModule } from '@angular/core';
import {MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

const materialModules = [
  MatButtonModule,
]
@NgModule({
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModuleModule {}
