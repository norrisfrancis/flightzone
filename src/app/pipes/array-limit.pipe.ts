import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayLimit'
})
export class ArrayLimitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.slice(0, args);
  }

}
