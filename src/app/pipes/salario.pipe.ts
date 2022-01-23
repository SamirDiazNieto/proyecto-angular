import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salario'
})
export class SalarioPipe implements PipeTransform {

  transform(value: number): unknown {
    let salarioPesos: string = "$"
    if (value === undefined) {
      return value;
      
    } else {

      let salario: string = value.toString();
      let punto: number = (salario.length)%3;
      let contador: number=0
      
      for (let index = 0; index < salario.length; index++) {
        salarioPesos +=salario[index]
        if (index  === punto-1 ) {
          salarioPesos +="."
          contador=0
        
        }  
        if (contador != 0 && contador%3 === 0) {
          salarioPesos +=","
        }

        contador++  
        }
      return salarioPesos+"00";
    }
    return salarioPesos;
  }

}
