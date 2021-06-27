import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {

  sharedmasterData: any;
  chart: any;
  highchartsData: Observable<any>;

  chartTypes = [
    { id: `line`, name: `line` },
    { id: `spline`, name: `spline` },
    { id: `area`, name: `area` },
    { id: `areaspline`, name: `areaspline` },
    { id: `column`, name: `column` },
    { id: `bar`, name: `bar` },
    { id: `pie`, name: `pie` },
    { id: `scatter`, name: `scatter` },
    { id: `gauge`, name: `gauge` }
  ];

  selectedChartType: any;

  constructor(private sharedService: SharedService) { }


  ngOnInit(): void {
    this.selectedChartType =`line`;

    this.sharedService.sharedmasterData.subscribe(md => {
      if (!md) return;
      this.sharedmasterData = md;

      let filterFlag = false;
      let year = '';
      if (md.parameters.refine) {
        filterFlag = true;
        year = md.parameters.refine.period;
      }

      this.sharedService.getHighChartsData(filterFlag, year).subscribe(d => {
        this.highchartsData = d;
        console.log(this.highchartsData);


        this.BindHighcharts();
      });


    });



  }

  onChartTypeChanged(value) {
    this.selectedChartType = value;

    this.BindHighcharts();
  }


  extractColumn(arr, column1) {
    return arr.map(o => ([o.x.year, o[column1]]));
    //.map(o => ({name: o.name, id: o.id}))
  }

  BindHighcharts() {
    var data = [];

    let series1Data = this.extractColumn(this.highchartsData, 'serie1-1');
    data.push({
      name: 'Los Angeles, CA Ultra-Low Sulfur CARB Diesel Spot Price in Dollars per Gallon',
      color: '#66c2a5',
      type: this.selectedChartType,
      data: series1Data
    });

    let series2Data = this.extractColumn(this.highchartsData, 'serie1-2');
    data.push({
      name: 'New York Harbor Ultra-Low Sulfur No 2 Diesel Spot Price  in Dollars per Gallon',
      color: '#fc8d62',
      type: this.selectedChartType,
      data: series2Data
    });

    let series3Data = this.extractColumn(this.highchartsData, 'serie1-3');
    data.push({
      name: 'U.S. Gulf Coast Ultra-Low Sulfur No 2 Diesel Spot Price  in Dollars per Gallon',
      color: '#8da0cb',
      type: this.selectedChartType,
      data: series3Data
    });



    var options = {
      chart: { renderTo: 'container', type: 'line' },
      title: { text: '' },
      series: []
    };

    options.series = data;


    this.chart = new Chart(options);
  }

}


