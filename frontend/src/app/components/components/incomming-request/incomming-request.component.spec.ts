import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncommingRequestComponent } from './incomming-request.component';

describe('IncommingRequestComponent', () => {
  let component: IncommingRequestComponent;
  let fixture: ComponentFixture<IncommingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncommingRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncommingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
