import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  @Input() messaggeSuccess : string | null;
  @Input() messaggeSuccess2 : string | null;


  constructor() { }

  ngOnInit(): void {
  }

}
