// authe gate, // user is logged in   // user is not logged in
request('/auth/token')
.then((response) => { })
.catch((error) => { window.location = '/index.html' })

//jQuery selectors for editable table
const $TABLE = $('#table');
const $BTN = $('#export-btn');
const $EXPORT = $('#export');

$('.table-add').click(() => {
  const $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
  $TABLE.find('table').append($clone);
});

$('.table-remove').click(() => {
  $(this).parents('tr').detach();
});

$('.table-up').click(() => {
  const $row = $(this).parents('tr');
  if ($row.index() === 1) return; // Don't go above the header
  $row.prev().before($row.get(0));
});

$('.table-down').click(function () {
  const $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
  const $rows = $TABLE.find('tr:not(:hidden)');
  const headers = [];
  const data = [];

  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {
    headers.push($(this).text().toLowerCase());
  });

  // Turn all existing rows into a loopable array
  $rows.each(function () {
    const $td = $(this).find('td');
    const h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach(function (header, i) {
      h[header] = $td.eq(i).text();
    });

    data.push(h);
  });

  // Output the result
  $EXPORT.text(JSON.stringify(data));
});
