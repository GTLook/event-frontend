// authe gate, // user is logged in   // user is not logged in
request('/auth/token')
.then((response) => { })
.catch((error) => { window.location = '/index.html' })

//request data from data db and render table
request('/data')
.then((response) => {
  Object.keys(response.data.data[0]).forEach(key => {
    //table headers
    const tableHead = document.querySelector('#tableHead')
    const newHead = document.createElement("th")
    newHead.setAttribute('scope','col')
    newHead.innerHTML = key
    tableHead.appendChild(newHead)
  })
  return response
})
.then((response) => {
  const tableBody = document.querySelector('#tableBody')
  response.data.data.forEach(obj => {
    const newRow = document.createElement('tr')
    //asign collors
    newRow.classList.add(contextualRow(obj))
    console.log(obj.Secondary)
    //newRow.setAttribute('scope','row')
    for(let element in obj){
      if(element === 'Main'){
        const newCell = createMainDrop(obj)
        newCell.setAttribute('data-id', obj.id)
        newCell.setAttribute('data-element', element)
        newRow.appendChild(newCell)
      }
      else if(element === 'Secondary'){
        const newCell = createSecondDrop(obj)
        newCell.setAttribute('data-id', obj.id)
        newCell.setAttribute('data-element', element)
        newRow.appendChild(newCell)
      }
      else{
        const newCell = document.createElement('td')
        newCell.setAttribute('data-id', obj.id)
        newCell.setAttribute('data-element', element)
        newCell.addEventListener('blur', (event) => {
          request(`/data/${event.target.getAttribute('data-id')}`, 'put', {element:event.target.getAttribute('data-element'), data: event.target.innerHTML})
          .then(response => {
            event.target.innerHTML = resonse.data
          })
          .catch((error) => {
            console.log(error)
          })
        })
        if(element == 'id') newCell.setAttribute('scope','row')
        else newCell.setAttribute('contenteditable',true)
        if(element === 'Start' || element === 'End') newCell.innerHTML = moment(obj[element]).format('YYYY-MM-DD HH:MM')
        else newCell.innerHTML = obj[element]
        newRow.appendChild(newCell)
      }
    }
    tableBody.appendChild(newRow)
  })
  return response
})
.then((response) => {  //creates empty row on bottom
  const tableBody = document.querySelector('#tableBody')
  const newRow = document.createElement('tr')
  let idCount = 1
  Object.keys(response.data.data[0]).forEach(key => {
      const newCell = document.createElement("td")
      if(idCount==1) newCell.innerHTML = response.data.data.length + 1
      else newCell.setAttribute('contenteditable',true)
      idCount++
      newRow.appendChild(newCell)
    })
    tableBody.appendChild(newRow)
})


const createMainDrop = (obj) => {
  const mainDropValues = [{name:'Start Event', id: 1}, {name:'Pause Event', id:2}, {name:'End Event',id:3}]
  //const newDropdown = document.createElement('button')
  obj.name = obj.Main
  return dropdown(obj, mainDropValues, (id, ele)=> {
    request(`/data/${id}`, 'put', {element:'Main', data: ele.id})
    .then(response => {})
  })
}

const createSecondDrop = (obj) => {
  const mainDropValues = [{name:'Starting up', id:1}, {name:'Running', id:2}, {name:'Slowing Down', id:3},{ name:'Maintenance', id:4},
                          {name:'Starting back up', id:5}, {name:'failed', id:6}, {name:'Success', id:7}, {name:'Waiting on materials', id:8}, {name:'Waiting on customer', id:9}]
  //const newDropdown = document.createElement('button')
  // console.log(obj)
  obj.name = obj.Secondary
  return dropdown(obj, mainDropValues, (id, ele)=> {
    request(`/data/${id}`, 'put', { element:'Secondary', data: ele.id})
    .then(response => {})
  })
}

const dropdown = (obj, dropValues, cb) => {
  const td = document.createElement('td')
  const label = document.createElement('button')
  label.classList.add('btn')
  // label.classList.add('btn-secondary')
  label.classList.add('dropdown-toggle')
  label.id = 'dropdownMenuLink'
  label.setAttribute('data-toggle', 'dropdown')
  // label.setAttribute('aria-haspopup', 'true')
  // label.setAttribute('aria-expanded', 'false')
  label.innerHTML = obj.name
  td.appendChild(label)

  const dropdownValues = dropValues.reduce((acc, ele)=> {
    const a = document.createElement('a')
    a.classList.add('dropdown-item')
    a.href = '#'
    a.setAttribute('data-id', ele.id)
    a.innerHTML = ele.name
    acc.appendChild(a)
    a.addEventListener('click', function(event){
      label.innerHTML = event.target.innerHTML
      // label.classList.add(contextualRow(obj))
      cb(obj.id, ele)
    })
    return acc
  }, document.createElement('div'))
  dropdownValues.classList.add('dropdown-menu')
  td.appendChild(dropdownValues)

  return td
}

const contextualRow = (obj) => {
  if(obj.Secondary == 'Success') return 'table-success'
  if(obj.Secondary == 'Running') return 'table-success'
  if(obj.Secondary == 'Starting back up') return 'table-info'
  if(obj.Secondary == 'Waiting on materials') return 'table-danger'
  if(obj.Secondary == 'Failed') return 'table-danger'
}
