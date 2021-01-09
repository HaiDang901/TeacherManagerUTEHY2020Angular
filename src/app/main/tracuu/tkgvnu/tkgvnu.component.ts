import { Component, OnInit } from '@angular/core';
import {ChartModule} from 'primeng/chart';
// import { CanvasJS} from '../../../../assets/      canvasjs.min';
// import * as CanvasJS from '../../../../assets/';
var CanvasJS = require('../../../../assets/canvasjs.min');

@Component({
  selector: 'app-tkgvnu',
  templateUrl: './tkgvnu.component.html',
  styleUrls: ['./tkgvnu.component.css']
})
export class TkgvnuComponent implements OnInit {
  public data: any;

options: any;

  constructor() {
    this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]
      };
  }

  ngOnInit(): void {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Thống kê Số Lượng Nhân Sự "
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 20, label: "Ngoại Ngữ" },
          { y: 15, label: "Công Nghệ May" },
          { y: 15, label: "Kinh Tế" },
          { y: 30, label: "Công Nghệ Thông Tin" },
          { y: 10, label: "Luật" },
        ]
      }]
    });

    chart.render();

  }

}
