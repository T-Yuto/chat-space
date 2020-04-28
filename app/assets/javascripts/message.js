$(function(){
  function buildHTML(message){
    if (message.image) {
          var html =  
          `<div class="chatlist">
            <div class="name-date">
              <div class="name-date__chatname">
                ${message.user_name}
              </div>
              <div class="name-date__chatdate">
                ${message.created_at}
              </div>
              <div class="message">
                <p class="message__text">
                  ${message.text}
                </p>
              </div>
            </div>
            <imag src=${message.image}>
          </div>`
          return html;
        } else {
          var html =  
          `<div class="chatlist">
            <div class="name-date">
              <div class="name-date__chatname">
                ${message.user_name}
              </div>
              <div class="name-date__chatdate">
                ${message.created_at}
              </div>
              <div class="message">
                <p class="message__text">
                  ${message.text}
                </p>
              </div>
            </div>
          </div>`
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
        console.log(data);
        var html = buildHTML(data);
    })
  });
})