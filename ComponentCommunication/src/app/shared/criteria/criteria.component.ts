import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit, AfterViewInit {
  //listFilter: string ="";
  @Input() displayDetail!: boolean;
  @Input() hitCount: number=0;
  hitMessage: string="";
  @ViewChild('filterElement') filterElementRef!: ElementRef;
  
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  private _listFilter: string="";
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits:' + this.hitCount;
    }
  }

  ngAfterViewInit(): void {
    if (this.filterElementRef) {
        this.filterElementRef.nativeElement.focus();
    }
  }
}
