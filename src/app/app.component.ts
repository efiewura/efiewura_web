import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'efiewura';

    constructor( ) {
    }
        // I get called once after the inputs have been bound for the first time.
    public ngOnInit() : void {
 
    }
}
