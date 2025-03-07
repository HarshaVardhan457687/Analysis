import { Component } from '@angular/core';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { Color, ScaleType } from '@swimlane/ngx-charts';
 
@Component({
  selector: 'app-vertical-bar',
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './vertical-bar.component.html',
  styleUrl: './vertical-bar.component.css'
})
export class VerticalBarComponent {
  barChartData = [
    {
      name: 'Monthly Revenue',
      series: [
        { name: 'A1', value: 65 },
        { name: 'A2', value: 59 },
        { name: 'A3', value: 80 },
        { name: 'A4', value: 81 },
        { name: 'A5', value: 75 },
        { name: 'A6', value: 70 },
        { name: 'A7', value: 85 },
        { name: 'A8', value: 63 },
        { name: 'A9', value: 77 },
        { name: 'A10', value: 10 }
      ]
    }
  ];
 
  // Chart options - reduced dimensions
  view: [number, number] = [700, 180];
 
  // Set initial visible data to show all 10 teams
  visibleData = this.barChartData[0].series;
  gradient = false;
  showLegend = true;
  showLabels = true;
  isDoughnut = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = false;  // Hide built-in X-axis label
  showYAxisLabel = false;  // Hide built-in Y-axis label
  xAxisLabel = '';  // Empty X-axis label
  yAxisLabel = '';  // Empty Y-axis label
  timeline = false;
  
  // Specific options for line chart
  showRefLines = true;
  showRefLabels = true;
  roundDomains = true;
  tooltipDisabled = false;
  animations = true;
 
  // Different color schemes for different charts
  pieChartColors: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF1493', '#32CD32', '#FFD700', '#00CED1']
  };
 
  defaultColors: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2196F3']
  };
 
  constructor() {}
 
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
 
  yAxisTickFormatting = (val: any) => `${val}`;
}