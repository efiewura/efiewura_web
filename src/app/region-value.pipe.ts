import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regionValue'
})
export class RegionValuePipe implements PipeTransform {

  transform(value: any): any {
  	switch (value) {
  		case "AS":
  			return 'Ashanti';
  			break;
  		case "GA":
  			return 'Greater Accra';
  			break;
  		case "EA":
  			return 'Eastern';
  			break;
  		case "BA":
  			return 'Brong-Ahafo';
  			break;
  		case "UE":
  			return 'Upper East';
  			break;
  		case "WE":
  			return 'Western';
  			break;
  		default:
  			return 'Greater Accra';
  			break;
  	}
  }

}