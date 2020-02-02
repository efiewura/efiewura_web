import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosUploadComponent } from './photos-upload.component';

describe('PhotosUploadComponent', () => {
  let component: PhotosUploadComponent;
  let fixture: ComponentFixture<PhotosUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
