import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CloudinaryService } from '../cloudinary.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../location';
import { Efiewura } from '../efiewura';
import { Photo } from '../photo';
import { Tag } from '../tag';
import { Space } from '../space';

@Component({
  selector: 'app-photos-upload',
  templateUrl: './photos-upload.component.html',
  styleUrls: ['./photos-upload.component.css']
})
export class PhotosUploadComponent implements OnInit {
	@Input() space: Space;
	@Output() photos: EventEmitter<Photo[]> = new EventEmitter()
	widget: any;
  constructor(private cloudinary: CloudinaryService) { }

	@Input() upload(val:boolean){
  	console.log(val);
  }
  ngOnInit() {
  	console.log(this.upload);
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
          this.photos.emit(result.info);
        }
      }
    ).subscribe(widget => this.widget = widget);

  }

  phOpen(){
  	if(this.widget)
		this.widget.open();
  }

}
