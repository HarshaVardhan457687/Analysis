import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
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
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent implements OnInit {
  // Fixed data array
  allMonthsData: TeamData[] = [{
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
  }];

  currentTeamData: TeamData[] = [];
  
  view: [number, number] = [500, 300]; // Increased height for better visibility
  gradient = false;
  showLegend = true;
  showLabels = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Month';
  yAxisLabel = 'Tasks';
  
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
    this.updateVisibleData();
  }

  updateVisibleData(): void {
    const endIndex = this.currentStartIndex + this.monthsToShow;
    const visibleSeries = this.allMonthsData[0].series
      .slice(this.currentStartIndex, endIndex);

    this.currentTeamData = [{
      name: 'Tasks',
      series: visibleSeries
    }];
  }

  scrollRight(): void {
    if (this.canScrollRight) {
      this.currentStartIndex++;
      this.updateVisibleData();
    }
  }
  
  scrollLeft(): void {
    if (this.canScrollLeft) {
      this.currentStartIndex--;
      this.updateVisibleData();
    }
  }

  get canScrollLeft(): boolean {
    return this.currentStartIndex > 0;
  }

  get canScrollRight(): boolean {
    return this.currentStartIndex < (this.allMonthsData[0].series.length - this.monthsToShow);
  }

  yAxisTickFormatting = (val: number): string => `${val}`;
} 