import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnChanges {
  @Input() rating: number = 0;
  // rating: number = 5;
  cropWidth: number = 75;
  //use to pull out the data to parent component
  @Output() ratingClicked: EventEmitter<string> =  new EventEmitter<string>();

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75 / 5;
  }

  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
     //console.log(`The rating ${this.rating} was clicked!`);
  }
}
