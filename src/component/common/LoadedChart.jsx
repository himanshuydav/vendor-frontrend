import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LoadedChart = (props) => {
  const series = [
    {
      name: '',
      data: [200, 330, 548],
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: '80%',
        isFunnel: true,
      },
    },
    colors: [
      '#F44F5E',
      '#E55A89',
      '#D863B1',
      '#CA6CD8',
      '#B57BED',
      '#8D95EB',
      '#62ACEA',
      '#4BC3E6',
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ' :  ' + val;
      },
      dropShadow: {
        enabled: true,
      },
    },
    title: {
      text: 'Pyramid Contract Chart',
      align: 'middle',
    },
    xaxis: {
      categories: ['Approved', 'Admin Manager Pending', 'Vp Pending'],
    },
    legend: {
      show: false,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={340} />
    </div>
  );
}

export default LoadedChart;