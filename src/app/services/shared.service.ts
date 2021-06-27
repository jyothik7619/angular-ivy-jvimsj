import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const baseUrl = 'https://datasource.kapsarc.org/api/records/1.0/search/?dataset=usa-diesel-spot-price-1986-2016&q=&rows=40&sort=-period&start=0&facet=period';


const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';


export interface DieselPrice {
  // Properties
}

interface ResponseDieselPrices {
  results: DieselPrice[];
}


@Injectable({
  providedIn: 'root'
})



export class SharedService {

  masterData = new BehaviorSubject<any>(null);
  sharedmasterData = this.masterData.asObservable();

  chartData = new BehaviorSubject<any>(null);
  highchartData = this.chartData.asObservable();


  constructor(private http: HttpClient) { }



  updateMasterData(masterData: any) {
    this.masterData.next(masterData);
    console.log(`*****service START, updated master data`);
    console.log(masterData);
    console.log(`*****service END, updated master data`);

  }

  //============================================================================================================================
  getDieselSpotPriceMasterData(): any {
    return this.http.get(baseUrl);
  }

  getMasterDataWithPagination(year, start, rows): any {
    var URL = ''
    if (year === '') {
      URL = `https://datasource.kapsarc.org/api/records/1.0/search/?rows=${rows}&sort=-period&start=${start}&dataset=usa-diesel-spot-price-1986-2016&timezone=Asia%2FKolkata&lang=en`;
    }
    else {
      URL = `https://datasource.kapsarc.org/api/records/1.0/search/?rows=${rows}&refine.period=${year}&sort=-period&start=${start}&dataset=usa-diesel-spot-price-1986-2016&timezone=Asia%2FKolkata&lang=en`;

    }
    return this.http.get(URL);
  }

  getLeftPanelFilterData(year): any {
    return this.http.get(`https://datasource.kapsarc.org/api/records/1.0/search/?sort=-period&refine.period=${year}&rows=0&facet=period&facetsort.period=-alphanum&dataset=usa-diesel-spot-price-1986-2016&timezone=Asia%2FKolkata&lang=en`);
  }

  getDieselDataForLeftPanelSelection(year): any {
    return this.http.get(`https://datasource.kapsarc.org/api/records/1.0/search/?rows=40&sort=-period&refine.period=${year}&start=0&dataset=usa-diesel-spot-price-1986-2016&timezone=Asia%2FKolkata&lang=en`);
  }

  getHighChartsData(filterFlag, year): Observable<any> {
    if (!filterFlag) {
      var url = `https://datasource.kapsarc.org/api/records/1.0/analyze/?dataset=usa-diesel-spot-price-1986-2016&x=period.year&sort=x.period.year&maxpoints=&y.serie1-1.expr=los_angeles_ca_ultra_low_sulfur_carb_diesel_spot_price_daily&y.serie1-1.func=AVG&y.serie1-1.cumulative=false&y.serie1-2.expr=new_york_harbor_ultra_low_sulfur_no_2_diesel_spot_price_daily&y.serie1-2.func=AVG&y.serie1-2.cumulative=false&y.serie1-3.expr=u_s_gulf_coast_ultra_low_sulfur_no_2_diesel_spot_price_daily&y.serie1-3.func=AVG&y.serie1-3.cumulative=false&timezone=Asia%2FKolkata&lang=en`;
    }
    else {
      var url = `https://datasource.kapsarc.org/api/records/1.0/analyze/?refine.period=${year}&dataset=usa-diesel-spot-price-1986-2016&x=period.year&sort=x.period.year&maxpoints=&y.serie1-1.expr=los_angeles_ca_ultra_low_sulfur_carb_diesel_spot_price_daily&y.serie1-1.func=AVG&y.serie1-1.cumulative=false&y.serie1-2.expr=new_york_harbor_ultra_low_sulfur_no_2_diesel_spot_price_daily&y.serie1-2.func=AVG&y.serie1-2.cumulative=false&y.serie1-3.expr=u_s_gulf_coast_ultra_low_sulfur_no_2_diesel_spot_price_daily&y.serie1-3.func=AVG&y.serie1-3.cumulative=false&timezone=Asia%2FKolkata&lang=en`;
    }

    return this.http.get<ResponseDieselPrices>(url).pipe(
      map(res => res || []),
      catchError(error => throwError(error.message || error))
    );
  }

  public exportToCsv(rows: any[], fileName: string, columns?: string[]): string {
    if (!rows) {
      return;
    }
    const separator = ',';
    if (!rows[0].fields) return;
    const keys = Object.keys(rows[0].fields).filter(k => {
      if (columns?.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row.fields[k] === null || row.fields[k] === undefined ? '' : row.fields[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
    this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }

  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }
}


