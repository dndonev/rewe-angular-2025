import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IPersonDetails } from '../types/person.types';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnChanges, OnInit {

  @Input() personDetails: IPersonDetails | undefined;
  @Output() personDetailsChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!(changes as any).personDetails.firstChange) {
      this.personDetailsChange.emit('Person details has changed!');
    };
  }

  ngOnInit(): void {
    if (!this.personDetails) return;

    console.log('[FROM CHILD]', this.personDetails);
  }
}
