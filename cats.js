$(function(){
  var visited = [];
  $('.summon-cats').on('click', function(){
    console.log("button works");
    $('#catlist > ul').remove();
    $('#catlist').append($('<ul>'));
    $.ajax({
      url: "http://bitkittens.herokuapp.com/cats.json",
      method: "GET",
      dataType: "json",
      data: {number: 4}
    }).done(function(responseData){
      console.log(responseData.cats[0]);
      $('#catlist').css('display', 'inline-block');
      for (var i = 0; i < responseData.cats.length; i++) {

        var catName = responseData.cats[i].name;
        var included = false;
        for(var j = 0; j < visited.length; j++){
          if (visited[j][0] === catName) {
            included = true;
            visited[j][1]++;
            break;
          }
        }
        if (!included) {
          visited.push([catName, 1]);
        }


        var imgTag = $('<img>');
        imgTag.attr('src', responseData.cats[i].photo);
        imgTag.attr('alt', 'Photo of ' + responseData.cats[i].name);
        imgTag.appendTo('#cat' + (i + 1));
        $('#cat' + (i+1)).append($('<p>').html(responseData.cats[i].name));
        $('#cat' + (i+1)).animate({top: '270px'}, 2000);
      }
      for (var i = 0; i < visited.length; i++) {
        var li = $('<li>').html(visited[i][0] + ' visited ' + visited[i][1] + ' times.')
        li.appendTo('#catlist > ul');
      }
    });
  });

});
