import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: string, replaceChar?: string): unknown {
    if (value === undefined) {
      return value;
      
    } 
    if(replaceChar) {
      
      return replaceChar.repeat(value.length);
    }
    return '*'.repeat(value.length);
  }

}
