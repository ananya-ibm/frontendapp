/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useMapChartDataUtils } from '@exo/frontend-features-work-management-logging-logic';
import { Button } from '@exo/frontend-components-base';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  plugins: {
    title: {
      display: true,
      text: 'User Logins per Week'
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
};

export const BarChart = ({loginData}) => {
  const {getDatesForLoadedWeeks, mapDataForChart} = useMapChartDataUtils();
  
  const initialNumberOfWeeks = 2;
  const initialData = {
    labels: getDatesForLoadedWeeks(loginData, initialNumberOfWeeks),
    datasets: mapDataForChart(loginData, loginData.length)
  };
  const [data, setData] = useState<typeof initialData>(initialData);
  const [loadedWeeksNumber, setLoadedWeeksNumber] = useState<number>(2);

  const chartRef = useRef<any>();

  const loadPrevWeek = () => {
    if (chartRef.current && chartRef.current.data && chartRef.current.data.labels) {
      const newLoadedWeeksNumber = loadedWeeksNumber + 1;
      if(newLoadedWeeksNumber > loginData.length) return;

      const newLabels = getDatesForLoadedWeeks(loginData, newLoadedWeeksNumber);
      chartRef.current.data.labels = newLabels;
      setLoadedWeeksNumber(newLoadedWeeksNumber);
      setData(chartRef.current.data);
    }
  };

  return (
    <div>
      <Bar options={options} updateMode={'active'} ref={chartRef} data={data} />
      <Button label={"Load Previous Week"} onClick={loadPrevWeek} />
    </div>
  );
}
