import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { ChampionHoverDetailsComponent } from './champion-hover-details.component';


@Directive({
  selector: '[championHoverDetails]'

})
export class ChampionHoverDetailsDirective {
  private compFactory: ComponentFactory<ChampionHoverDetailsComponent> = this.componentFactoryResolver.resolveComponentFactory(ChampionHoverDetailsComponent);
  private tooltipComponentRef: ComponentRef<ChampionHoverDetailsComponent>;
  @Input('championHoverDetailsText')
  text: string;

  @HostListener('mouseenter') onMouseEnter(): void {
    this.tooltipComponentRef = this.viewContainerRef.createComponent(this.compFactory);
    this.tooltipComponentRef.instance.hoveredElementWidth = 120;
    this.tooltipComponentRef.instance.tooltipText = this.text;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.tooltipComponentRef.destroy();
  }

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,) {
  }
}
