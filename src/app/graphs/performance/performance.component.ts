// performance.component.ts
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Color, ScaleType } from '@swimlane/ngx-charts';

interface MonthlyTask {
  name: string; // Month name
  value: number; // Tasks
}

interface TeamData {
  name: string;
  series: MonthlyTask[];
}

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, FormsModule],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent implements OnInit {
  // All months data for Team 1 only
  allMonthsData = [
    {
      name: 'Tasks',
      series: [
        { name: 'January', value: 20 },
        { name: 'February', value: 35 },
        { name: 'March', value: 60 },
        { name: 'April', value: 81 },
        { name: 'May', value: 60 },
        { name: 'June', value: 55 },
        { name: 'July', value: 45 },
        { name: 'August', value: 70 },
        { name: 'September', value: 63 },
        { name: 'October', value: 58 },
        { name: 'November', value: 72 },
        { name: 'December', value: 65 }
      ]
    }
  ];

  currentTeamData: TeamData[] = [];
  
  // Chart options
  view: [number, number] = [500, 180];
  gradient = false;
  showLegend = false;
  showLabels = true;
  isDoughnut = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = '';
  yAxisLabel = 'Tasks';
  timeline = false;

  // Specific options for line chart
  showRefLines = true;
  showRefLabels = true;
  roundDomains = true;
  tooltipDisabled = false;
  animations = true;
  
  // Control how many months to show 
  currentStartIndex = 0;
  monthsToShow = 6;
  
  defaultColors: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2196F3']
  };

  ngOnInit(): void {
    this.updateVisibleData();
  }

  updateVisibleData(): void {
    // Create filtered version of data with only visible months
    const visibleSeries = this.allMonthsData[0].series
      .slice(this.currentStartIndex, this.currentStartIndex + this.monthsToShow);
    
    this.currentTeamData = [
      {
        name: 'Tasks',
        series: visibleSeries
      }
    ];
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  yAxisTickFormatting = (val: any) => `${val}`;
  
  scrollRight(): void {
    if (this.currentStartIndex + this.monthsToShow < 12) {
      this.currentStartIndex++;
      this.updateVisibleData();
    }
  }
  
  scrollLeft(): void {
    if (this.currentStartIndex > 0) {
      this.currentStartIndex--;
      this.updateVisibleData();
    }
  }

  get canScrollLeft(): boolean {
    return this.currentStartIndex > 0;
  }

  get canScrollRight(): boolean {
    return this.currentStartIndex + this.monthsToShow < 12;
  }
}