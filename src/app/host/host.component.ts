import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Space } from '../space';
import { Efiewura } from '../efiewura';
import { Location } from '../location';
import { Photo } from '../photo';
import { Tag } from '../tag';
import { SpaceService } from '../space.service';
import { TagService } from '../tag.service';
import { ModalService } from '../_modal/modal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { CloudinaryService } from '../cloudinary.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})

export class HostComponent implements OnInit {
	space = new Space();
	efiewura = new Efiewura();
	location = new Location();
  rootURL = 'http://api.efiewuragh.com';
	tags:Tag[];
	towns:Tag[];
	spaceTags:Tag[] = [];
	tag:any;
	photo = new Photo();
	photos:any=[];
	selectedTag:string;
	valid:boolean[];
	tagDiv:any = '<div></div>';
	headers = new Headers();
	loading:boolean;
	resp:any;
	districts:any[];
	httpOptions = {
			headers: new HttpHeaders({ 'Accept': 'application/json' })
		};
  widget: any;
  widget2:any;
  proUped:boolean;
  profileUrl:string;
	upload:boolean;
  constructor(	private spaceService: SpaceService,
  				private tagService: TagService,
				private http: HttpClient,
				private modalService: ModalService,
				private spinner: NgxSpinnerService,
  			  	private router: Router,
				private cloudinary: CloudinaryService) { }

	ngOnInit() {
		this.upload = false;
	this.profileUrl  = "https://res.cloudinary.com/dmvymb8nn/image/upload/t_media_lib_thumb/v1566009080/avatar-placeholder_v0ecjm.png";
	this.loading = false;
	this.valid =[false,false,false,false,false,false,false];
	this.space.negFlag = true;
	this.spaceTags = [];
		this.tagService.getTags('all')
		.subscribe(tags => this.tags = tags);
		this.tagService.getTownTags('all')
		.subscribe(tags => this.towns = tags);
	this.cloudinary.createUploadWidget(
      {
            cloudName: "dmvymb8nn",    
            uploadPreset: "qrzvjxti",    
            sources: [        
                "local",        
                "url",        
                "camera",        
                //"facebook",        
                //"dropbox",        
                //"instagram",        
                "image_search"    
            ],     
            form:'#custom-form',   
            fieldName:'image[]',
            cropping: false,    
            multiple: false, 
            defaultSource: "local",
            styles: {        
                palette: {            
                    window: "#FFFFFF",            
                    windowBorder: "#90A0B3",            
                    tabIcon: "#0078FF",            
                    menuIcons: "#5A616A",            
                    textDark: "#000000",            
                    textLight: "#FFFFFF",            
                    link: "#0078FF",            
                    action: "#FF620C",            
                    inactiveTabIcon: "#103B73",            
                    error: "#F44235",            
                    inProgress: "#0078FF",            
                    complete: "#20B832",            
                    sourceBg: "#E4EBF1"        
                },        
                fonts: {            
                    default: null,            
                    "'Kalam', cursive": {                
                        url: "https://fonts.googleapis.com/css?family=Kalam",                
                        active: true            
                    }        
                }    
            }
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
          this.photo = new Photo(result.info.url,result.info.signature);
          this.profileUrl = result.info.thumbnail_url;	
          console.log(this.profileUrl);
        }
      }
    ).subscribe(widget => this.widget = widget);

    this.cloudinary.createUploadWidget(
      {
            cloudName: "dmvymb8nn",    
            uploadPreset: "qrzvjxti",    
            sources: [        
                "local",        
                "url",        
                "camera",        
                //"facebook",        
                //"dropbox",        
                //"instagram",        
                "image_search"    
            ],     
            form:'#custom-form',   
            fieldName:'image[]',
            cropping: false,    
            multiple: true,
            maxFiles:5, 
            defaultSource: "local",
            styles: {        
                palette: {            
                    window: "#FFFFFF",            
                    windowBorder: "#90A0B3",            
                    tabIcon: "#0078FF",            
                    menuIcons: "#5A616A",            
                    textDark: "#000000",            
                    textLight: "#FFFFFF",            
                    link: "#0078FF",            
                    action: "#FF620C",            
                    inactiveTabIcon: "#103B73",            
                    error: "#F44235",            
                    inProgress: "#0078FF",            
                    complete: "#20B832",            
                    sourceBg: "#E4EBF1"        
                },        
                fonts: {            
                    default: null,            
                    "'Kalam', cursive": {                
                        url: "https://fonts.googleapis.com/css?family=Kalam",                
                        active: true            
                    }        
                }    
            }
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
          this.photo = new Photo(result.info.url,result.info.signature);
          this.profileUrl = result.info.thumbnail_url;	
          console.log(this.profileUrl);
        }
      }
    ).subscribe(widget => this.widget2 = widget);
	}
makeTrue(){
	this.upload = true;
	console.log(this.upload);
			this.openModal('custom-modal-2');
}

makeMain(){
	console.log(45);
}
	Upload(){
		this.validateName();
		this.validateNumber();
		this.validateRegion();
		this.validateTown();
		this.validatePrice();
	  	if(this.BOOL(this.valid)){
			this.openModal('custom-modal-1');
		  	console.log(this.spaceTags);
		  	this.efiewura.photo = this.photo;
			this.space.efiewura = this.efiewura;
			this.space.location = this.location;
			this.space.tags = this.spaceTags;
			this.space.photos = this.photos;
			this.http.post(this.rootURL+'/api/v1/space',JSON.stringify(this.space))
				.subscribe((response)=>{
							this.resp = response;
							console.log(this.resp);
							this.space.id = this.resp.id;
						},(error)=>{
							this.closeModal('custom-modal-1');
							console.log(error)
						});
		}
	}

	searchTag(val){
	}

	addTag(tagId){
		console.log('Add Tag');
		if (!/[0-9]{1,3}/.test(tagId)){
			this.addNewTag(tagId,1);
		}else{
			let tag =this.tags.filter(ob => ob.id == tagId)[0]
			this.spaceTags.push(tag);
			if (/^[0-9]{1,3}/.test(this.location.town)) {	
				this.location.town=tag.name;
			}else{
				this.tagDiv = this.tagDiv + '<span class="badge badge-secondary">'+tag.name+'</span>';
			}
			this.tag='';
		}
	}

	addNewTag(tagName,ty){
		console.log('Add New Tag');
	  	let tag = new Tag();
	  	tag.name = tagName;
	  	this.spaceTags.push(tag);
	  	if (ty==1) {	
				this.location.town=tag.name;
			}else{
				this.tagDiv = this.tagDiv + '<span class="badge badge-secondary">'+tagName+'</span>';
			}
		this.tag='';
	}

	patternCheck(){
		if(this.valid[2])this.validateNumber();
	}

	validateName(){
				if(this.efiewura.name!=undefined){
					this.valid[0] = false;
					return true;
				}else{
					this.valid[0] = true;
					return false;
				}
		}
	
	validateNumber(){
				if(this.efiewura.number!=undefined){
					this.valid[1] = false;
					let reg = /^([0]|\+233{1})([523]{1})([0-9]{8})/;
					if (reg.test(this.efiewura.number)) {
						this.valid[2] = false;
						return true;
					}else{
						this.valid[2] = true;
						return false;
					}
				}else{
					this.valid[1] = true;
					return false;
				}
		}
	
	validateRegion(){
				if(this.location.region!=undefined){
					this.valid[3] = false;
					return true;
				}else{
					this.valid[3] = true;
					return false;
				}
		}


	validateTown(){
				if(this.location.town!=undefined){
					this.valid[4] = false;
					return true;
				}else{
					this.valid[4] = true;
					return false;
				}
		}

	validatePrice(){
				if(this.space.price!=undefined){
					this.valid[5] = false;
					return true;
				}else{
					this.valid[5] = true;
					return false;
				}
		}

	BOOL(arr:boolean[]){
		for (var i = 0; i < arr.length; ++i) {
			if(i!=6&&arr[i]){
				return false;
			}
			if(i==6&&!arr[i]){
				return false;
			}
		}
		return true;
	}

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    load(val:boolean){
    	this.loading = val;
    }

    getPhotos(val:any){
    	this.photos.push(val);
    	console.log('Info: ',val);
    }

  openWidget() {
    if (this.widget) {
      console.log('open')
      this.widget.open();
    }
  }

  openWidget2() {
    if (this.widget2) {
      console.log('open2')
      this.widget2.open();
    }
  }
  editWidget() {
    if (this.widget) {
      console.log('open')
      this.widget.open(null, {files:[this.profileUrl]});
    }
  }

  cloudinaryPath(value:string,options:string=''){
  	options = options + (options!='')? '/':'';
  	return 'https://res.cloudinary.com/dmvymb8nn/image/upload/'+options+'v1566009080/'+value
  }
profileClick(){
if(!this.proUped)
	this.openWidget();
else
	this.editWidget();
}
}