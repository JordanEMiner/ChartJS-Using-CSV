import { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

import { fetchData } from './DataExtractor';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';


Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineChartBuilder = () => {
  //Initialize variable 'data' and function setData. Initial value of data=empty array
  const [data, setData] = useState({});
  //Acts as reference to the chart canvas. 
  const chartRef = useRef(null);
  //Ref will store the reference to current chart instance
  const chartInstanceRef = useRef(null);
  const [dataFetched, setDataFetched] = useState(false);
  
  //This useEffect runs once component mounts
  useEffect(() => {
    //Uses fetchData to retrieve data from file
    const fetchDataAndBuildChart = async () => {
      const parsedData = await fetchData(process.env.PUBLIC_URL + 'report4-Asset Collection per Primary Owner and System Admin.csv');
 //     const parsedData = await fetchData(process.env.PUBLIC_URL + 'STIG_OSS_ExportData.csv');

      //console.log("parsedData type: ", typeof response);
      setData(parsedData);
      setDataFetched(true);
      console.log("Data in ChartBuilder: ", parsedData);
    };
    //function call
    fetchDataAndBuildChart();
  }, [dataFetched]);



  //Create chart
  useEffect(() => {
    //Check for available data
    if (data.length > 0) {
      //Get canvas context
      const ctx = chartRef.current?.getContext('2d');
      if (ctx) {
        
        //extract labels for chart
        const labels = data.map(entry => entry.dataPulled);
        const assessedData = data.map(entry => entry.assessed);
        const submittedData = data.map(entry => entry.submitted);
        const acceptedData = data.map(entry => entry.accepted);
        const rejectedData = data.map(entry => entry.rejected);

        
        //Configure chart data
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Assessed',
              data: assessedData,
              borderColor: 'red', 
              backgroundColor: 'red', 
              borderWidth: 1,
            },
            {
              label: 'Submitted',
              data: submittedData,
              borderColor: 'blue', 
              backgroundColor: 'blue',
              borderWidth: 1,
            },
            {
              label: 'Accepted',
              data: acceptedData,
              borderColor: 'green', 
              backgroundColor: 'green', 
              borderWidth: 1,
            },
            {
              label: 'Rejected',
              data: rejectedData,
              borderColor: 'orange', 
              backgroundColor: 'orange', 
              borderWidth: 1,
            },
          ],
        };

        const chartOptions = {
          scales: {
            x: {
              type: 'time', // Use 'category' scale for labels
              time: {
                displayFormats: {day: 'MM/DD/YYYY'}
              },
            },
          },
        };

        //If previous chart exists, destory it
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        //New bar chart instance created
        const newChartInstance = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: chartOptions,
        });
        
        chartInstanceRef.current = newChartInstance;
      }
    }
  }, [data]);

  return (
    <div>
      {/* Uncomment the next line if you want to visualize the parsed data */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      
      {/* Render the Bar chart */}
      <h2>From Power BI</h2>
      <canvas ref={chartRef} />
   
    </div>
  );

};

export default LineChartBuilder;









