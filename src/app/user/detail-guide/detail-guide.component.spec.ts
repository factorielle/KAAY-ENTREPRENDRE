import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGuideComponent } from './detail-guide.component';

describe('DetailGuideComponent', () => {
  let component: DetailGuideComponent;
  let fixture: ComponentFixture<DetailGuideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailGuideComponent]
    });
    fixture = TestBed.createComponent(DetailGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
