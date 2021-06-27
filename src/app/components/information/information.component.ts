import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})


export class InformationComponent implements OnInit {
  

  sharedmasterData: any;


  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

    this.sharedService.sharedmasterData.subscribe(sharedmasterData => this.sharedmasterData = sharedmasterData);


  }




}
