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

const chart1 = document.getElementById('chart1')
const chart2 = document.getElementById('chart2')
const chart3 = document.getElementById('chart3')
const mainEventObj = [
  {id: 1, event_name: 'Start Event'},
  {id: 2, event_name: 'Pause Event'},
  {id: 3, event_name: 'End Event'}
]
const subEventObj = [
  {id: 1, event_name: 'Starting up', event_main_id: 1},
  {id: 2, event_name: 'Running', event_main_id: 1},
  {id: 3, event_name: 'Slowing Down', event_main_id: 1},
  {id: 4, event_name: 'Maintenance', event_main_id: 2},
  {id: 5, event_name: 'Starting back up', event_main_id: 2},
  {id: 6, event_name: 'Failed', event_main_id: 3},
  {id: 7, event_name: 'Success', event_main_id: 3},
  {id: 8, event_name: 'Waiting on materials', event_main_id: 3},
  {id: 9, event_name: 'Waiting on customer', event_main_id: 3}
]

request('/data')
.then((response) => {
  console.log(response)
  return response.data.data.map(dataObj => ({...dataObj, timeDif: (new Date(dataObj.End) - new Date(dataObj.Start))/(1000*60*60)}))
})
.then((response) => {
  const chart1data = (mainEventObj.map(eventObj => response.filter(dataObj => dataObj.Main === eventObj.event_name).reduce((acc, currentValue) => acc+=currentValue.timeDif, 0)))
  const chart2data = (subEventObj.map(eventObj => response.filter(dataObj => dataObj.Secondary === eventObj.event_name).reduce((acc, currentValue) => acc+=currentValue.timeDif, 0)))

  //line chart
  const objChart1 = new Chart(chart1, {
    type: 'line',
    data: {
      labels: ['Start Event', "Pause Event", "End Event"],
      datasets: [{
        label: "Main events",
        //backgroundColor: colors,
        borderColor: 'rgb(21, 68, 239)',
        data: chart1data,
      }]
    }
  })

  const objChart2 = new Chart(chart2, {
    type: 'bar',
    data: {
      labels:  ['Start Event', "Pause Event", "End Event"],
      datasets: [{
        label: "Main events",
        data: chart1data,
        backgroundColor: ['rgb(70, 219, 32)', 'rgb(255, 242, 0)', 'rgb(229, 54, 39)'],
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
  })

  const objChart3 = new Chart(chart3, {
    // The type of chart we want to create
    type: 'doughnut',
    // The data for our dataset
    data: {
      labels: ['Starting up','Running','Slowing Down','Maintenance','Starting back up','Failed','Success','Waiting on materials','Waiting on customer'],
      datasets: [{
        label: "My First dataset",
        backgroundColor: ['rgb(229, 54, 39)',
                        'rgb(180, 54, 39)',
                        'rgb(255, 161, 0)',
                        'rgb(255, 242, 0)',
                        'rgb(70, 219, 32)',
                        'rgb(70, 150, 32)',
                        'rgb(21, 68, 239)',
                        'rgb(209, 20, 239)',
                        'rgb(209,180, 239)'],
        borderColor: colors,
        data: chart2data
      }]
    },
    // Configuration options go here
    options: {}
  })


  for(i=0; i<chart1data.length; i++ ){
    document.getElementById('appendMainDataHere').appendChild(createLine(mainEventObj[i].event_name, chart1data[i]))
  }
  for(i=0; i<chart2data.length; i++ ){
    document.getElementById('appendSecondDataHere').appendChild(createLine(subEventObj[i].event_name, chart2data[i]))
  }
})

const createLine = (header, data) => {
  const line = document.createElement('h5')
  line.innerHTML = `${header} = ${data} hours`
  return line
}








//  old charts
// const objChart4 = new Chart(chart4, {
//   // The type of chart we want to create
//   type: 'polarArea',
//   // The data for our dataset
//   data: {
//     labels: ["Failures", 'Downtimes', 'Customer',"Success"],
//     datasets: [{
//       label: "Efficiency",
//       backgroundColor: colors,
//       borderColor: colors,
//       data: [2, 7, 5, 16]
//     }]
//   },
//   // Configuration options go here
//   options: {}
// });
//
// const objChart5 = new Chart(chart5, {
//   // The type of chart we want to create
//   type: 'radar',
//
//   data: {
//     labels: ['Sucess', 'Failures', 'Downtime'],
//     datasets: [{
//         data: [20, 10, 4,2]
//     }]
// }
// });
