import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../location';
import { Efiewura } from '../efiewura';
import { Photo } from '../photo';
import { Tag } from '../tag';
import { Space } from '../space';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
	@Input() space: Space;
	@Output() load: EventEmitter<boolean> = new EventEmitter()
  rootURL = 'http://api.efiewuragh.com';
	display:string;
	name:string = '';
	number:string = '';
	next:boolean;
	grant:string;
	loading:boolean;
	doneVar:boolean=false;
	httpOptions = {
			headers: new HttpHeaders({ 'Accept': 'application/json' })
		};
	totalAmount:number=0;
	rentAmount:number=0;
	feeAmount:number=0;

	loaderClass = {
		'load-complete':false,
		'load-success':false,
		'load-failure':false,

	};
	caretClass={
		'fa':true,
		'fa-caret-down':true,
		'fa-caret-up':false};
	check:any;
  constructor(private http: HttpClient,
  			  	private router: Router,
				private spinner: NgxSpinnerService) { }

  ngOnInit() {
  	this.doneVar = false;
  	this.loading = false;
  	this.next = false;
  	this.checkOut();
  }

  pay(){
  /*	let payload = {
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
					});*/
	this.loading = true;
	this.http.patch(this.rootURL+'/api/v1/space/'+this.space.id,JSON.stringify({grant:this.grant}), this.httpOptions)
			.subscribe((reponse)=>{
	(async ()=>{
						console.log(reponse);
		await this.delay(2000);
							this.success();
		await this.delay(2000);
  							this.spinner.show()
		await this.delay(3000);
							this.router.navigate(['/view/space/',this.space.id]);

	})();
					},(error)=>{
						console.log(error)
						this.fail();
					});	

  }

  checkOut(){
  	this.grant = this.grantGen(this.name);
  	//this.load.emit(true);
  	this.next = true;
  }

  validate(){
	if(this.name!=undefined){
		if(this.number!=undefined){
			let reg = /^([0]|\+233{1})([523]{1})([0-9]{8})/;
			if (reg.test(this.number)) {
				return false;
			}else{
				return true;
			}
		}else{
			return true;
		}
	}else{
		return true;
	}
  }
  toggleDrop(){
  	if(this.caretClass['fa-caret-down']){
  		this.caretClass['fa-caret-down'] = false;
  		this.caretClass['fa-caret-up'] = true;
  		this.display = 'none';
  	}else{
  		this.caretClass['fa-caret-down'] = true;
  		this.caretClass['fa-caret-up'] = false;
  		this.display = 'inline';
  	}

  }
  grantGen(name:string){
  	let arr = name.split(" ");
  	let ini = "";
  	switch (arr.length) {
  		case 1:
  			ini = arr[0].substring(0,4);
  			break;
  		case 2:
  			ini = arr[0].substring(0,2)+arr[1].substring(0,2);
  			break;
  		case 3:
  			ini = arr[0].substring(0,2)+arr[1].substring(0,1)+arr[2].substring(0,1);
  			break;
  		case 4:
  			ini = arr[0].substring(0,1)+arr[1].substring(0,1)+arr[2].substring(0,1)+arr[3].substring(0,1);
  			break;
  		case 5:
  			ini = arr[0].substring(0,1)+arr[1].substring(0,1)+arr[3].substring(0,1)+arr[4].substring(0,1);
  			break;
  		default:
  			for (var i = 0; i < arr.length; i++) {
  				if(i==0||i==1||i==arr.length-1||i==arr.length-2)
  					ini = ini + arr[i].substring(0,1)
  			}
  			break;
  	}
  	return ini.substring(0,2).toLowerCase()+Math.floor((Math.random()*900)+100)+ini.substring(2,4).toLowerCase()
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
  done(){
  	this.doneVar = true;
  }

  delay(ms:number){
  	return new Promise(resolve => setTimeout(resolve,ms));
  }
}
