import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ucfirst'
})
export class UcfirstPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length) {
      const arr = value.split('');
      arr[0] = arr[0].toUpperCase();
      return arr.join('');
    }
    return value;
  }

}
