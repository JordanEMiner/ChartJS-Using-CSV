import { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart} from 'chart.js/auto';
import { fetchData } from './DataExtractor';
import Papa from 'papaparse';


const ChartBuilder = () => {
  //Returns the data and function to set the data
  const [data, setData] = useState([]);
  //Creates a ref that will be used to reference the canvas element where chart will be rendered
  const chartRef = useRef(null);
  //Ref will store the reference to current chart instance
  const chartInstanceRef = useRef(null);
  const [dataFetched, setDataFetched] = useState(false);

  //This useEffect runs once component mounts
  useEffect(() => {
    //Uses fetchData to retrieve data from file
    const fetchDataAndBuildChart = async () => {
      const parsedData = await fetchData(process.env.PUBLIC_URL + 'report4-Asset Collection per Primary Owner and System Admin.csv');
      //Updates 'data' state when data is retrieved
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
        //coutMap = (codeNum: count of code)
        const countMap = getCountMap(data);
        
        //labels = code#, values = count per code
        const columnLabels = Object.keys(countMap);
        const columnValues = Object.values(countMap);

        //Configure chart data
        const chartData = {
          labels: columnLabels,
          datasets: [
            {
              label: 'code',
              data: columnValues,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };
        console.log(columnValues)

        const chartOptions = {
          scales: {
            x: {
              type: 'category', // Use 'category' scale for labels
              labels: columnLabels,
            },
            y: {
              type: 'logarithmic', // Use 'linear' scale for values
              beginAtZero: true,
              values: columnValues,
            },
          },
        };

        //If previous chart exists, destory it
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        //New bar chart instance created
        const newChartInstance = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: chartOptions,
        });
        
        chartInstanceRef.current = newChartInstance;
      }
    }
  }, [data]);


  //coutMap = (code# -> count of code#)
  const getCountMap = (data) => {
    return data.reduce((countMap, row) => {
      //Every time code# appears, increment count
      countMap[row.code] = (countMap[row.code] || 0) + 1;
      return countMap;
    }, {});
  };

  // // Printing keys and values of countMap
  // const countMap = getCountMap(data);
  // console.log("Count Map:");
  // Object.entries(countMap).forEach(([key, value]) => {
  //   console.log(`Code: ${key}, Count: ${value}`);
  // });

  

  return (
    <div>
      <canvas ref={chartRef} id="myChart" width="600" height="600" />
    </div>
  );
};
export default ChartBuilder;




// const ChartBuilder = () => {
//   //Initialize variable 'data' and function setData. Initial value of data=empty array
//   const [data, setData] = useState([]);

//   //Initializes function 'setChartKey' and sets chartKey=0
//   //chartKey's state is used as a key for "Bar" component. So when chartKey changes, the "Bar" component is re-rendered. 
//   const [chartKey, setChartKey] = useState(0);
  
//   //chartRef can be used to persist values across renders without causing re-renders when the value changes.  Acts as reference to the chart canvas. 
//   const chartRef = useRef(null);
  
//   useEffect(() => {
//     //fetchDataAndBuildChart asynchronously fetches data from the specified csv file
//     const fetchDataAndBuildChart = async () => {
//       const parsedData = await fetchData(process.env.PUBLIC_URL + 'STIG_OSS_ExportData.csv');
//       //Update component's state with the parsed data. 
//       setData(parsedData);
//     };

//     fetchDataAndBuildChart();
//   }, []);

//   //useEffect is dependent on the 'data' state, so it will run whenever the 'data' state changes
//   useEffect(() => {
//     if (data.length > 0) {
//       //chartRef.current references the chart canvas 
//       //ctx = rendering context of the chart canvas
//       const ctx = chartRef.current?.getContext('2d');
      
//       //if render context is successfully obtained, the chart is ready to be updated
//       if (ctx) {
//         //setChartKey is used to update the state based on previous state, ensuring that it is correctly updated
//         //increment the chartKey state to trigger a re-render
//         setChartKey((prevKey) => prevKey + 1);
//       }
//     }
//     //data = array of objects; each object = row 
//   }, [data]);
  
//   /*In this case, we are using "Code" as the column. The labels will be the names of the codes themselves, and the values will be the count of the code values in the dataset. */
//   //Extract the value in "Code" from each row
//   const codeValues = data.map((row) => row.Code);

//   //Keep track of the number of times a code appears
//   //Iterate over array of "Code" values
//   const codeCounter = codeValues.reduce((countMap, code) => {
//     //Increments count for current "Code"
//     countMap[code] = (countMap[code] || 0) + 1;
//     //countMap {code#: countOfCode}
//     return countMap;
//   }, {});

//   //Use the key (the code num) for the labels
//   const columnLabels = Object.keys(codeCounter);
//   //Set the values as the count of each code
//   const columnValues = Object.values(codeCounter);


//   //Configure chart
//   const chartData = {
//     label: "Code",
//     labels: columnLabels,
//     datasets: [
//       {
        
//         label: "Code", 
//         data: columnValues,
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       }
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         type: 'category', // Use 'category' scale for labels
//         labels: columnLabels,
//       },
//       y: {
//         type: 'linear', // Use 'linear' scale for values
//         beginAtZero: true,
//       },
//     },
//   };

  
//   return (
//     <div>

//       {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
   
//       <Bar key={chartKey} ref={chartRef} data={chartData} options = {chartOptions} />
  
//     </div>
//   );

//   // return (
//   //   <div>
//   //     <pre>{JSON.stringify(data, null, 2)}</pre>
//   //     <canvas key={chartKey} ref={chartRef} style={{ width: '400px', height: '200px' }} />
//   //   </div>
//   // );
// };
// export default ChartBuilder;

