function onReady(){
	$("input[name='language']").change(function(e){
		changeLang(e.target.value);	
	});
	changeLang($("input[name='language']:checked").val());
}

function changeLang(lang){
	console.log('changing language to ' , lang);
	$("body *[lang='"+lang+"']").css("display","block");
	$("body *[lang]:not([lang='"+lang+"'])").css('display','none');
}

$(document).ready(onReady);