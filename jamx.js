/**
* Adds a "stalkDICE"-area in your com-center.
*
* @author Pun1a
* @version 1.0
* @date 03.07.2012

* @url http://www.pun1a.net

* Licensed under CC BY-NC-ND 3.0
* Link: http://creativecommons.org/licenses/by-nc-nd/3.0/deed.de
*/
function stalkDICE_refresh() {
	$(".diceEmployee").remove();
	$("#comcenter-dice-separator").remove();

	handler();
}
function stalkDICE_start(){
	$(".comcenter-add-friend").before('<li id="comcenter-dice-separator" class="comcenter-separator"><div class="base-left"> Jamx <img src="http://www.pun1a.net/bblog_plugins/refresh.png" onclick="stalkDICE_refresh()" style="cursor:pointer;"/></div></li>');
	$.get("http://battlelog.battlefield.com/bf3/de/soldier/jamx23/stats/355318254/",function(html){
		var dicePlayer = $(html).find("a.base-avatar-status-overlay-playing"),
        count = dicePlayer.length;
		$(dicePlayer).each(function() {
			var playerName,
				playerID,
				profileLink,
				gravatarImg,
				playing,
				serverName,
				serverLink,
				postCheckSum,
				game,
				friendPersonaId,
				guid;
			
			jQuery.ajaxSetup({async:false});
			
			playerName = $(this).attr("href");
			profileLink = "http://battlelog.battlefield.com"+$(this).attr("href");
			$.get(profileLink, function(html_code) {
				playerName = $(".profile-username-eaid", html_code).text();
				playerID = $(".base-avatar-container", html_code).attr("rel");
				gravatarImg = $("img.base-avatar-status-playing", html_code).attr("src");
				playing = true;
				
				serverName = $(".profile-view-status-info a", html_code).text();
				serverLink = $(".profile-view-status-info a", html_code).attr("href");
				
				postCheckSum = $("input[name=post-check-sum]", html_code).attr("value");
				game = $(".join-friend > input[name=game]", html_code).attr("value");
				friendPersonaId = $("input[name=friendPersonaId]", html_code).attr("value");
				guid = $("input[name=guid]", html_code).attr("value");
			});
			
			var playerhtml = '<surf:container id="comcenter-surface-friends_'+playerID+'" class="diceEmployee"><li id="comcenter-'+playerID+'" class="comcenter-friend-item comcenter-friend comcenter-friend-playing comcenter-friend-online ui-draggable" rel="'+playerID+'"><div class="comcenter-friend-draggable"></div><div class="comcenter-avatar"><div class="base-avatar-container base-avatar-size-small" rel="'+playerID+'"><div class="base-avatar-status-overlay base-avatar-status-overlay-playing"><img width="22" height="22" src="'+gravatarImg+'"></div></div></div><div class="comcenter-username"><a class="comcenter-username-link" data-profile="'+$(this).attr("href")+'">'+playerName+'</a><div class="comcenter-username-serverinfo"><div class="base-left"><span class="comcenter-full-height common-gameicon-hori bright common-game-2-1-exp comcenter-game-icon"></span><span class="comcenter-small-height common-gameicon-hori common-game-2-1-exp comcenter-game-icon"></span></div><div class="base-left"><span class="common-playing-link"><a class="common-playing-link base-no-ajax comcenter-playing-link" href="'+serverLink+'" title=""> '+serverName+' </a></span></div></div></div><div class="comcenter-interact-container"><form class="join-friend " action="'+serverLink+'" method="POST"><input type="hidden" value="'+postCheckSum+'" name="post-check-sum"><input type="hidden" value="'+game+'" name="game"><input type="hidden" value="'+friendPersonaId+'" name="friendPersonaId"><input type="hidden" value="'+guid+'" name="guid"><div class="bubble-title-left join-friend-submit-link comcenter-interact-playing" title="Join battle"></div></form></div></li></surf:container>';
			$("#comcenter-dice-separator").after(playerhtml);
			
		});
		jQuery.ajaxSetup({async:true});
		if($("#comcenter-online-separator").attr("class", "comcenter-separator showing-online")) {
			$("#comcenter-online-separator").delay(1000).click();
			$("#comcenter-online-separator").delay(1000).click();
		} else {
			$("#comcenter-online-separator").delay(1000).click();
		}
	});
}

$(document).ready(function() {
	stalkDICE_start();
	BBLog.bindDomChange(handler);
});

var handler = function() {
	var separator = $("html").find("#comcenter-dice-separator"),
		count = separator.length;
		
	if(count < 1) {
		stalkDICE_start();
	}
}
