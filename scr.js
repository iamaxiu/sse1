//ждем 6 именно таких каналов
var  channels = new Array ('radiolla', 'volta', 'equalyza', 'jiraffe', 'mantra', 'ilma');

//под них обозначим табы
for (var i = 0; i < channels.length; i++){
	document.getElementById('container').innerHTML += 
	'<div><input type="checkbox" id="' + channels[i] + '" /><label for="' + channels[i] + '"><div class="shortInfo"><h1>' + channels[i] + '</h1></div></label><div class="fullInfo"><div id="data-' + i + '"></div></div></div>'
}

var sse = new SSE('http://radiolla.com/sse');

var scroller = function(id){
	//document.getElementById(id).scrollIntoView();
	console.log(13);
}

sse.on({
	status: function(e) {
		var data = JSON.parse(e.data);
		for (var i = 0; i < channels.length; i++){	//какой станции соответствует объект?
			if (data.channel == channels[i]){		//ага, вот этой
				var props = Object.getOwnPropertyNames(data);
				//выведем данные
				document.getElementsByClassName('shortInfo')[i].innerHTML = 	//в заголовок 
	    		'<h1>' + data.channel + '</h1><p>' + data.listeners + ' people listen to <br>' + data.combinedTitle + '<br>which began at ' + Date(data.played) + '</p>'
	    		//а дальше - все остальное
				for (var j = 0; j < Object.getOwnPropertyNames(data).length; j++){
					document.getElementsByClassName('fullInfo')[i].innerHTML += 
	    			'<div class="row"><div class="propName">' + props[j] + '</div><div class="propData">' + data[props[j]] + '</div><div class="clean"></div></div>';
	    			//закрасим четные строки
	    			if (j % 2 == 0){
	    				document.getElementsByClassName('fullInfo')[i].childNodes.item(j).style.background = '#F5D8B8';
	    			}
				}
	    		//если все просмотрено, то 
			} else {
				//пока ничего
			}
		}
	}
});

//прокрутка при клике 
for (var i = 0; i<channels.length; i++){
	var element = document.getElementById(channels[i]);
		element.addEventListener('click', function() { console.log(this);
				this.scrollIntoView();
		 }, false);
}


