import logo from './logo.svg';
import './App.css';
import BarChartBuilder from './BarChartBuilder';
import PieChartBuilder from './PieChartBuilder';
import LineChartBuilder from './LineChartBuilder';
import DonutChartBuilder from './DonutChartBuilder';

import React, {useState} from "react";


function App() {
  //Switch chart type on page
  const [currentPage, setCurrentPage] = useState('chart');
  const [dataFetched, setDataFetched] = useState(false); // Track if data has been fetched

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="App">
      <button onClick={() => setCurrentPage('Bar')}>Code Bar</button>
      <button onClick={() => setCurrentPage('Pie')}>Code Pie</button>
      <button onClick={() => setCurrentPage('Line')}>Line</button>
      <button onClick={() => setCurrentPage('Donut')}>Donut</button>
      <div className="chart-container">
        {currentPage === 'Bar' && <BarChartBuilder />}
        {currentPage === 'Pie' && <PieChartBuilder />}
        {currentPage === 'Line' && <LineChartBuilder />}
        {currentPage === 'Donut' && <DonutChartBuilder />}
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















