import { Efiewura } from './efiewura'
import { Location } from './location'
import { Photo } from './photo'
import { Tag } from './tag'

export class Space {
  id: number;
  type: string;
  description: string;
  price: string;
  negFlag: boolean;
  negotiation: string;
  grant: string;
  efiewura:Efiewura;
  location:Location;
  photos:Photo[];
  tags:Tag[];
  addDate:string;
  lastUpdate:string;
  negVal:any;
}
