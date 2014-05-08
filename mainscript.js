//ждем 6 именно таких каналов
var  channels = new Array ('radiolla', 'volta', 'equalyza', 'jiraffe', 'mantra', 'ilma');

//под них обозначим табы
for (var i = 0; i < channels.length; i++){
	document.getElementById('radioChannelsTabs').innerHTML += 
	'<li><a href="#slide-' + i + '"><span>' + channels[i] + '</span></a></li>';
//а также место под содержимое
	document.getElementsByClassName('slides-container')[0].innerHTML += 
    '<div class="slide" id="slide-' + i + '"></div>';
}

var sse = new SSE('http://radiolla.com/sse');
		sse.on({});
console.log(sse.on({}));
