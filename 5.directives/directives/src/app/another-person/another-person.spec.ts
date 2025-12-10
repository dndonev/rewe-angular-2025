import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherPerson } from './another-person';

describe('AnotherPerson', () => {
  let component: AnotherPerson;
  let fixture: ComponentFixture<AnotherPerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnotherPerson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotherPerson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
