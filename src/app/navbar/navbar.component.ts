import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
logoUrl:string;
navScrolled: boolean = false;
navDis:boolean = true;
@HostListener('window:scroll', ['$event'])
onWindowScroll($event) {
    
      const scrollPosition = window.pageYOffset
      if(this.navDis)
      if(scrollPosition>35){
        this.navScrolled = true;
        this.logoUrl = "../../assets/img/efiewura.png"
      }else{
        this.navScrolled = false;
        this.logoUrl = "../../assets/img/efiewura-white.png"
      }
  }
  
handleRouteChange = () => {
    if (!(this.router.url.includes('about')||this.router.url.includes('home')||this.router.url.includes('contact'))) {
        this.navScrolled = true;
        this.logoUrl = "../../assets/img/efiewura.png"
        this.navDis = false;
    }else{
        this.navScrolled = false;
        this.logoUrl = "../../assets/img/efiewura-white.png"
        this.navDis = true;}
  };

  constructor( private router: Router, public el: ElementRef) { 
    router.events.subscribe( (event) => ( event instanceof NavigationEnd ) && this.handleRouteChange() )
  }

  ngOnInit() {
  	this.logoUrl = "../../assets/img/efiewura-white.png"
  }


  ev(e): void {
	}
}
