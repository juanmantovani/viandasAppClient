import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/shared/models/Client';
import { Tanda } from 'src/app/shared/models/Tanda';

@Component({
  selector: 'app-tanda-info',
  templateUrl: './tanda-info.component.html',
  styleUrls: ['./tanda-info.component.css']
})
export class TandaInfoComponent implements OnInit {
  @Input() listClient: Client[];
  @Input() tanda: Tanda;

  constructor() { }

  ngOnInit(): void {
  }

}
