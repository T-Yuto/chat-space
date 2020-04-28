$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =  
        `<div class="maincontent__chatspace__chatlist">
          <div class="maincontent__chatspace__chatlist__name-date">
            <div class="maincontent__chatspace__chatlist__name-date__chatname">
              ${message.user_name}
            </div>
            <div class="maincontent__chatspace__chatlist__name-date__chatdate">
              ${message.created_at}
            </div>
          </div>
          <div class="maincontent__chatspace__chatlist__message">
            <p class="message__text">
              ${message.text}
            </p>
            </div>
            <img  src=${message.image}>
        </div>`
      return html;
    } else {
      var html =  
        `<div class="maincontent__chatspace__chatlist">
          <div class="maincontent__chatspace__chatlist__name-date">
            <div class="maincontent__chatspace__chatlist__name-date__chatname">
              ${message.user_name}
            </div>
            <div class="maincontent__chatspace__chatlist__name-date__chatdate">
              ${message.created_at}
            </div>
          </div>
          <div class="maincontent__chatspace__chatlist__message">
            <p class="message__text">
              ${message.text}
            </p>
          </div>
        </div>`
        return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url, 
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data)
      var html = buildHTML(data);
      $('.maincontent__chatspace').append(html);
      $('form')[0].reset();
      $('.maincontent__chatspace').animate({ scrollTop: $('.maincontent__chatspace')[0].scrollHeight});
      $('.maincontent__form__send-btn').prop('disabled', false);
    })
    .fail(function{
      alert("メッセージ送信に失敗しました。");
    });
  })
});