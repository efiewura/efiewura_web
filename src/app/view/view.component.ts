import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '../location';
import { Efiewura } from '../efiewura';
import { Photo } from '../photo';
import { Tag } from '../tag';
import { Space } from '../space';
import { SpaceService } from '../space.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
	photos = [{id:0,main:false},{id:1,main:true},{id:2,main:false},{id:3,main:false},{id:4,main:false}];
  space:any;
  profile:any;
  buttonHover:boolean = false;
	   _opened: boolean = false;
	   _showBackdrop:boolean=true;
  constructor(private spaceService: SpaceService,
  			  private activatedRoute: ActivatedRoute,
  			  private router: Router) {
  	this.space = new Space;
  	this.space.efiewura = new Efiewura;
  	this.space.location = new Location;
  	this.space.efiewura.photo = new Photo;
  	this.space.photos = [];
  }

  ngOnInit() {
  	 this.getSpace(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getSpace(id:any): void {
    this.spaceService.getSpace(id)
    .subscribe(space =>{ 
    	this.space = space;
    	this.profile = (this.space.efiewura.photo!=undefined)?this.space.efiewura.photo.location:'https://res.cloudinary.com/dmvymb8nn/image/upload/t_media_lib_thumb/v1566009080/avatar-placeholder_v0ecjm.png';
    	console.log(this.space)});
  }

  updateSpace(){
  	this.spaceService.updateSpace(this.space,[])
  	.subscribe(resp => {console.log(resp)});
  }
  _toggleSidebar() {
    this._opened = !this._opened;
  }

 _onBackdropClicked(): void {
    console.info('Backdrop clicked');
  }
  makeMain(){
    console.log(45);
  }

  profileClick(){
    console.log(46);
  }
}
