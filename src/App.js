import './App.css';
import BarChartBuilder from './components/BarChartBuilder';
import PieChartBuilder from './components/PieChartBuilder';
import LineChartBuilder from './components/LineChartBuilder';
import DonutChartBuilder from './components/DonutChartBuilder';
import ExpandableTableExample from './components/TableUsingReactTable/ExpandableTableExample';
import BasicTableExample from './components/TableUsingReactTable/BasicTableExample'; // Import BasicTableExample
import RenderTable from './components/TableUsingReactTable/RenderTable';

import React, {useState} from "react";

function App() {
  //Switch chart type on page
  const [currentPage, setCurrentPage] = useState('chart');
  // const [dataFetched, setDataFetched] = useState(false); // Track if data has been fetched

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="App">
      <button onClick={() => setCurrentPage('Bar')}>Code Bar</button>
      <button onClick={() => setCurrentPage('Pie')}>Code Pie</button>
      <button onClick={() => setCurrentPage('Line')}>Line</button>
      <button onClick={() => setCurrentPage('Donut')}>Donut</button>
      <button onClick={() => setCurrentPage('ExpandableTable')}>Expandable Table</button> 
      <button onClick={() => setCurrentPage('BasicTableExample')}>Basic Table</button> 
      
      {/* <button onClick={() => setCurrentPage('RenderTable')}>RenderTable</button> */}
      <div className="chart-container">
        {currentPage === 'Bar' && <BarChartBuilder />}
        {currentPage === 'Pie' && <PieChartBuilder />}
        {currentPage === 'Line' && <LineChartBuilder />}
        {currentPage === 'Donut' && <DonutChartBuilder />}
        {currentPage === 'ExpandableTable' && <ExpandableTableExample />}
        {currentPage === 'BasicTableExample' && <BasicTableExample />} 


        {/* {currentPage === 'RenderTable' && <RenderTable />} */}
        {/* {(currentPage === 'ExpandableTable' || currentPage === 'BasicTableExample') && <RenderTable currentPage={currentPage} />}  */}
      </div>

    </div>
  );
}

export default App;


/*
  const [currentPage, setCurrentPage] = useState('chart');

  const renderPage = () => {
    switch (currentPage) {
      case 'chart':
        return <ChartUsingAPI />;
      case 'dummyData':
        return <DummyData />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Your React App</h1>
      <div>
        <button onClick={() => setCurrentPage('chart')}>Chart</button>
        <button onClick={() => setCurrentPage('dummyData')}>Dummy Data</button>
      </div>
      {renderPage()}
    </div>
  );
}


*/















