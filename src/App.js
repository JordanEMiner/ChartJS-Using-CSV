import logo from './logo.svg';
import './App.css';
import BarChartBuilder from './BarChartBuilder';
import PieChartBuilder from './PieChartBuilder';
import React, {useState} from "react";


function App() {
  //Switch chart type on page
  const [currentPage, setCurrentPage] = useState('chart');
  const [dataFetched, setDataFetched] = useState(false); // Track if data has been fetched

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // //Opens selected chart on current page
  // const renderPage = () => {
  //   switch (currentPage) {
  //     case 'Bar':
  //       return <BarChartBuilder />;
  //     case 'Pie':
  //       return <PieChartBuilder />;
  //     default:
  //       return null;
  //   }
  // };


  return (
    <div className="App">
      <button onClick={() => setCurrentPage('Bar')}>Bar</button>
      <button onClick={() => setCurrentPage('Pie')}>Pie</button>
      <div className="chart-container">
        {currentPage === 'Bar' && <BarChartBuilder />}
        {currentPage === 'Pie' && <PieChartBuilder />}
      </div>

    </div>
  );
}

export default App;
