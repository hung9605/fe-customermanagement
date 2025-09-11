import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import Exam, { Inventory, Money } from './dashboard';

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
    optionsMoney: any;
    dataExam: any;
    dataMoney: any;
    dataInventory: any;
    optionsInventory: any;
    optionsExam: any;
    chartAccount: any;
    dataAccount: Number[] = [];
    optionsAccount: any;
    lstExam: Number[] = [];
    lstNotExam: Number[] = [];
    lstExamTotal: Number[] = [];
    lstMonthInventory: string[] = [];
    lstQuantityOutInventory: number[] = [];
    lstQuantityInInventory: number[] = [];
    lstmonthMoney: string[] = [];
    lstTotalMoney: number[] = [];
    constructor(private dashBoardService: DashboardService) {

    }

    ngOnInit(): void {
        this.getDataExam();
        this.getDataAccount();
        this.getDataInventory();
        this.getDataMoney();
    }

    viewchartAccount() {

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

    initChartExam() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.dataExam = {
            labels: this.generateMonthsUpToCurrent(),
            datasets: [
                {
                    type: 'bar',
                    label: 'Exam',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: this.lstExam
                },
                {
                    type: 'bar',
                    label: 'Not Exam',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-500'),
                    data: this.lstNotExam
                }
            ]
        };
        this.setOptionBar(textColor, textColorSecondary, surfaceBorder);
    }


    initChartInventory() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.dataInventory = {
            labels: this.lstMonthInventory,
            datasets: [
                {
                    type: 'bar',
                    label: 'In Stock',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: this.lstQuantityInInventory
                },
                {
                    type: 'bar',
                    label: 'Out Stock',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-500'),
                    data: this.lstQuantityOutInventory
                }
            ]
        };
        this.setOptionBarInventory(textColor, textColorSecondary, surfaceBorder);
    }

    initChartMoney() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        this.dataMoney = {
            labels: this.lstmonthMoney,
            datasets: [
                {
                    label: 'Money',
                    data: this.lstTotalMoney,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
      backgroundColor: 'rgba(59,130,246,0.2)',
      tension: 0.3,  // làm mượt line, nhưng không quá cong
      pointRadius: 4,
      pointBackgroundColor: '#3b82f6'
                }
            ]
        };
        this.setOptionMoney(textColor, textColorSecondary, surfaceBorder);
    }

    setOptionBar(textColor: string, textColorSecondary: string, surfaceBorder: string) {
        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        afterBody: (items: any) => {
                            if (!items.length) return;
                            const index = items[0].dataIndex;
                            const total = this.lstExamTotal[index] || 0;
                            return `Total: ${total}`;
                        }
                    }
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
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

    setOptionBarInventory(textColor: string, textColorSecondary: string, surfaceBorder: string) {
        this.optionsInventory = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
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

    setOptionMoney(textColor: string, textColorSecondary: string, surfaceBorder: string) {
        this.optionsMoney = {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.8,  
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            layout: {
                padding: {
                    right: 20  // tránh bị cắt ở tháng cuối
                }
            }
        };
    }


    getDataExam() {
        this.dashBoardService.getExam().subscribe({
            next: ({ data }) => {
                const dataApiExam: Exam[] = data;
                dataApiExam.forEach(element => {
                    this.lstExam.push(element.numberExam);
                    this.lstNotExam.push(element.numberNotExam);
                    this.lstExamTotal.push(element.total);
                });
                this.initChartExam();
            }
            , error: err => {
                console.log(err);
            }
        })
    }

    getDataAccount() {
        this.dashBoardService.getAccount().subscribe({
            next: ({ data }) => {
                this.dataAccount.push(data.total);
                this.dataAccount.push(data.numberActive);
                this.dataAccount.push(data.numberNotActive);
                this.viewchartAccount();
            }
            , error: err => {
                console.log(err);
            }
        })
    }

    getDataInventory() {
        this.dashBoardService.getInventory().subscribe({
            next: ({ data }) => {
                const dataApiInventory: Inventory[] = data;
                this.lstMonthInventory = [...new Set(dataApiInventory.map(item => item.month))];
                this.lstQuantityInInventory = this.lstMonthInventory.map(month => {
                    const itemRes = dataApiInventory.find(item => {
                        return item.month == month && item.status == 'in_stock'
                    })
                    return itemRes ? itemRes.quantity : 0;
                })
                this.lstQuantityOutInventory = this.lstMonthInventory.map(month => {
                    const item = dataApiInventory.find(item => {
                        return item.month == month && item.status == 'out_of_stock'
                    })
                    return item ? item.quantity : 0;
                })
                this.initChartInventory();
            }
            , error: err => {
                console.log(err);
            }
        })
    }

    getDataMoney() {
        this.dashBoardService.getMoney().subscribe({
            next: ({ data }) => {
                const dataApiMoney: Money[] = data;
                this.lstmonthMoney = [...new Set(dataApiMoney.map(item => item.month))];
                this.lstTotalMoney = this.lstmonthMoney.map(month => {
                    const itemRes = dataApiMoney.find(item => {
                        return item.month == month
                    })
                    return itemRes ? itemRes.totalMoney : 0;
                })
                this.initChartMoney();
            }
            , error: err => {
                console.log(err);
            }
        })
    }

    generateMonthsUpToCurrent(): string[] {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const now = new Date();
        const currentMonthIndex = now.getMonth(); // 0 = Jan, 11 = Dec
        return monthNames.slice(0, currentMonthIndex + 1);
    }



}