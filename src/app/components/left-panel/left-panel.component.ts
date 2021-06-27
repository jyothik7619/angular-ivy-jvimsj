import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})


export class LeftPanelComponent implements OnInit, OnChanges {
  @Input() leftPanelState;

  nhits: any;
  parameters: any;
  records: any;
  facetGroups: any;
  currentIndex = -1;

  sharedmasterData: any;

  message: string;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {


    this.sharedService.sharedmasterData.subscribe(md => this.sharedmasterData = md);

    this.retrieveDieselPrices();

  }



  retrieveDieselPrices(): void {
    this.sharedService.getDieselSpotPriceMasterData()
      .subscribe(
        data => {
          this.nhits = data.nhits;
          this.parameters = data.parameters;
          this.records = data.records;
          this.facetGroups = data.facet_groups[0];

          this.sharedService.updateMasterData(data);
        },
        error => {
          console.log(error);
        });
  }

  clearFilter(): void {
    this.retrieveDieselPrices();
  }


  ngOnChanges() {
    console.log("inside ngOnChanges with leftPanelState: ", this.leftPanelState);
  }

  getMonthName(facetMonth): string {
    var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = strArray[(parseInt(facetMonth) - 1)];
    return month;
  }

  getLeftPanelFilterData(facetName): void {

    this.sharedService.getDieselDataForLeftPanelSelection(facetName).subscribe(
      data => {
        this.nhits = data.nhits;
        this.parameters = data.parameters;
        this.records = data.records;
        this.facetGroups = data.facet_groups[0];

        this.sharedService.updateMasterData(data);
      },
      error => {
        console.log(error);
      });
  }
}
