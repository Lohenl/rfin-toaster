import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoobplaceholderComponent } from './shoobplaceholder.component';

describe('ShoobplaceholderComponent', () => {
  let component: ShoobplaceholderComponent;
  let fixture: ComponentFixture<ShoobplaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoobplaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoobplaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
