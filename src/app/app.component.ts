import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demoApp';
  message:string;
  leftPanelState:boolean = true;

constructor(private sharedService: SharedService) { }

  ngOnInit() {

  }



}
