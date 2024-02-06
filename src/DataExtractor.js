import Papa from 'papaparse';

/*
fetchData is an asynchronous function that retrieves data from a specified path using the "fetch" API. It then uses papaparse library to parse and return parsed data.
*/

  // //Function to fetch data
  // export const fetchData = async (filePath) => {
    
  //   //Fetch the data from the specified file
  //   try {
  //     const response = await fetch(filePath);
      
  //     //If we cannot extract the desired csv file, print this message
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  //     }

  //     //Read the response stream and decode it using TextDecoder
  //     const reader = response.body.getReader();
  //     const result = await reader.read();
  //     const text = new TextDecoder().decode(result.value);
  //    // console.log('Raw CSV data:', text); //prints unparsed data 

  //     //Parse the data and set first row as header
  //     const parsedData = Papa.parse(text, { header: true }).data;
  //     // console.log('Parsed CSV data:', parsedData); //prints parsed data

  //   return parsedData;
  //   //Handle errors
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     return [];
  //   }
  // };

  export const fetchData = async (filePath) => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const text = await response.text();
      const parsedData = Papa.parse(text, { header: true }).data;
  //    console.log('Parsed CSV data:', parsedData);
      return parsedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };