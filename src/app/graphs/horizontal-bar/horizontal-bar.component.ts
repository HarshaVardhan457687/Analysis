import { Component } from '@angular/core';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-horizontal-bar',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.css'] // Fixed styleUrls array
})
export class HorizontalBarComponent {

  horizontalBarData = [
    { name: 'Project A', value: 30 },
    { name: 'Project B', value: 60 },
    { name: 'Project C', value: 100 },
  ];

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
  xAxisLabel = 'Month';
  yAxisLabel = 'Value';
  timeline = false;
  
  // Specific options for the chart
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

  yAxisTickFormatting = (val: any) => `${val}`; // Fixed template string issue
}
