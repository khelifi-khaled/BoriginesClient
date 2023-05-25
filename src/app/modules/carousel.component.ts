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
  @Input() controls = true;

  selectedIndex: number = 0;

  ngOnInit(): void {
    
  }

  selectPicture(index: number): void{
    this.selectedIndex = index;
  }

  onPrevClick(): void{
    if(this.selectedIndex === 0)
      this.selectedIndex = this.pictures.length - 1;
    else
      this.selectedIndex--;
  }

  onNextClick(): void{
    if(this.selectedIndex === this.pictures.length - 1)
      this.selectedIndex = 0;
    else
      this.selectedIndex++;
  }

}
