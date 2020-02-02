import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '../location';
import { Efiewura } from '../efiewura';
import { Photo } from '../photo';
import { Tag } from '../tag';
import { Space } from '../space';
import { SpaceService } from '../space.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

	
spacesByRegion: Space[];

  constructor(private spaceService: SpaceService) { }

  counter(i: number) {
    return new Array(i);
}

ngOnInit(){
	    this.getSpacesByRegion();
}

customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  getSpacesByRegion(): void {
    this.spaceService.getSpaces('regions')
    .subscribe(spaces => this.spacesByRegion = spaces);
  }

 

}
