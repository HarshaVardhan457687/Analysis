// performance.component.ts
import { Component } from '@angular/core';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Color, ScaleType } from '@swimlane/ngx-charts';

interface TeamMetric {
  name: string;
  value: number;
}

interface TeamData {
  name: string;
  series: TeamMetric[];
}

type TeamDataMap = {
  [key in 'Team 1' | 'Team 2' | 'Team 3']: TeamData[];
}

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, FormsModule],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent {
  teams = ['Team 1', 'Team 2', 'Team 3'] as const;
  selectedTeam: 'Team 1' | 'Team 2' | 'Team 3' = 'Team 1';

  teamData: TeamDataMap = {
    'Team 1': [
      {
        name: 'Performance Metrics',
        series: [
          { name: 'Aryan', value: 20 },
          { name: 'Chaithu', value: 35 },
          { name: 'Harsha', value: 60 },
          { name: 'Aseer', value: 81 },
          { name: 'Karthik', value: 60 },
          { name: 'Varshi', value: 55 }
        ]
      }
    ],
    'Team 2': [
      {
        name: 'Performance Metrics',
        series: [
          { name: 'Sarah', value: 45 },
          { name: 'John', value: 65 },
          { name: 'Mike', value: 40 },
          { name: 'Lisa', value: 75 },
          { name: 'David', value: 58 },
          { name: 'Emma', value: 70 }
        ]
      }
    ],
    'Team 3': [
      {
        name: 'Performance Metrics',
        series: [
          { name: 'Alex', value: 50 },
          { name: 'Maria', value: 72 },
          { name: 'James', value: 63 },
          { name: 'Nina', value: 45 },
          { name: 'Chris', value: 68 },
          { name: 'Sophie', value: 55 }
        ]
      }
    ]
  };

  currentTeamData = this.teamData['Team 1'];

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
  xAxisLabel = 'Team Members';
  yAxisLabel = 'Value';
  timeline = false;

  // Specific options for line chart
  showRefLines = true;
  showRefLabels = true;
  roundDomains = true;
  tooltipDisabled = false;
  animations = true;

  defaultColors: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2196F3']
  };

  onTeamChange(): void {
    this.currentTeamData = this.teamData[this.selectedTeam];
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  yAxisTickFormatting = (val: any) => `${val}`;
}