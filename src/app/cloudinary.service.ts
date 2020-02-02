import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { Observable, of, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
declare let cloudinary;

const widgetUrl = 'https://widget.cloudinary.com/v2.0/global/all.js';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // create the upload widget
  public createUploadWidget(data: any, callback: (error: any, result: any) => void): Observable<any> {
    return this.skriptExists(widgetUrl)
      ? of(cloudinary.createUploadWidget(data, callback))
      : fromEvent(this.addJsToElement(widgetUrl), 'load').pipe(
        map(e => cloudinary.createUploadWidget(data, callback))
      );
  }

  // check if js file is already embeded
  private skriptExists(src: string): boolean {
    return document.querySelector('script[src="' + src + '"]') ? true : false;
  }

  // embed external js file in html
  private addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}