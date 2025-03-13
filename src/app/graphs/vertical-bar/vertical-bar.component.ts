import { Component, OnInit } from '@angular/core';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ApiService } from '../../Services/api.service';
import { HttpClientModule } from '@angular/common/http';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-vertical-bar',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './vertical-bar.component.html',
  styleUrl: './vertical-bar.component.css'
})
export class VerticalBarComponent implements OnInit {
  barChartData = [
    {
      name: 'Team Progress',
      series: [] as ChartData[]
    }
  ];

  currentProject = 1; // Default project ID
 
  // Chart options - reduced dimensions
  view: [number, number] = [700, 180];
 
  // Set initial visible data
  visibleData = this.barChartData[0].series;
  gradient = false;
  showLegend = true;
  showLabels = true;
  isDoughnut = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  xAxisLabel = '';
  yAxisLabel = '';
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
 
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Load team progress for teams 1-10
    this.loadTeamsProgress();
  }

  loadTeamsProgress(): void {
    this.apiService.getTeams(this.currentProject).subscribe(teams => {
      if (teams.length > 0) {
        const progressPromises = teams.map(team => 
          this.apiService.getTeamProgress(this.currentProject, team.id).toPromise()
        );

        Promise.all(progressPromises)
          .then(results => {
            this.barChartData[0].series = teams.map((team, index) => ({
              name: team.name,
              value: results[index] ? results[index].progress : 0
            }));
            this.visibleData = this.barChartData[0].series;
          })
          .catch(error => {
            console.error('Error loading team progress:', error);
          });
      }
    });
  }
 
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
 
  yAxisTickFormatting = (val: any) => `${val}%`;
}