import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonWithAvatar } from './person-with-avatar';

describe('PersonWithAvatar', () => {
  let component: PersonWithAvatar;
  let fixture: ComponentFixture<PersonWithAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonWithAvatar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonWithAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
