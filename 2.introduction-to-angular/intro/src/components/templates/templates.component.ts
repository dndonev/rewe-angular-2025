import { Component } from '@angular/core';

@Component({
  selector: 'app-templates',
  // template: `
  //   <h1>Templates</h1>
  //   <input placeholder="template input">
  // `,
  templateUrl: './templates.component.html',
  // styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {
  public isTemplate: boolean = true;
  public fullName: string = 'John Doe';
}
