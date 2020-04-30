$(function(){
  function buildHTML(message){
    if (message.image) {
      let html =  
        `<div class="maincontent__chatspace__chatlist" data-message-id=${message.id}>
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
      let html =  
        `<div class="maincontent__chatspace__chatlist" data-message-id=${message.id}>
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
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url, 
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.maincontent__chatspace').append(html);
      $('form')[0].reset();
      $('.maincontent__chatspace').animate({ scrollTop: $('.maincontent__chatspace')[0].scrollHeight});
      $('.maincontent__form__send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました。");
    });
  })
  let reloadMessages = function() {
    let last_message_id = $('.maincontent__chatspace__chatlist:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
      let insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.maincontent__chatspace').append(insertHTML);
      $('.maincontent__chatspace').animate({ scrollTop: $('.maincontent__chatspace')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
   };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});