import { Component } from '@angular/core';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-performance',
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent {

  lineChartData = [
    {
      name: 'Performance Metrics',
      series: [
        { name: 'Aryan', value: 20 },
        { name: 'Chaithu', value: 35 },
        { name: 'Harsha', value: 60 },
        { name: 'Aseer', value: 81 },
        { name: 'Karthik', value: 60},
        { name: 'varshi', value: 55  }
      ]
    }
  ];
  
  // Chart options
  view: [number, number] = [500, 180];
  gradient = false;
  showLegend = true;
  showLabels = true;
  isDoughnut = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Team Members';
  yAxisLabel = 'Value';
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
