import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.css']
})
export class ExportDataComponent implements OnInit {
  sharedmasterData: any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

    this.sharedService.sharedmasterData.subscribe(md => {
      if (!md) return;
      this.sharedmasterData = md;
    });
  }

  exportToCsv(): void {
    if (!this.sharedmasterData) return;

    this.sharedService.exportToCsv(this.sharedmasterData.records, 'USA Daily Diesel Spot Price- Dataset', ['period'
      , 'los_angeles_ca_ultra_low_sulfur_carb_diesel_spot_price_daily', 'new_york_harbor_ultra_low_sulfur_no_2_diesel_spot_price_daily', 'u_s_gulf_coast_ultra_low_sulfur_no_2_diesel_spot_price_daily']);
  }
}
