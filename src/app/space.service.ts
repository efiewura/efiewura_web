import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Space } from './space';
@Injectable({ providedIn: 'root' })
export class SpaceService{
		private spacesUrl = '/api/v1/spaces?cat=';
		private spaceUrl = '/api/v1/space';
		private advancedSearch= query => '/api/v1/spaces/'+query+'search?q=';
		private searchUrl = '/api/v1/spaces/search?q='; //URL to web api
		httpOptions = {
			headers: new HttpHeaders({ 'Accept': 'application/json' })
		};

		constructor(
			private http: HttpClient
			){}

		getSpaces(category:string):Observable<Space[]>{
			return this.http.get<Space[]>(this.spacesUrl+category)
				.pipe(
					catchError(this.handleError<Space[]>('getSpaces',[])));
		}

		getSpace(id:number):Observable<Space[]>{
			return this.http.get<Space[]>(this.spaceUrl+'/'+id)
				.pipe(
					catchError(this.handleError<Space[]>('getSpace',[])));
		}
		searchSpaces(query:string):Observable<Space[]>{
			return this.http.get<Space[]>(this.searchUrl+query)
				.pipe(
					catchError(this.handleError<Space[]>('searchSpaces',[])));
		}


		searchSpacesByLocation(query:string, type:string='*', region:string='*', district:string='*'):Observable<Space[]>{
			let filter ='';
			if(type!='*')
				filter = filter+'typ='+region;
			if(filter!='')
				filter = filter+','
			if(region!='*')
				filter = filter+'reg='+region;
			if(filter!='')
				filter = filter+','
			if(district!='*')
				filter = filter+',dst='+district;
			if(filter!='')
				filter = filter+'/'
			return this.http.get<Space[]>(this.advancedSearch(filter)+query)
				.pipe(
					catchError(this.handleError<Space[]>('searchSpacesByLocation',[])));
		}

		//////// Save methods //////////

  /** POST: add a new space to the server */
  addSpace (space: Space){
    return this.http.post(this.spaceUrl, JSON.stringify(space), this.httpOptions).pipe(
      tap((newspace: Space) => this.log(`added space w/ id=${newspace.id}`)),
      catchError(this.handleError<Space>('addspace'))
    );
  }

  /** DELETE: delete the space from the server */
  deleteSpace (space: Space | number): Observable<Space> {
    const id = typeof space === 'number' ? space : space.id;
    const url = `${this.spaceUrl}/${id}`;

    return this.http.delete<Space>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted space id=${id}`)),
      catchError(this.handleError<Space>('deletespace'))
    );
  }

  /** PUT: update the space on the server */
  updateSpace (space: Space, updateList:any[]): Observable<Space> {
    return this.http.patch(this.spaceUrl+'/'+space.id, JSON.stringify(space),  this.httpOptions).pipe(
      tap(_ => this.log(`updated space id=${space.id}`)),
      catchError(this.handleError<any>('updatespace'))
    );
  }
		private handleError<Space>(operation = 'operation', result?: Space){
			return (error:any): Observable<Space> => {
				console.error(error);

				this.log(operation + 'failed:' +error.message);
				return of(result as Space);
			}
		}

		private log(message:string){
			console.log('SpaceService:'+message);
		}
}