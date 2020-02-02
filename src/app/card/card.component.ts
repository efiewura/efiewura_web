import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '../location';
import { Efiewura } from '../efiewura';
import { Photo } from '../photo';
import { Tag } from '../tag';
import { Space } from '../space';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
	@Input() space: Space;

  constructor() { }

  ngOnInit() {
  	this.space.negVal = function(){
  		return (this.negFlag)? 'Negotiable':'Non-Negotiable';
  	};
  	this.space.location.regionVal = function(){
  	switch (this.region) {
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
  			return 'Bromg-Ahafo';
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
  	};
  }

 
}
