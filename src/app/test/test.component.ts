import { Component, OnInit, NgModule } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '../location';
import { Efiewura } from '../efiewura';
import { Photo } from '../photo';
import { Tag } from '../tag';
import { Space } from '../space';
import { SpaceService } from '../space.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, style, animate, transition, state, keyframes } from '@angular/animations';
import { CloudinaryService } from '../cloudinary.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations:[
  trigger('buttonHover', [
  	transition('*=>completeCheck',[
			  	animate('1.2s', keyframes([
			  					style( {
			    height: 0,
			    width: 0,
			    opacity: 1
			  })
			  					,style( {
			    height: 0,
			    width: '30px',
			    opacity: 1
			  })
			  					,style( {
			    height: '60px',
			    width: '30px',
			    opacity: 1
			  })
			  					,style( {
			    height: '60px',
			    width: '30px',
			    opacity: 1
			  })
			  				]))
			  			]
			  			)]
  	)]
			  	

})
export class TestComponent implements OnInit {

    countries = [
       {id: 'nav', name: "Navbar Search"},
       {id: 'b4Search', name: "Search in Search Page before Search"},
       {id: 'aftSearch', name: "Search in Search Page after Search"}
     ];
    selectedValue = null;
    searchType:any = '';
	spaces: Space[];
	photos:Photo[];
	space;
	httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
	loaderClass = {
		'load-complete':false,
		'load-success':false,
		'load-failure':false,

	};
	buttonHover:boolean = false;
	check:any;
  widget: any;
	  private _opened: boolean = false;
	  private _showBackdrop:boolean=true;
  constructor(private spaceService: SpaceService,
				private http: HttpClient,
				private spinner: NgxSpinnerService,
				private cloudinary: CloudinaryService) { }

  ngOnInit() {

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
          this.photos.push(new Photo(result.info.public_id,result.info.etag))
        }
      }
    ).subscribe(widget => this.widget = widget);

  	this.spinner.show()

  	 setTimeout(()=>{
  	 	this.spinner.hide();
  	 },5000);
    this.getSpacesByRegion();

    //this.spaceService.getSpace(45)
    //.subscribe(space =>{ this.space = space;console.log(this.space.efiewura)});
  }

    private _toggleSidebar() {
    this._opened = !this._opened;
  }

  private _onBackdropClicked(): void {
    console.info('Backdrop clicked');
  }
  update():void{
  	console.log(this.selectedValue);
  	this.searchType = this.selectedValue.id;
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
    this.spaceService.searchSpacesByLocation('*','house','AS')
    .subscribe(spaces => this.spaces = spaces);
  }

  pay(){
  	let payload = {
  					"price": 1,
  					"network": "mtn",
  					"recipient_number": "0540757034",
  					"sender": "0540757034",
  					"option": "rmtm",
  					"apikey": "401ac4c34c87f76b39dfa2438d2581096a4a0056",
  					"orderID": "asdfhgjksl"
  					};

  	this.http.post('https://client.teamcyst.com/api_call.php',JSON.stringify(payload), this.httpOptions)
			.subscribe((reponse)=>{
						console.log(reponse);
					},(error)=>{
						console.log(error)
					});
  }
  success(){
	this.loaderClass = {
		'load-complete':true,
		'load-success':true,
		'load-failure':false,

	};
	this.check = 'inline';
  }
  fail(){
	this.loaderClass = {
		'load-complete':true,
		'load-success':false,
		'load-failure':true,

	};
	this.check = 'none';
  }
  clear(){
	this.loaderClass = {
		'load-complete':false,
		'load-success':false,
		'load-failure':false,

	};
	this.check = 'none';
  }

  openWidget() {
    if (this.widget) {
      console.log('open')
      this.widget.open(null, {files: ["https://res.cloudinary.com/dmvymb8nn/image/upload/t_media_lib_thumb/v1566009080/avatar-placeholder_v0ecjm.png"]});
    }
  }

  upload(){}
  /*$('#profileUpBtn').on('focus', function () {
          $('#profileAlert').hide();
          if(validateName($('#host-name').val())==222&&validateNumber($('#host-contact').val())==222){
            var holder = $(this);
            holder.parent().siblings().trigger('focus');
            holder.parent().parent().parent().parent().parent().addClass('is-focused');
            holder.parent().parent().parent().find('input').attr('disabled', true);
            holder.attr('disabled', true);
            var widget = cloudinary.openUploadWidget({    
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
            fieldName:'userImg',
            cropping: true,    
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
        (err, result) => {   
            if (!err) {   
               console.log("Upload Widget event - ", result); 
               if (widget.isShowing()&&(holder.attr('disabled')=='disabled')){
                  holder.parent().parent().find('input').attr('disabled', false);
                  holder.attr('disabled', false);
                  holder.parent().parent().parent().parent().parent().removeClass('is-focused');
               }  
            }  
            if (result && result.event === "queues-end") {
              if($("input[name='userImg']").length!=0){
                $("input[name='userImg']").remove();
              }
              }
            if (result && result.event === "success") {
               console.log((holder.parent().parent().find('img')));
               if(holder.parent().parent().find('img').length==0){
                     holder.parent().parent().prepend('<img id="profile" src="'+result.info.thumbnail_url+'"  alt="..." class="img-thumbnail">');
                     holder.parent().parent().parent().addClass('col-md-4 offset-md-4');
                     holder.parent().parent().parent().removeClass('col-md-12');
                     holder.parent().parent().find('input').hide();
                     holder.attr('disabled', false);
                  ///setCookie(((getCookie('Uname')==imageId)?imageId:getCookie('Uname'))+'_img', i , 1);
                }else{
                     holder.parent().parent().find('img').attr('src', result.info.thumbnail_url);
                }
              }
        });
        }
      });*/
}
