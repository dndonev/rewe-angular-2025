import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserService } from './user.service';

describe('AppComponent', () => {

  let userService: UserService;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUser: () => {
              return {
                subscribe: () => {
                  return {
                    name: 'John'
                  };
                }
              };
            }
          }
        }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

  });

  it('should create the app', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    // Act
    const component = fixture.componentInstance;

    // Assert
    expect(component).toBeTruthy();
  });

  it(`should have as title '12.testing'`, () => {
    expect(component.title).toEqual('12.testing');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toEqual('12.testing app is running!');
  });

  it('should call getUser method', () => {
    const spy = spyOn(userService, 'getUser').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
