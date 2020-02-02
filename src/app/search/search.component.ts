import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	@Input() searchType:any = 'b4Search';
	searched:any;
  constructor(
  			  private activatedRoute: ActivatedRoute,
  			  public router: Router) { }

  ngOnInit() {
  }

  ev(e): void {
  	e.preventDefault();
	}

}
