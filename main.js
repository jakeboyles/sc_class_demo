(function () {

  $('body').on("click",".play,.song img",function(){
    var id = $(this).parent().data("id");
    var title = $(this).parent().data('title');
    $("audio").attr("src",`http://api.soundcloud.com/tracks/${id}/stream?client_id=03e4633e2d85874a921380e47cac705d`);
    $("#title").text(title);
    $('audio').trigger('play');
  })

  function getApi(text)
  {
    $.ajax({
      url: `http://api.soundcloud.com/tracks?client_id=03e4633e2d85874a921380e47cac705d&q=${text}`,
      success: function successHandler(resp) {
        $("#songsGoHere").empty();
        $("input").val("");
        resp.forEach(function(song){

          if(song.artwork_url === null)
          {
            song.artwork_url = "http://www.placecage.com/gif/300/300";
          }

          $("#songsGoHere").append(`
              <div data-title="${song.title}" data-id="${song.id}" class="col-md-3 song">
                <img src="${song.artwork_url}">
                <h4>Song Title: ${song.title} </h4>
                <h4>User: ${song.user.username}</h4>
                <button class="play btn btn-primary">Play Song</button>
              </div>
            `)
        })
    }});
  }

  $("form").on("submit",function(e) {
    e.preventDefault();
    var text = $("input").val();
    getApi(text);
  })

})();