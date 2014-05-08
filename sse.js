// server-sent events
var SSE = function(url) {
	
	this.EventSource = null;
	this.on = function(on) {
		this.onFail = on ? on['fail'] : null;
		this.onOpen = on ? on['open'] : null;
		this.onError = on ? on['error'] : null;
		this.onStatus = on ? on['status'] : null;
		this.onPulse = on ? on['pulse'] : null;
		this.onUpdate = on ? on['update'] : null;
		this.onAlert = on ? on['alert'] : null;
		this.onLink = on ? on['link'] : null;
		this.onMessage = on ? on['message'] : null;
		if (!!window.EventSource) {
			this.EventSource = new EventSource(url);
			
			// unnamed event handler
			this.EventSource.addEventListener('message', function(e) {
				if (window.console && console.log) console.log('SSE message ' + Date());

				// callback
				if (typeof self.onMessage == 'function') {
					self.onMessage.call(self.EventSource, e);
				}
			}, false);
//---------------------------------------
			// named event handler
			//console.log(this);
			this.EventSource.addEventListener('status', function(e) {
				//if (window.console && console.log) console.log('SSE status ' + Date());
				var data = JSON.parse(e.data);	//получаем объект data		

				for (var i = 0; i < channels.length; i++){	//какой станции соответствует объект?
					if (data.channel == channels[i]){		//ага, вот этой
						var props = Object.getOwnPropertyNames(data);
						//выведем данные
						document.getElementById('slide-' + i).innerHTML = 	//тут название
			    		'<div class="centered" ><h1>' + data.channel + '</h1><div id="data-' + i + '"></div>'
			    		//а дальше - все остальное
						for (var j = 0; j < Object.getOwnPropertyNames(data).length; j++){
							document.getElementById('data-' + i).innerHTML += 
			    			'<div class="row"><div class="propName">' + Object.getOwnPropertyNames(data)[j] + '</div><div class="propData">' + data[props[j]] + '</div><div class="clean"></div></div>';
			    			//закрасим четные строки
			    			if (j % 2 == 0){
			    				document.getElementById('data-' + i).childNodes.item(j).style.background = '#F5D8B8';
			    			}
						}
			    		//если все просмотрено, то 
					} else {
						
					}
				}

				//document.getElementById('slide-0').innerHTML += data.channel + "<br>";
//				console.log(data);
				// callback
/*				if (typeof self.onStatus == 'function') {
					self.onStatus.call(self.EventSource, e);
				}
*/			}, false);
//----------------------------------------			
			// open event
			this.EventSource.addEventListener('open', function(e) {
				/*if (window.console && console.log) console.log('SSE opened ' + Date());*/
				// callback
				if (typeof self.onOpen == 'function') {
					self.onOpen.call(self.EventSource, e);
				}
			}, false);
			
			// error (close) event
			this.EventSource.addEventListener('error', function(e) {
/*				if (e.readyState == EventSource.CLOSED) {
					if (window.console && console.log) console.log('SSE closed ' + Date());
				}*/
				// callback
				if (typeof self.onError == 'function') {
					self.onError.call(self.EventSource, e);
				}
			}, false);
			
			// heartbeat
			this.EventSource.addEventListener('pulse', function(e) {
				//if (window.console && console.log) console.log('SSE pulse ' + Date());
				// callback
				if (typeof self.onPulse == 'function') {
					self.onPulse.call(self.EventSource, e);
				}
			}, false);
			
			// update
			this.EventSource.addEventListener('update', function(e) {
				//if (window.console && console.log) console.log('SSE update ' + Date());
				// callback
				if (typeof self.onUpdate == 'function') {
					self.onUpdate.call(self.EventSource, e);
				}
			}, false);
			
			// alert
			this.EventSource.addEventListener('alert', function(e) {
				//if (window.console && console.log) console.log('SSE alert ' + Date());
				// callback
				if (typeof self.onAlert == 'function') {
					self.onAlert.call(self.EventSource, e);
				}
			}, false);
			
			// link
			this.EventSource.addEventListener('link', function(e) {
				//if (window.console && console.log) console.log('SSE link ' + Date());
				// callback
				if (typeof self.onLink == 'function') {
					self.onLink.call(self.EventSource, e);
				}
			}, false);
		}
		else {
			// callback
			console.log("else");
			if (typeof self.onFail == 'function') {
				self.onFail.call(self.EventSource);
			}
		}
		return this.EventSource;
	};
	this.on;
};

