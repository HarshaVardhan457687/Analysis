// performance.component.ts
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Color, ScaleType } from '@swimlane/ngx-charts';

interface MonthlyTask {
  name: string;
  value: number;
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
  allMonthsData = [
    {
      name: 'Tasks',
      series: [
        { name: 'Jan', value: 20 },
        { name: 'Feb', value: 35 },
        { name: 'Mar', value: 60 },
        { name: 'Apr', value: 81 },
        { name: 'May', value: 60 },
        { name: 'Jun', value: 55 },
        { name: 'Jul', value: 48 },
        { name: 'Aug', value: 70 },
        { name: 'Sep', value: 63 },
        { name: 'Oct', value: 58 },
        { name: 'Nov', value: 72 },
        { name: 'Dec', value: 65 }
      ]
    }
  ];

  currentTeamData: TeamData[] = [];
  
  view: [number, number] = [500, 200];
  gradient = false;
  showLegend = false;
  showLabels = true;
  isDoughnut = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = '';
  yAxisLabel = 'Tasks';
  timeline = false;

  showRefLines = true;
  showRefLabels = true;
  roundDomains = true;
  tooltipDisabled = false;
  animations = true;
  
  currentStartIndex = 0;
  monthsToShow = 6;
  
  defaultColors: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2196F3']
  };

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(): void {
    this.currentTeamData = [{
      name: 'Tasks',
      series: this.allMonthsData[0].series.slice(0, this.monthsToShow)
    }];
  }

  updateVisibleData(): void {
    const visibleSeries = this.allMonthsData[0].series
      .slice(this.currentStartIndex, this.currentStartIndex + this.monthsToShow);
    
    this.currentTeamData = [{
      name: 'Tasks',
      series: visibleSeries
    }];
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  yAxisTickFormatting = (val: number): string => `${val}`;
  
  scrollRight(): void {
    const maxStartIndex = this.allMonthsData[0].series.length - this.monthsToShow;
    if (this.currentStartIndex < maxStartIndex) {
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
    const maxStartIndex = this.allMonthsData[0].series.length - this.monthsToShow;
    return this.currentStartIndex < maxStartIndex;
  }
}