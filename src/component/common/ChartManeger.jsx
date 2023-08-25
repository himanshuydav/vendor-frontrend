import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartManeger = () => {
  const series = [50, 30,10];
  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              return 8;
            },
          },
        },
      },
    },
    labels: ['Admin Manager Pending ','VP Pending ', 'Approved'],
  };
 // Adjust the label width
  options.plotOptions.radialBar.dataLabels.labelWidth = 200;
  return (
    <div id="chart ">
      <ReactApexChart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default ChartManeger;
