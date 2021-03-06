$(document).ready(function(){
  $(function(){
      var accessToken = '6918512031.3d781d7.5051533f22dc4dab9574da053742c979';
      var userId = 6918512031; 
      var countPhotos = 20;
    // загрузить данные на странице 
    $.ajax({
      url: 'https://api.instagram.com/v1/users/' + userId + '/media/recent',
      dataType: 'jsonp',
      type: 'GET',
      // передача параметров для получения контента
      data: {access_token: accessToken, count: countPhotos}, 
      success: function(result){
        for( i in result.data ){
          var photo = result.data[i].images.low_resolution.url;
          var text = result.data[i].caption.text;
          var countLikes = result.data[i].likes.count; 
          var photoDate = new Date( result.data[i].created_time*1000);
          $('ul').append('<li><img src="'+photo+'"><div class="inf"><br>'+text+'<p>'+countLikes+'</p><h4>'+photoDate.toLocaleString()+'</h4></div></li>'); 
        }
      },
      error: function(result){
        // пишем в консоль об ошибках
        console.log(result); 
      }
    });
  });
});
//обновить данные страницы 
$(document).on("click", "#more", function(){  
    location.reload(true); 
  });


  