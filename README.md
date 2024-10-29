
# OSS STIG Report Generator with Charts (oss-stig-reports-with-charts)

## Components and Features
===============	
### Dashboard Layouts
If a user selects report option 2, 3, 4, 5, 6 or 8, data from the selected report will be passed into the component to display the data in the chosen report. The data will then be passed to other components to render the visualizations.

### Bar Chart Components
#### BarChartBuilder.js: 
---
***Purpose:*** renders a dynamic bar chart using ApexCharts library with customized styling, tooltips, and user interactivity. It includes the following:
- Component Props:
  - Receives props like `dataLabels`, `dataValues`, `isHorizontal`, `xAxisHeader`, `yAxisHeader`, `onClick`, and `formatLabelToPercentage`, which configure the chart's data, orientation, axis titles, click handling, and label formatting.
- Color Assignment: 
  - `getColorForLabel` assigns colors to the bars based on a given label
- Series Data: combines `dataValues` with `dataLabels` to format the series data
- Chart Options: sets up chart configuartion (`options`) for things like events, toolbar options, etc.
- Effects:
  - first `useEffect` hook dynamically updates chart's `series` data when `dataValues`, `dataLabels`, or `getColorForLabel` change.
  - second `useEffect` hook updates the `options` configuration if axis titles change

  #### HorizontalBarChartBuilder.js:  
  ***Purpose:*** renders a dynamic bar chart using ApexCharts library. Basically the the same as the `ApexBarChartBuilder` but with additional styling that is unique to horizontal bar charts. It includes the following:
  - Component Props:
    - Receives props like `dataLabels`, `dataValues`, `isHorizontal`, `xAxisHeader`, `yAxisHeader`, `onClick`, and `formatLabelToPercentage`, which configure the chart's data, orientation, axis titles, click handling, and label formatting.
  - Additional Styling for y-axis Labels:
    - Slightly offsets the y-axis labels to account for names and sets `grid.labels.left` to widen the y-axis label space.
    - `chartHeight`: ensures that there is enough space (24px) between rows to improve readability when there is a lot of data. 
  
  #### GroupedOrStackedBarBuilder.js:  
  ***Purpose:*** renders a dynamic bar chart using ApexCharts library to specifically display stacked or grouped bar charts. Mostly the same as `HorizontalBarChartBuilder`.
  - Component Props:  
    - `series`: series is formated beforehand and passed in
    - `dataLabels`: labels for the values
    - `dataLabelsArePercentages`: boolean that determines whether the `dataLabels` need to be formmated as percentages
    - `showLabelsOnBars`: boolean that specifies whether to show the labels on the bars in the chart
    - `isHorizontal`: boolean that specifies orientation
    - `isStackedBarChart`: boolean that specifies whether to stack or grouped series
    - `xAxisHeader`, `yAxisHeader`: text in headers
    - `onClick`: specifies behavior when series is clicked
    - `formatLabelToPercentage`: formats the labels as percentages instead of decimals

  #### ApexCountByValueBarChart.js 
  ***Purpose:*** creates a bar chart that displays the counts of unique values within a specified column (`targetColumn`). It uses helper functions and hooks to arrange and specify the data to pass to rendering components. 
  - Props:
    - `targetColumn`: specifies the column to count unique values
    - `isHorizontal`: selects the bar orientation
    - `xAxisTitle` and `yAxisTitle`: the labels for the x and y axes
    - `data`: data to analyze
  - Filter Hooks:
    - `useFilter` is custom hook that provides filtering functionality for:
      - `filter`: the global filter object
      - `updateFilter`: add/update a property-value pair in the filter object
      -  `removeFilterKey`: remove a property-value pair from the filter object
  - Filtering Data:
    - `filteredData`: re-calculates the data based on the property-value pair in the filter object.
  - Counting Unique Values:
    -  `countMap`: calls `ValueCountMap` component to count occurrences of each unqiue value in the `targetColumn`.
    - `barLabels`: an array of unqiue values in the target column (keys in `countMap`).
    - `barValues`: an array of counts for each unqiue value (values in `countMap`).
  - Handling Bar Click Events:
    - `handleBarClick` updates the filter when a bar is clicked:
      - Retrieves the selected bar's label
      - Add/removes the label from the filter object by calling `updateFilter` or `removeFilterKey` to ensure toggling functionality.
  - Rendering the Chart:
    - Renders the bar chart based on `isHorizontal`. If `isHorizontal` is true, it will select `HorizontalBarChartBuilder`, or else it will select and render `ApexBarChartrBuilder`.
  
  #### GroupedOrStackedBar.js
    ***Purpose:*** creates a bar chart that displays the counts of unique values within a specified column (`targetColumn`). It uses helper functions and hooks to arrange and specify the data to pass to rendering components. 
  - Props:
    - `targetColumn`: specifies the column to count unique values
    - `isHorizontal`: selects the bar orientation
    - `xAxisTitle` and `yAxisTitle`: the labels for the x and y axes
    - `data`: data to analyze
  - Filter Hooks:
    - `useFilter` is custom hook that provides filtering functionality for:
      - `filter`: the global filter object
      - `updateFilter`: add/update a property-value pair in the filter object
      -  `removeFilterKey`: remove a property-value pair from the filter object
  - Filtering Data:
    - `filteredData`: re-calculates the data based on the property-value pair in the filter object.
  - Counting Unique Values:
    -  `countMap`: calls `ValueCountMap` component to count occurrences of each unqiue value in the `targetColumn`.
    - `barLabels`: an array of unqiue values in the target column (keys in `countMap`).
    - `barValues`: an array of counts for each unqiue value (values in `countMap`).
  - Handling Bar Click Events:
    - `handleBarClick` updates the filter when a bar is clicked:
      - Retrieves the selected bar's label
      - Add/removes the label from the filter object by calling `updateFilter` or `removeFilterKey` to ensure toggling functionality.
  - Rendering the Chart:
    - Renders the bar chart based on `isHorizontal`. If `isHorizontal` is true, it will select `HorizontalBarChartBuilder`, or else it will select and render `ApexBarChartrBuilder`.










<!---
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

<hr style="border: none; height: 3px;/>


---
--->


