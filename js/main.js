// The document is ready
$(document).ready(function() {
  console.log('This is my jQuery...');

//preventing the default refresh from happening//

  $('.drop-down').on('change', function(event) {
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
    .done(function(response) {
      console.log('IN AJAX DONE');
      console.log(response);
      console.log(response.results)
      response.results.forEach(function(element) {
        // console.log(element.title);
      });
    })
    .fail(function(err) {
      console.log('IN AJAX FAIL');
      throw err;
    });

    // add in the loading image in html hidden // 
    //Empty out old searches//
    // $('.stories').empty();
  });

  

  
});
