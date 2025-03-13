import { Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApiService } from '../../Services/api.service';
import { NgxChartsModule, Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';

interface ChartData {
  name: string;
  value: number;
}

interface Team {
  id: number;
  name: string;
}

@Component({
  selector: 'app-horizontal-bar',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, HttpClientModule],
  providers: [provideAnimations(), ApiService],
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.css']
})
export class HorizontalBarComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  // Currently displayed data
  displayedTeamData: ChartData[] = [];
  teams: Team[] = [];
  currentTeam = 1; // Default team ID
  currentProject = 1; // Default project ID

  // Chart dimensions
  view: [number, number] = [600, 200];
  
  // Chart options
  gradient = false;
  showLegend = false;
  showLabels = true;
  isDoughnut = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  showXAxis = false;
  showYAxis = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  xAxisLabel = '';
  yAxisLabel = '';
  timeline = false;
  
  // Specific options for the chart
  showRefLines = false;
  showRefLabels = false;
  roundDomains = true;
  tooltipDisabled = false;
  animations = true;
  xScaleMax = 100;
  xScaleMin = 0;

  defaultColors: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2196F3']
  };

  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApiService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.addEventListener('resize', () => this.adjustChartSize());
      this.loadTeams();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => this.adjustChartSize(), 0);
    }
  }

  loadTeams(): void {
    this.apiService.getTeams(this.currentProject).subscribe(teams => {
      this.teams = teams;
      if (teams.length > 0) {
        this.currentTeam = teams[0].id;
        this.loadTeamMembersProgress();
      }
    });
  }

  loadTeamMembersProgress(): void {
    this.apiService.getTeamMembersProgress(this.currentTeam, this.currentProject)
      .subscribe(members => {
        this.displayedTeamData = members.map(member => ({
          name: member.userName,
          value: member.progress
        }));
        this.adjustChartSize();
      });
  }

  adjustChartSize(): void {
    if (this.isBrowser && this.chartContainer) {
      const element = this.chartContainer.nativeElement;
      const width = element.clientWidth;
      const barHeight = 35;
      const totalContentHeight = (this.displayedTeamData.length * barHeight);
      this.view = [width, totalContentHeight];
    }
  }

  onTeamChange(event: any): void {
    const teamId = parseInt(event.target.value);
    this.currentTeam = teamId;
    this.loadTeamMembersProgress();
  }

  onSelect(data: any): void {
    console.log('Team member selected:', JSON.parse(JSON.stringify(data)));
  }
}