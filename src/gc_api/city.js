City = {
          
  landmarks_list2: function() {
    if (!Viewer.selected_city) return '';
    var landmarks = Landmarks.find("=city_id " + Viewer.selected_city);
    return landmarks.map(function(lm){
      return "<a href='#' item='"+ lm.item_tag +"'>" + lm.title + "</a>";
    }).join('');
	},
	
	wishmenu: function(menu) {
	  var html = City.ready_arr.slice(0, 15).map(function(x){
	    return tag('a', {
	      content: x.bin,
	      goal: x.bin
	    });
	  }).join('');
	  menu.find('.inner_menu').html(html).end().blit();
	}
		
};