$(document).ready(function() {

  var following = [];
  var logo;
  var name;
  var status;
  //FREEE CODE CAMP STREAM INFO AND STATUS API CALL
  var fccURL = 'https://api.twitch.tv/kraken/streams/freecodecamp';
  $.getJSON(fccURL, function(data1) {
    if(data1.stream === null) {
      $('#fccStatus').html('Free Code Camp is currently <span class="off">OFFLINE</span>')
      $.getJSON(data1._links.channel, function(fccData) {
        logo = fccData.logo;
        name = fccData.display_name;
        status = 'OFFLINE';
        $('#fccInfo').prepend("<div class='panel panel-body'>" + "<div id='logo' class='col-md-4 text-center'>" + "<img id='logoImg' src='" + logo + "'>" + "</div>" + "<h2 id='name' class='col-md-4 text-center'>" + name + "</h2>" + "<h2 id='status' class='col-md-4 text-center'><span class='off'>" + status + "</span></h2></div>");
      });
    } else {
      $('#fccStatus').html('Free Code Camp is currently <span class="on">ONLINE</span>')
      logo = data1.stream.channel.logo;
      name = data1.stream.channel.display_name;
      status = data1.stream.channel.status;
      $('#fccInfo').prepend("<div class='panel panel-body'>" + "<div id='logo' class='col-md-4 text-center'>" + "<img id='logoImg' src='" + logo + "'>" + "</div>" + "<h2 id='name' class='col-md-4 text-center'>" + name + "</h2>" + "<h2 id='status' class='col-md-4 text-center'><span class='on'>" + status + "</span></h2></div>");
    }
  }); 
  
  var followerURL = 'https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/';
  $.getJSON(followerURL, function(data2) {
    for (var i = 0; i < data2.follows.length; i++) {
      var displayName = data2.follows[i].channel.display_name;
      following.push(displayName);
    }
    following.push('comster404');
    following.push('brunofin');
    following.push('ESL_SC2');
    
    for (var i = 0; i < following.length; i++) {
      var follower = following[i];
      var url2 = 'https://api.twitch.tv/kraken/streams/' + follower + '/?callback=?';
      $.getJSON(url2).done(function(data3) {
        var logo;
        var status;
        var name;
        if (data3.error) {
          logo = 'https://s-media-cache-ak0.pinimg.com/564x/32/b6/fd/32b6fd3ce09bdba62b10d60fcbde8f9c.jpg';
          name = data3.message;
          status = data3.error;
        $('#followerInfo').prepend("<div class='panel panel-body'>" + "<div id='logo' class='col-md-4 text-center'>" + "<img id='logoImg' src='" + logo + "'>" + "</div>" + "<h2 id='name' class='col-md-4 text-center'>" + name + "</h2>" + "<h2 id='status' class='col-md-4 text-center'>" + status + "</h2></div>");
        }
        if(data3.stream===null) {
          $.getJSON(data3._links.channel, function(data5) {
            logo = data5.logo;
            name = data5.display_name;
            status = 'OFFLINE';
            if(logo===null) {
              logo = 'https://s-media-cache-ak0.pinimg.com/originals/12/09/84/1209840357bac53bac0750a162025769.gif';
            }
        $('#followerInfo').prepend("<div class='panel panel-body'>" + "<div id='logo' class='col-md-4 text-center'>" + "<img id='logoImg' src='" + logo + "'>" + "</div>" + "<h2 id='name' class='col-md-4 text-center'>" + name + "</h2>" + "<h2 id='status' class='col-md-4 text-center'><span class='off'>" + status + "</span></h2></div>");
          });
        }
      });
    }
    for (var i = 0; i < following.length; i++) {
      var onlineURL = 'https://api.twitch.tv/kraken/streams/' + following[i];
      $.getJSON(onlineURL, function(data4) {
        var logo = data4.stream.channel.logo;
        var name = data4.stream.channel.display_name;
        var status = data4.stream.channel.status;
        var videoUrl = data4.stream.channel.url;        
        
        if(logo===null) {
          logo = 'https://s-media-cache-ak0.pinimg.com/originals/12/09/84/1209840357bac53bac0750a162025769.gif';
        }
        
        $('#followerInfo').prepend("<div class='panel panel-body'>" + "<div id='logo' class='col-md-4 text-center'>" + "<img id='logoImg' src='" + logo + "'>" + "</div>" + "<h2 id='name' class='col-md-4 text-center'>" + name + "</h2>" + "<a href='" + videoUrl + "' target='blank'>" + "<h2 id='status' class='col-md-4 text-center'><span class='on'>" + status + "</span>" + "</h2>" + "</a>" + "</div>");
      });
    }
  });
});