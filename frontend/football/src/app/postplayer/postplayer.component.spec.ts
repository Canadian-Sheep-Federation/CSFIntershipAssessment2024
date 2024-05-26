import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostplayerComponent } from './postplayer.component';

describe('PostplayerComponent', () => {
  let component: PostplayerComponent;
  let fixture: ComponentFixture<PostplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostplayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
