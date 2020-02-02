import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Space } from '../space';
import { SpaceService } from '../space.service'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
searchType:any='';

spaces: Space[];
  constructor(private spaceService: SpaceService,
  			  private activatedRoute: ActivatedRoute,
  			  private router: Router) { 
  	this.searchType = 'b4Search';
  }

  ngOnInit() {
  	 this.activatedRoute.queryParams.subscribe(params => {
        this.search(params['q'])
      });
  }

  search(query:string): void {
    this.spaceService.searchSpaces(query)
    .subscribe(heroes => this.spaces = heroes);
  }

}
