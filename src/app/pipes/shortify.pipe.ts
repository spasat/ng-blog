import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortify'
})
export class SortifyPipe implements PipeTransform {

  transform(value: string, maxLength?: number, endText: string = ''): string {

    if (maxLength > value.length) {
      return value;
    }

    const result = value.substr(0, maxLength);
    return result.substr(0, Math.min(result.length, result.lastIndexOf(' '))) + endText;
  }

}
