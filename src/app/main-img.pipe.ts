import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mainImg'
})
export class MainImgPipe implements PipeTransform {

  transform(value: any[]): any {
    return (typeof value[0]!='undefined')? value[0].location:'';
  }

}
