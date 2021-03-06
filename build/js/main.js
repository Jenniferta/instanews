// The document is ready
console.log('hello2');
$(document).ready(function () {

  //setting up the listener to wait for an event//
  //adding the loader//
  //preventing the default refresh from happening//
  console.log('hello');
  $('.loader').hide();


  $('.drop-down').on('change', function (event) {
    $('.loader').show();
    $('.logo img').css('padding-top','0px');

    event.preventDefault();
    $('.stories').empty();

    var newscategory = $('.drop-down option:selected').filter(':selected').val();

    var url = 'https://api.nytimes.com/svc/topstories/v2/' + newscategory + '.json';
    url += '?' + $.param({
      'api-key': "d390d4787e77488aa56edb4391f01cfb"
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function (response) {
        var results = response.results;
        var filteredList = results.filter(function (item) { return item.multimedia.length }).slice(0, 12);
        $.each(filteredList, function (key, value) {

          var url = value.url;
          var pic = value.multimedia[4].url;
          var abstract = value.abstract;
          var link = '';
          link += '<a href="' + url + '">' +
          link += '<li class="article-list" style="background-image:url('+pic +')">';
         '<p class="headline">' + abstract + '</p>';
          link += '</li></a>';

          $('.stories').append(link);
        })
      })
      .fail(function (err) {
        console.log('IN AJAX FAIL');
        throw err;
      }).always(function(){
        $('.loader').hide();
      });

    // add in the loading image in html hidden //
    //Empty out old searches//
    // $('.stories').empty();
  });
});
