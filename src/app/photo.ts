export class Photo {
  id: number;
  etag: string;
  location: string;
  addDate:string;
  lastUpdate:string
  main:boolean;

  constructor( location:string="" , etag:string=""){
  	this.location = location;
  	this.etag = etag;
  }
}