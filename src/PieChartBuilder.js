import { useEffect, useState, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchData } from './DataExtractor';


const ChartBuilder = () => {
  //Initialize variable 'data' and function setData. Initial value of data=empty array
  const [data, setData] = useState([]);

  //Initializes function 'setChartKey' and sets chartKey=0
  //chartKey's state is used as a key for "Bar" component. So when chartKey changes, the "Bar" component is re-rendered. 
  const [chartKey, setChartKey] = useState(0);
  
  //chartRef can be used to persist values across renders without causing re-renders when the value changes.  Acts as reference to the chart canvas. 
  const chartRef = useRef(null);
  
  useEffect(() => {
    //fetchDataAndBuildChart asynchronously fetches data from the specified csv file
    const fetchDataAndBuildChart = async () => {
      const parsedData = await fetchData(process.env.PUBLIC_URL + 'STIG_OSS_ExportData.csv');
      //Update component's state with the parsed data. 
      setData(parsedData);
    };

    fetchDataAndBuildChart();
  }, []);

  //useEffect is dependent on the 'data' state, so it will run whenever the 'data' state changes
  useEffect(() => {
    if (data.length > 0) {
      //chartRef.current references the chart canvas 
      //ctx = rendering context of the chart canvas
      const ctx = chartRef.current?.getContext('2d');
      
      //if render context is successfully obtained, the chart is ready to be updated
      if (ctx) {
        //setChartKey is used to update the state based on previous state, ensuring that it is correctly updated
        //increment the chartKey state to trigger a re-render
        setChartKey((prevKey) => prevKey + 1);
      }
    }
    //data = array of objects; each object = row 
  }, [data]);

  /*In this case, we are using "Code" as the column. The labels will be the names of the codes themselves, and the values will be the count of the code values in the dataset. */
  //Extract the value in "Code" from each row
  const codeValues = data.map((row) => row.Code);

  //Keep track of the number of times a code appears
  //Iterate over array of "Code" values
  const codeCounter = codeValues.reduce((countMap, code) => {
    //Increments count for current "Code"
    countMap[code] = (countMap[code] || 0) + 1;
    //countMap {code#: countOfCode}
    return countMap;
  }, {});

  //Use the key (the code num) for the labels
  const columnLabels = Object.keys(codeCounter);
  //Set the values as the count of each code
  const columnValues = Object.values(codeCounter);


  //Configure chart
  const chartData = {
    labels: columnLabels,
    datasets: [
      {
        label: "Code", 
        data: columnValues,
        backgroundColor: [
            "#00A6B4",
            "#2E4057",
            "#FFD662",
            "#DD1C1A",
            "#FF8600",
            "#0E2F44",
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: [
            "#003e4f",
            "#4c5b5c",
            "#946c2f",
            "#6b0f12",
            "#b25800",
            "#041f2b",
          ],
          hoverBorderColor: "#000",
      },
    ],
  };
  return (
    <div>
      {/* Uncomment the next line if you want to visualize the parsed data */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      
      {/* Render the Bar chart */}
      <Pie key={chartKey} ref={chartRef} data={chartData} />
    </div>
  );

  // return (
  //   <div>
  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //     <canvas key={chartKey} ref={chartRef} style={{ width: '400px', height: '200px' }} />
  //   </div>
  // );



};

export default ChartBuilder;
