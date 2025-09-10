import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import Exam from './dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  data: any;
  options: any;
  data1: any;
  options1: any;
  dataExam: Number[] = [];
  optionsExam: any;
  chartAccount: any;
  dataAccount: Number[] = [];
  optionsAccount: any;

  constructor(private dashBoardService: DashboardService){

  }

  ngOnInit(): void {

    this.getDataExam();
    this.getDataAccount();

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }

            }
        };


    
    
  }

  viewchartExam(){
    
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data1 = {
            labels: ['Total', 'Number Exam', 'Number Not Exam'],
            datasets: [
                {
                    data: this.dataExam,
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500')
                        , documentStyle.getPropertyValue('--yellow-500')
                        , documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400')
                        , documentStyle.getPropertyValue('--yellow-400')
                        , documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.options1 = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
  }

  viewchartAccount(){
    
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.chartAccount = {
            labels: ['Total', 'Account Active', 'Account Not Active'],
            datasets: [
                {
                    data: this.dataAccount,
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500')
                        , documentStyle.getPropertyValue('--yellow-500')
                        , documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400')
                        , documentStyle.getPropertyValue('--yellow-400')
                        , documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.options1 = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
  }


  getDataExam(){
    this.dashBoardService.getExam().subscribe({
        next: ({data}) => {
            console.log(this.data);
            
            this.dataExam.push(data.total);
            this.dataExam.push(data.numberExam);
            this.dataExam.push(data.numberNotExam);
            console.log(this.dataExam);
            
            this.viewchartExam();
        }
        ,error: err => {
            console.log(err);
            
        }
    })
  }

    getDataAccount(){
    this.dashBoardService.getAccount().subscribe({
        next: ({data}) => {  
            console.log(data);
                   
            this.dataAccount.push(data.total);
            this.dataAccount.push(data.numberActive);
            this.dataAccount.push(data.numberNotActive);   
            this.viewchartAccount();
        }
        ,error: err => {
            console.log(err);
            
        }
    })
  }




}