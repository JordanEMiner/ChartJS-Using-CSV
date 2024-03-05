import { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
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


//convert object to date
// const objectToDate = (obj) => {
//   console.log
//   return jsonString
// };


const LineChartBuilder = () => {
  //Initialize variable 'data' and function setData. Initial value of data=empty array
  const [data, setData] = useState({});
  //Acts as reference to the chart canvas. 
  const chartRef = useRef(null);
  //Ref will store the reference to current chart instance
  const chartInstanceRef = useRef(null);

  
  useEffect(() => {
    //Uses fetchData to retrieve data from file
    const fetchDataAndBuildChart = async () => {
       const parsedData = await fetchData(process.env.PUBLIC_URL + 'report4-Asset Collection per Primary Owner and System Admin.csv');
      //Updates 'data' state when data is retrieved
      setData(parsedData);
  //    console.log("Data in ChartBuilder: ", parsedData);
    };
    //function call
    fetchDataAndBuildChart();

  }, []);

  const formatDataForChart = () => {
    const labels = data.map(entry => entry.datePulled);
    const assessedData = data.map(entry => parseFloat(entry.assessed));
    const submittedData = data.map(entry => parseFloat(entry.submitted));
    const acceptedData = data.map(entry => parseFloat(entry.accepted));
    const rejectedData = data.map(entry => parseFloat(entry.rejected));

    return {
      labels: labels,
      datasets: [
        { label: 'Assessed', data: assessedData },
        { label: 'Submitted', data: submittedData },
        { label: 'Accepted', data: acceptedData },
        { label: 'Rejected', data: rejectedData }
      ]
    };
  };



  return (
    <div>
      {/* Uncomment the next line if you want to visualize the parsed data */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      
      {/* Render the Bar chart */}
      <canvas ref={chartRef} />
      <Line data={formatDataForChart()} />
    </div>
  );

  // return (
  //   <div>
  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //     <canvas key={chartKey} ref={chartRef} style={{ width: '400px', height: '200px' }} />
  //   </div>
  // );



};

export default LineChartBuilder;
