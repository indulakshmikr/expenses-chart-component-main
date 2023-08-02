// Fetch data from the JSON file
fetch('./data.json')
.then(response => response.json()) // Parse the response as JSON
.then(jsonData => {
  const chartData = jsonData.map(item => item.amount);  // Extract the data from the JSON

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDayIndex = new Date().getDay();
  const currentDay = daysOfWeek[currentDayIndex];
  const indexOfCurrentDay = jsonData.findIndex(item => item.day === currentDay);

  // Find the maximum value in the chart data
  const maxVal = Math.max(...chartData);

  // Get the canvas element and create the chart
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: jsonData.map(item => item.day), // Use "day" data for the labels
      datasets: [{
        label: '$',
        data: chartData,
        backgroundColor: jsonData.map(item => (item.day.toUpperCase() === currentDay.toUpperCase()) ? 'hsla(10, 79%, 65%,0.8)' : 'hsl(10, 79%, 65%)'),
        borderWidth: 0,
        borderRadius: 5
      }]
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false // Hide x-axis gridlines
          }
        },
        y: {
          display: false, //hide data on y axis
          grid: {
            display: false // Hide x-axis gridlines
          },
          suggestedMin: 0, // Set the minimum value of the y-axis
          suggestedMax: maxVal + 5, // Set the maximum value of the y-axis (add some padding)
          grid: {
            color: 'transparent', // Hide y-axis gridlines by making them transparent
            drawBorder: false, // Hide the axis line
          }
        }
      },
      plugins: {
        legend: {
          display: false // hide legend displayed above chart
        },
        tooltip: {
        enabled: true,
        displayColors: false, //hide color box
        backgroundColor: 'hsl(25, 47%, 15%)',
        bodyColor: 'hsl(33, 100%, 98%)',
        bodyAlign: 'center',
        bodyFont: {
          weight: 'bold'
        },
        callbacks: {
          label: function (context) {
            // return context.parsed.x;
            const value = context.parsed.y;
            return '$' + value.toFixed(2); // Add the dollar sign and round the value to 2 decimal places
          },
          title: function (context) {
            return ''; // Hide the tooltip title (day label)
          }
        }
      }
      }
    },
  });

  //mark current day different color
  const currentDate = new Date();

  // Mark the maximum value with a different color
  const maxDataIndex = chartData.indexOf(maxVal);
  myChart.data.datasets[0].hoverBackgroundColor = myChart.data.datasets[0].data.map((val,index)=> (index === maxDataIndex)?  'hsla(186, 34%, 60%, 0.5)':  'hsla(10, 79%, 65%,0.7)');
  myChart.data.datasets[0].backgroundColor = myChart.data.datasets[0].data.map((val, index) => { 
    if (index === maxDataIndex) return 'hsl(186, 34%, 60%)' 
  else if(index === indexOfCurrentDay) 
  return 'hsla(10, 79%, 65%,0.9)'
  else
  return 'hsla(10, 79%, 65%,1)'
});
  myChart.update();
})
.catch(error => {
  console.error('Error fetching or parsing JSON data:', error);
});