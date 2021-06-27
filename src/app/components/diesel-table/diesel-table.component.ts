import { Component, OnInit, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-diesel-table',
  templateUrl: './diesel-table.component.html',
  styleUrls: ['./diesel-table.component.css']
})



export class DieselTableComponent implements OnInit {

  sharedmasterData: any;
  ColumnDefs;
  RowData: any;

  start = 0;
  rows = 40;

  message: string;

  constructor(private sharedService: SharedService) { }



  ngOnInit(): void {

    this.sharedService.sharedmasterData.subscribe(md => {
      if (!md) return;
      this.sharedmasterData = md;
      this.start = md.parameters.start;
      this.rows = md.parameters.rows;

      this.GetAgColumns();
      this.GetAgRows();
    });


  }




  retrievePageData(): void {
    let filterYear = '';
    if (this.sharedmasterData.parameters.refine)
      filterYear = this.sharedmasterData.parameters.refine.period;

    this.sharedService.getMasterDataWithPagination(filterYear, this.start, this.rows)
      .subscribe(
        response => {
          this.sharedmasterData = response;
          this.sharedService.updateMasterData(response);
          this.GetAgColumns();
          this.GetAgRows();
          //console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event): void {
   
    if (event === 'prev') {
      if (this.start === 0) return;
      this.start = this.start - 40;
    }
    if (event === 'next') {
      if (this.start > this.sharedmasterData.nhits) return;
      this.start = this.start + 40;
    }
    this.rows = 40;
    this.retrievePageData();
  }



  GetAgRows() {
    if (!this.sharedmasterData) return;
    if (!this.sharedmasterData.records) return;

    if (this.sharedmasterData.records.length === 10) {
      this.start = 0;
      this.rows = 40;
    }

    var rowDataTemp = [];
    let recordCountTemp = this.start;
    this.sharedmasterData.records.forEach(record => {
      var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let recDate = new Date(record.fields.period);
      var d = recDate.getDate();
      var m = strArray[recDate.getMonth()];
      var y = recDate.getFullYear();
      let full_date = m + ' ' + d + ',' + y;

      rowDataTemp.push(
        {
          'RecordNo': ++recordCountTemp,
          'Date': full_date,
          'LosAngeles': record.fields.los_angeles_ca_ultra_low_sulfur_carb_diesel_spot_price_daily,
          'NewYork': record.fields.new_york_harbor_ultra_low_sulfur_no_2_diesel_spot_price_daily,
          'GulfCoast': record.fields.u_s_gulf_coast_ultra_low_sulfur_no_2_diesel_spot_price_daily,
        }
      );

    });
    this.RowData = rowDataTemp;

  }


  GetAgColumns() {
    this.ColumnDefs = [
      { headerName: 'Record No', field: 'RecordNo', sortable: true, filter: false },
      { headerName: 'Date', field: 'Date', sortable: true, filter: false },
      { headerName: 'LosAngeles', field: 'LosAngeles', sortable: true, filter: false },
      { headerName: 'NewYork', field: 'NewYork', sortable: true, filter: false },
      { headerName: 'GulfCoast', field: 'GulfCoast', sortable: true, filter: false }
    ];
  }


}

