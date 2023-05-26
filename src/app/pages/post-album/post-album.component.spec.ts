import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAlbumComponent } from './post-album.component';

describe('PostAlbumComponent', () => {
  let component: PostAlbumComponent;
  let fixture: ComponentFixture<PostAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
