Chat = { 
  chats: [],
  blinking: false,
  shown: false,
  start_blinking: function() {
    var i = $('#chat_icon').get(0);
    if(i) { // in case we get chac messages before the dom is populated
      j.src = 'i/icons/chat_icon18_animated.gif';
    }
  },
  stop_blinking: function() {
    $('#chat_icon').get(0).src = 'i/icons/chat_icon18.png';
  },
  push: function(event) {
    if(!this.shown) { // FIXME
      this.start_blinking();
    }
    this.chats.push(event);
  },

  hide: function() {
    this.shown = false;
  },

  show: function() {
    this.shown = true;
    if(this.blinking) {
      this.stop_blinking();
    }
  },

  chat_t:
    '<li title="#{when}"><a href="#" item="#{actor_tag}">#{actor_title}</a>#{what}</li>',
  
};

// FIXME probably should register a hook with LiveHTML's "reveal" mechanism or something
function chat_icon_clicked(e) {
  if(Chat.shown) {
    Chat.hide();
  } else {
    Chat.show();
  }
};
$(function($) {
	$('#chat_icon').bind('click', chat_icon_clicked);
});

LiveHTML.widgets.push({
  
  latest_chats: function(state) {
    if (Chat.chats.length > 9) Chat.chats = Chat.chats.slice(Chat.chats.length - 9);
    return Chat.chat_t.tt(Chat.chats);
  },
  
  chat_form_submitted: function(data, state, form) {
    var input = $(form).find('input');
    $.post("/gc/said", {msg: data.msg}, function(x){ 
      input.val('');
      $(form).enable();
      eval(x);
    });
  }
  
});
