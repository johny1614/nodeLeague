import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionsDisplayerComponent } from './champions-displayer.component';

describe('ChampionsDisplayerComponent', () => {
  let component: ChampionsDisplayerComponent;
  let fixture: ComponentFixture<ChampionsDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionsDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionsDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
