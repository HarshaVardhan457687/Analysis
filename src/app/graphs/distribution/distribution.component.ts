import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Component } from '@angular/core';

@Component({
  selector: 'app-distribution',
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './distribution.component.html',
  styleUrl: './distribution.component.css',
  standalone: true
})
export class DistributionComponent {
  showDropdown = false;
  selectedKey: string = 'main';

  // Main data for pie chart
  pieChartData = [
    { name: 'On Track', value: 45 },
    { name: 'At Risk', value: 30 },
    { name: 'Completed', value: 25 }
  ];

  // Key Results data
  keyResults = [
    {
      id: 'kr1',
      name: 'Increase Revenue by 30%',
      data: [
        { name: 'On Track', value: 60 },
        { name: 'At Risk', value: 25 },
        { name: 'Completed', value: 15 }
      ]
    },
    {
      id: 'kr2',
      name: 'Launch 5 New Products',
      data: [
        { name: 'On Track', value: 40 },
        { name: 'At Risk', value: 35 },
        { name: 'Completed', value: 25 }
      ]
    },
    {
      id: 'kr3',
      name: 'Expand to 3 New Markets',
      data: [
        { name: 'On Track', value: 30 },
        { name: 'At Risk', value: 45 },
        { name: 'Completed', value: 25 }
      ]
    }
  ];

  view: [number, number] = [500, 200];
  gradient = false;
  showLegend = false;
  showLabels = false;
  isDoughnut = true;
  
  pieChartColors: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#32CD32', '#FFD700', '#2196F3']
  };

  getColor(name: string): string {
    switch (name) {
      case 'On Track':
        return '#32CD32';
      case 'At Risk':
        return '#FFD700';
      case 'Completed':
        return '#2196F3';
      default:
        return '#000000';
    }
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectKeyResult(keyId: string): void {
    this.selectedKey = keyId;
    if (keyId === 'main') {
      this.pieChartData = [
        { name: 'On Track', value: 45 },
        { name: 'At Risk', value: 30 },
        { name: 'Completed', value: 25 }
      ];
    } else {
      const selectedKR = this.keyResults.find(kr => kr.id === keyId);
      if (selectedKR) {
        this.pieChartData = selectedKR.data;
      }
    }
    this.showDropdown = false;
  }

  getSelectedKeyResultName(): string {
    if (this.selectedKey === 'main') {
      return 'Objective Progress';
    }
    const selectedKR = this.keyResults.find(kr => kr.id === this.selectedKey);
    return selectedKR ? selectedKR.name : 'Objective Progress';
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}

