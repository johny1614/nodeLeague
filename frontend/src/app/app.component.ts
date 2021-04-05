import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HelloDBHelloColResource } from 'src/app/resources/HelloDB/HelloCol/HelloDBHelloColResource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('helloInput')
  helloInput: ElementRef;
  backendHelloWorld: string;

  constructor(private helloDBHelloColResource: HelloDBHelloColResource) {
  }

  ngOnInit(): void {
    this.helloDBHelloColResource.getHelloWorld().subscribe(x => {
      this.backendHelloWorld = x;
    });
  }

  sendToHelloDBHelloCol() {
    const value: string = this.helloInput.nativeElement.value;
    this.helloDBHelloColResource.postValue(value).subscribe(x => {
    });
  }
}
