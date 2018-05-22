$(document).on("turbolinks:load", function(){
  function buildHTML(message){
    message.image.url == null ? image_html = `` : image_html = `<img src ="${message.image.url}">`
    var html =
  `<div class='main_content__chat_space__user_name' id='message.id'>
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
      $('.main_content__chat_space').animate({scrollTop: $('.main_content__chat_space')[0].scrollHeight}, 450);
      $('form')[0].reset();
      $('.form__submit').prop("disabled", false);
    })
    .fail(function() {
      alert('エラーが発生しました');
    })
  });
});
