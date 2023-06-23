import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {


  @Input() public photoUrl: string;

  @Input() public name: string;
  @Input() public lastName: string;


  public showInitials = false;
  public initials: string;
  public circleColor: string;

  private colors = [
    '#EB7181', // red
    '#468547', // green
    '#FFD558', // yellow
    '#3670B2', // blue
];

  constructor() { }

  ngOnInit() {

    if (!this.photoUrl) {
        this.showInitials = true;
        this.createInititals();

        const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
        this.circleColor = this.colors[randomIndex];
    }

}

private createInititals(): void {
    this.initials = this.name.charAt(0).toUpperCase() + this.lastName.charAt(0).toUpperCase();
}

}
