export function setOptionBar(textColor: string, textColorSecondary: string, surfaceBorder: string) {
    const options = {
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

    return options;

}

export function getChartColors() {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        documentStyle,
        textColor: documentStyle.getPropertyValue('--text-color'),
        textColorSecondary: documentStyle.getPropertyValue('--text-color-secondary'),
        surfaceBorder: documentStyle.getPropertyValue('--surface-border')
    };
}

export function setOptionBarVertical(textColor: string, textColorSecondary: string, surfaceBorder: string) {
   const options = {
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
        

    return options;

}
