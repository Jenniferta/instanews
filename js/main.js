// The document is ready
$(document).ready(function () {


  //preventing the default refresh from happening//

  $('.drop-down').on('change', function (event) {
    $('.loader').before('<img src="../assets/images/ajax-loader.gif" id="loader>')
    event.preventDefault();
    $('.stories').empty();

    var selection = $('.drop-down option:selected').filter(':selected').val();


    // Built by LucyBot. www.lucybot.com
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + selection + '.json';
    url += '?' + $.param({
      'api-key': "d390d4787e77488aa56edb4391f01cfb"
    });


    $.ajax({
      url: url,
      method: 'GET',
    })
      .done(function (response) {
        var results = response.results;
        var filteredList = results.filter(function (item) { return item.multimedia.length }).slice(0, 12);
        $.each(filteredList, function (key, value) {

          var url = value.url;
          var pic = value.multimedia[4].url;
          var abstract = value.abstract;
          var link = '';
          link += '<li class="article-list">';
          link += '<a href="' + url + '">' +
            '<img src ="' + pic + '" />' +
            '<p>' + abstract + '</p> </a>';
          link += '</li>';

          $('.stories').append(link);
        })
      })
      .fail(function (err) {
        console.log('IN AJAX FAIL');
        throw err;
      }).always(function(){
        $('#loader').remove();
      });

    // add in the loading image in html hidden //
    //Empty out old searches//
    // $('.stories').empty();
  });
});
