import Papa from 'papaparse';

/*
fetchData is an asynchronous function that retrieves data from a specified path using the "fetch" API. It then uses papaparse library to parse and return parsed data.
*/

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


 


 //import Papa from 'papaparse';
//Fetch the data from the specified file
// export const fetchData = async (filePath) => {
//   try {
//     const response = await fetch(filePath);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
//     }
//     const text = await response.text();
    
//     //create an empty array to store the matching rows
//     var matchingRows = [];

//     //parse the file with a step callback
//     Papa.parse(text, {
//       header: true,
//       dynamicTyping: false,
//       step: function (row) {
//         //check the value of the 'Code' column
//         if (row.data.Code == '60') {
//           //do something with the row
//           console.log('Found a matching row:', row.data);
//           //add the row to the array
//           matchingRows.push(row.data);
//         }
//       },
//       complete: function () {
//         //do something with the array of matching rows
//         console.log('All matching rows:', matchingRows);
//       },
//     });
//     const parsedData = Papa.parse(text, { header: true, dynamicTyping: false }).data;
//     //return the parsed data
//     return parsedData;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }
// };
