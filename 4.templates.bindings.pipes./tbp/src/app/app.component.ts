import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'tbp';
  inputValue: string = 'my input';
  placeholder: string = 'Please enter a name';
  isDisabled: boolean = true;
  isActive: boolean = true;
  fontSize: string = '24px';
  myObj = {
    name: 'Dobri'
  }
  color: string = 'pink';
  keyUpPlaceholder: string = 'on key up';

  public onKeyUp() {
    console.log('oon key uped')
  }

  public alertForClicked() {
    alert('Clicked');
  }
}
