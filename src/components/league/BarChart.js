import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const BarChart = ({data}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
  );
  
  const options = { 
    responsive: true,
    maintainAspectRatio: false,
    scales:{
      xAxes: [ 
        {
          // bar 너비 조정
          categoryPercentage: 0.8,
          maxBarThickness: 20,
          ticks: {
            fontColor: '#ffffff',
            fontSize: 13,
          },
          gridLines: {
           display: false,
          },
        },
      ],
    },
  }

  return (
    <Bar options={options} data={data}/>
  )
};

export default BarChart;
