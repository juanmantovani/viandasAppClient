import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resume-order',
  templateUrl: './resume-order.component.html',
  styleUrls: ['./resume-order.component.css']
})
export class ResumeOrderComponent implements OnInit {

  @Input() isDisabledNext : boolean;
  @Output() stepComplete : EventEmitter <boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickNext() {
    this.stepComplete.emit();
  }

}
