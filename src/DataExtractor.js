import Papa from 'papaparse';


/*
fetchData is an asynchronous function that retrieves data from a specified path using the "fetch" API. It then uses papaparse library to parse and return parsed data.

So I want to make a line chart in React using chart.js. I only have one dataset that is in the form of a csv file, and I've already created a function to extract said data. What I want to do is create a line chart with three lines, each line depicting the values in the "assessed", "submitted", "accepted", and "rejected" columns. 


*/

//Format percentage using Intl.NumberFormat
const formatPercentage = (percentageString) => {
  //remove % sign
  const percentageValue = parseFloat(percentageString.replace('%', ''));
  //round to 2 decimal places and return as float
 // return parseFloat(percentageValue.toFixed(2));
  return percentageValue / 100;
};

//convert from object to string
const objectToString = (object) => {
  //split the value by colon and take second part
  // const sysAdminValue = object.split(':')[1].trim();
  const jsonString = JSON.stringify(object);
  return jsonString
};

  export const fetchData = async (filePath) => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      //const parsedData = Papa.parse(text, { header: true }).data;
      const parsedData = Papa.parse(text, { header: true, dynamicTyping: true, date: true}).data;
      
      parsedData.forEach(entry => {
        // Split datePulled string into parts and construct a Date object
        const [year, month, day] = entry.datePulled.split('-');
        entry.datePulled = new Date(year, month - 1, day);
        //console.log(entry.datePulled, typeof entry.datePulled);
        
        //convert assessed, submitted, rejected, and accepted to decimals
        entry.assessed = formatPercentage(entry.assessed);
        entry.submitted = formatPercentage(entry.submitted);
        entry.accepted = formatPercentage(entry.accepted);
        entry.rejected = formatPercentage(entry.rejected);

        //convert objects to strings
        entry.sysAdmin = objectToString(entry.sysAdmin).replace('_$', '');
        entry.primOwner = objectToString(entry.primOwner);
        entry.deviveType = objectToString(entry.deviveType);
        
      });



    
      return parsedData;

    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };


      //  //See datatypes
      // if (parsedData.length > 0) {
      //   const firstRow = parsedData[0];
      //   //iterate through each property of the first row using Object.keys(firstRow)
      //   Object.keys(firstRow).forEach(key => {
      //     //for each property (column), print out its datatype
      //     console.log(`Data type of '${key}': ${typeof firstRow[key]}`);
      //   });
      // }




      /*       Also, some of the values in the column "sysAdmin" have values like "WagnerE_$", "WalkerB_$", "AndersonH_$". How do I remove the "_$" that is part */
