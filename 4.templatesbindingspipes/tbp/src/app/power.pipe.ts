import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'power'
})
export class PowerPipe implements PipeTransform {

  transform(value: number, power?: number): number {

    if (!power) return value;

    return Math.pow(value, power);
  }

}
