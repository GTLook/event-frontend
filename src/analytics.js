// authe gate, // user is logged in   // user is not logged in
request('/auth/token')
.then((response) => { })
.catch((error) => { window.location = '/index.html' })

const colors = ['rgb(229, 54, 39)',
                'rgb(255, 161, 0)',
                'rgb(255, 242, 0)',
                'rgb(70, 219, 32)',
                'rgb(21, 68, 239)',
                'rgb(209, 20, 239)']

const chart1 = document.getElementById('chart1').getContext('2d');
const chart2 = document.getElementById('chart2').getContext('2d');
const chart3 = document.getElementById('chart3').getContext('2d');
const chart4 = document.getElementById('chart4').getContext('2d');
const chart5 = document.getElementById('chart4').getContext('2d');

request('/data')
.then((response) => {
  console.log(response.data)
})

//line chart
const objChart1 = new Chart(chart1, {
  type: 'line',
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "Months Working",
      //backgroundColor: colors,
      borderColor: 'rgb(21, 68, 239)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  }
})


const objChart2 = new Chart(chart2, {
  type: 'bar',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

const objChart3 = new Chart(chart3, {
  // The type of chart we want to create
  type: 'doughnut',
  // The data for our dataset
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset",
      backgroundColor: colors,
      borderColor: colors,
      data: [0, 10, 5, 2, 20, 30, 45]
    }]
  },
  // Configuration options go here
  options: {}
});

const objChart4 = new Chart(chart4, {
  // The type of chart we want to create
  type: 'polarArea',
  // The data for our dataset
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset",
      backgroundColor: colors,
      borderColor: colors,
      data: [0, 10, 5, 2, 20, 30, 45]
    }]
  },
  // Configuration options go here
  options: {}
});
