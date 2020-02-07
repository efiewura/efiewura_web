import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Tag } from './tag';
@Injectable({
  providedIn: 'root'
})
export class TagService {


  rootURL = 'http://api.efiewuragh.com';
		private TagsUrl = this.rootURL+'/api/v1/tags?cat=';
		private TownTagsUrl = this.rootURL+'/api/v1/tags/town/search?cat=';
		private TagUrl = this.rootURL+'/api/v1/tag/'; //URL to web api
		private searchUrl = this.rootURL+'/api/v1/tags/search?q='
		private searchTownUrl = this.rootURL+'/api/v1/tags/town/search?q='
		httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

		constructor(
			private http: HttpClient
			){}

		getTags(category:string):Observable<Tag[]>{
			return this.http.get<Tag[]>(this.TagsUrl+category)
				.pipe(
					catchError(this.handleError<Tag[]>('getTags',[])));
		}
		getTownTags(category:string):Observable<Tag[]>{
			return this.http.get<Tag[]>(this.TownTagsUrl+category)
				.pipe(
					catchError(this.handleError<Tag[]>('getTownTags',[])));
		}
		getTag(id:number):Observable<Tag[]>{
			return this.http.get<Tag[]>(this.TagUrl+id)
				.pipe(
					catchError(this.handleError<Tag[]>('getTag',[])));
		}
		searchTags(query:string):Observable<Tag[]>{
			return this.http.get<Tag[]>(this.searchUrl+query)
				.pipe(
					catchError(this.handleError<Tag[]>('searchTags',[])));
		}
		searchTownTags(query:string):Observable<Tag[]>{
			return this.http.get<Tag[]>(this.searchTownUrl+query)
				.pipe(
					catchError(this.handleError<Tag[]>('searchTownTags',[])));
		}

		//////// Save methods //////////

  /** POST: add a new Tag to the server */
  addTag (Tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.TagUrl, Tag, this.httpOptions).pipe(
      tap((newTag: Tag) => this.log(`added Tag w/ id=${newTag.id}`)),
      catchError(this.handleError<Tag>('addTag'))
    );
  }

  /** DELETE: delete the Tag from the server */
  deleteTag (Tag: Tag | number): Observable<Tag> {
    const id = typeof Tag === 'number' ? Tag : Tag.id;
    const url = `${this.TagUrl}/${id}`;

    return this.http.delete<Tag>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Tag id=${id}`)),
      catchError(this.handleError<Tag>('deleteTag'))
    );
  }

  /** PUT: update the Tag on the server */
  updateTag (Tag: Tag, updateList:any[]): Observable<any> {
    return this.http.patch(this.TagUrl, Tag, this.httpOptions).pipe(
      tap(_ => this.log(`updated Tag id=${Tag.id}`)),
      catchError(this.handleError<any>('updateTag'))
    );
  }
		private handleError<Tag>(operation = 'operation', result?: Tag){
			return (error:any): Observable<Tag> => {
				console.error(error);

				this.log(operation + 'failed:' +error.message);
				return of(result as Tag);
			}
		}

		private log(message:string){
			console.log('TagService:'+message);
		}
}