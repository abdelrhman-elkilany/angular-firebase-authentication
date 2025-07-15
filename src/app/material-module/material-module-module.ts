import { NgModule } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

const materialModules = [
  MatButtonModule,
  MatFormField,
  MatLabel,
  MatButton,
  MatError,
  MatInput,
  MatCard,
  MatCardTitle,
  MatCardHeader,
  MatCardActions,
  MatCardContent,
  MatCardSubtitle,
];
@NgModule({
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModuleModule {}
