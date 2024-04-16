import { Component } from '@angular/core';
import { chuckNorrisSercice } from './services/chucknorris.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Colsubsidio';
  chuckNorris : any

  constructor(
    private chuckNorrisSercice : chuckNorrisSercice,
  ) { }

  ngOnInit(): void {
    this.chuckNorrisSercice.chucknorris().subscribe((data) =>{
      this.chuckNorris = data;
    })
  }


}
