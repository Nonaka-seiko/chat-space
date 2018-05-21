$(function(){
  function buildHTML(message){
    message.image.url == null ? image_html = `` : image_html = `< class = "main_content__chat_space__image"><img scr ="${message.image.url}">`
    var html =
  `<div class='main_content__chat_space__user_name' id='message.id'>
    ${message.name}
    <span class='main_content__chat_space__created_at'>
      ${message.create_at}
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
    console.log(this)
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
      $('.form__message').val('')
      $('.main_content__chat_space').animate({scrollTop: $('.main_content__chat_space')[0].scrollHeight}, 450);
    })
    .fail(function() {
      alert('エラーが発生しました');
    })
  })
})
