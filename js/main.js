// The document is ready
$(document).ready(function () {
  console.log('This is my jQuery...');

  //preventing the default refresh from happening//

  $('.drop-down').on('change', function (event) {
    event.preventDefault();

    var selection = $('.drop-down option:selected').filter(':selected').val();
    console.log(selection);

    // Built by LucyBot. www.lucybot.com
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + selection + '.json';
    url += '?' + $.param({
      'api-key': "d390d4787e77488aa56edb4391f01cfb"
    });

    console.log(url);

    $.ajax({
      url: url,
      method: 'GET',
    })
      .done(function (response) {

        console.log('IN DONE');

        var results = response.results;
        var filteredList = results.filter(function (item) { return item.multimedia.length }).slice(0, 12);
        console.log(filteredList);

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
      });

    // add in the loading image in html hidden //
    //Empty out old searches//
    // $('.stories').empty();
  });
});
