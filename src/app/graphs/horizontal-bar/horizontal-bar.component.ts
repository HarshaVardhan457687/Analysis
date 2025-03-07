import { Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { provideAnimations } from '@angular/platform-browser/animations';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-horizontal-bar',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  providers: [provideAnimations()],
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.css']
})
export class HorizontalBarComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  // Team data
  team1Data = [
    { name: 'John Smith', value: 87 },
    { name: 'Emily Davis', value: 92 },
    { name: 'Michael Chen', value: 78 },
    { name: 'Sarah Johnson', value: 95 },
    { name: 'David Kim', value: 83 },
    { name: 'Lisa Wang', value: 76 },
    { name: 'Robert Jones', value: 89 },
  ];

  team2Data = [
    { name: 'Alex Rodriguez', value: 82 },
    { name: 'Olivia Martinez', value: 88 },
    { name: 'William Taylor', value: 74 },
    { name: 'Sophia Brown', value: 93 },
    { name: 'James Wilson', value: 79 },
    { name: 'Emma Clark', value: 85 },
  ];

  team3Data = [
    { name: 'Ava Thompson', value: 84 },
    { name: 'Daniel Harris', value: 77 },
    { name: 'Mia Lewis', value: 96 },
    { name: 'Ethan Walker', value: 81 },
    { name: 'Isabella Moore', value: 88 },
    { name: 'Matthew Allen', value: 72 },
    { name: 'Charlotte Young', value: 91 },
  ];

  // Currently displayed data
  displayedTeamData = this.team1Data;
  currentTeam = 'team1';

  // Chart dimensions
  view: [number, number] = [600, 200];
  
  // Chart options
  gradient = false;
  showLegend = false;
  showLabels = true;
  isDoughnut = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  showXAxis = false; // We'll show a custom x-axis outside the scroll area
  showYAxis = true;
  showXAxisLabel = false; // We'll show a custom x-axis label outside the scroll area
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
  xScaleMax = 100; // Fixed maximum scale
  xScaleMin = 0;   // Fixed minimum scale

  defaultColors: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2196F3']
  };

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.addEventListener('resize', () => this.adjustChartSize());
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => this.adjustChartSize(), 0);
    }
  }

  adjustChartSize(): void {
    if (this.isBrowser && this.chartContainer) {
      const element = this.chartContainer.nativeElement;
      
      // Get the width from the chart-content-area
      const width = element.clientWidth;
      
      // Calculate the height based on the number of team members
      const barHeight = 35; // Height per bar
      const totalContentHeight = (this.displayedTeamData.length * barHeight);
      
      // Set the view dimensions
      this.view = [width, totalContentHeight];
    }
  }

  onTeamChange(event: any): void {
    const teamSelected = event.target.value;
    this.currentTeam = teamSelected;
    
    switch(teamSelected) {
      case 'team1':
        this.displayedTeamData = this.team1Data;
        break;
      case 'team2':
        this.displayedTeamData = this.team2Data;
        break;
      case 'team3':
        this.displayedTeamData = this.team3Data;
        break;
      default:
        this.displayedTeamData = this.team1Data;
    }
    
    if (this.isBrowser) {
      setTimeout(() => this.adjustChartSize(), 0);
    }
  }

  onSelect(data: any): void {
    console.log('Team member selected:', JSON.parse(JSON.stringify(data)));
  }
}