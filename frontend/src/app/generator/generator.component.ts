import { Component, OnInit } from '@angular/core';
import {Speech} from './models/speech'
import {GeneratorService} from './services/generator.service'


@Component({
  selector: 'generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
  providers: [GeneratorService]
  
})
export class GeneratorComponent implements OnInit {
  errorMessage: string;
  speech: Speech;
  mode = 'Observable';
  constructor(private generatorService: GeneratorService ) { }

  ngOnInit() {
    this.getSpeech();
    
  }

  getSpeech(){
    this.generatorService.getSpeech().
      subscribe(
        speech => this.speech=speech,
        error => this.errorMessage = <any>error
      );
  }

  clicked(event){
    this.getSpeech();
  }

}
