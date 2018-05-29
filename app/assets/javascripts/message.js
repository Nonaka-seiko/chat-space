$(function(){
  var interval = setInterval(function() {
    var id = $('.main_content__chat_space__user_name').last().data('message-id');
    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.pathname,
        type: 'GET',
        data: { id: id },
        dataType: 'json',
      })
      .done(function(json){
        var insertHTML = '';
        json.new_message.forEach(function(message){
          if (message.id > id){
          insertHTML += buildHTML(message);
          }
        });
        $('.main_content__chat_space').append(insertHTML);
        $('.main_content__chat_space').animate({ scrollTop: $('.main_content__chat_space').get(0).scrollHeight },'slow');
      })
      .fail(function(json){
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    };
  } , 5000 );

  function buildHTML(message){
    message.image == null ? image_html = `` : image_html = `<img src ="${message.image}">`
    var html =
      `<div class='main_content__chat_space__user_name' data-message-id="${message.id}">
         ${message.user_name}
           <span class='main_content__chat_space__created_at'>
             ${message.created_at}
           </span>
       </div>
       <div class='main_content__chat_space__comment'>
         ${message.content}
         ${image_html}
       </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_content__chat_space').append(html);
      $('.main_content__chat_space').animate({scrollTop: $('.main_content__chat_space')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
      $('.form__submit').prop("disabled", false);
    })
    .fail(function() {
      alert('エラーが発生しました');
    })
  });
});
