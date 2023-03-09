import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHostComponent } from './event-host.component';

describe('EventHostComponent', () => {
  let component: EventHostComponent;
  let fixture: ComponentFixture<EventHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
