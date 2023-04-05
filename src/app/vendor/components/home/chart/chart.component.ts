import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { iEvent } from 'src/app/vendor/models/event.model';
import { ChartOptions, ChartType, ChartDataset, Chart } from 'chart.js';
import { VendorService } from '../../../services/vendor.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit,OnInit {
    labels! : string[]
    
   
  @Input() event!:iEvent[];
  chart1!: Chart<"line", string[], string>;
  chart2!: Chart<"line", string[], string>;
  collection!: string[];
  sold!: string[];
  constructor(private _vendorService: VendorService){}
  ngOnInit(): void {
    this.graphValues();
      
  }
  ngAfterViewInit(){
  }
  graphValues(){
    this._vendorService.graphValues().subscribe((res) => {
      this.labels = res.eventNames
      this.collection = res.eventCollection;
      this.sold = res.eventSold
        console.log(res);
        this.createChart();
    })
  }
  createChart(){
  
    this.chart1 = new Chart("collectionChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.labels, 
	       datasets: [
          {
            label: "Collection",
            data: this.collection,
            backgroundColor: 'blue'
          },
          
        ]
      },
      options: {
        aspectRatio:0.9
      }
      
    });
    this.chart2 = new Chart("soldChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.labels, 
	       datasets: [
          {
            label: "sold",
            data: this.sold,
            backgroundColor: 'blue'
          },
          
        ]
      },
      options: {
        aspectRatio:1
      }
      
    });
  }

  
  
}
