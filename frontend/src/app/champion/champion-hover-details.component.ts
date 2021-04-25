import { Component, Input, OnInit } from '@angular/core';

@Component({
    template: `<span class="tooltiptext" style="transform: translateY(-20px);" [ngStyle]="{'margin-left': marginLeft}">{{tooltipText}}</span>`,
    styleUrls: ['./champion-hover-details.component.scss']
  }
)
export class ChampionHoverDetailsComponent implements OnInit {
  @Input()
  hoveredElementWidth: number;

  @Input()
  tooltipText: string = 'Tooltip text';

  marginLeft: string;

  ngOnInit(): void {
    this.marginLeft = '-' + this.hoveredElementWidth + 'px';
  }

}
