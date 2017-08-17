$(document).ready(function () {
  $('#myBtn a').click(function (e) {
    var url = 'https://api.myjson.com/bins/1mjba';
    e.preventDefault();
    $.ajax({
      url: url
      , type: 'GET'
      , dataType: 'text'
      , success: function (data) {
        data = JSON.parse(data);  // only if its a string value in data
        $.each(data, function (key, index) {
          console.log(data[key].email);
          console.log(index.email);
          console.log(index['email']);
          $('#output').append('<br>' + index.email);
        })
      }
      , error: function (data) {
        console.log(data);
        $('#output').append('<br>' + data.statusText);
      }
    })
  })
})
