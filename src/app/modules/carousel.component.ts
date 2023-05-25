import { Component, Input, OnInit } from '@angular/core';
import { Picture } from '../models/picture.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() pictures: Picture[] = [];
  @Input() indicators = true;

  selectedIndex: number = 0;

  ngOnInit(): void {
    
  }

  selectPicture(index: number): void{
    this.selectedIndex = index;
  }

}
