var startTime = 220;
var timeLeft = startTime;
var intervalId = null;

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

$(function() {
	$('#btn_stop').on('click', function() {
		stop();
	});

	$('#btn_start').on('click', function() {
		start();
	});

	$('#btn_reset').on('click', function() {
		reset();
	});

	$('#btn_add-time').on('click', function() {
		addTime();
	});

	$('#btn_options').on('click', function() {
		$('#options-modal').modal('show');
	});

	$('#btn_options-save').on('click', function() {
		startTime = $('#start-value').val();
		save();
		update();
		$('#options-modal').modal('hide');
	});

	$('#btn_options-reset').on('click', function() {
		startTime = 250;
		save();
		update();
	});

	document.body.onkeyup = function(e) {
		if(e.keyCode == 32) {
			addTime();
		}
	}

	let startVal = getCookie('yugioh-timer-default-value');

	if((startVal + '').length > 0) {
		try {
			let svInt = parseInt(startVal);
			if(isNaN(startVal)) {
				console.warn('Startval ' + startVal + ' is not a number');
			} else {
				startTime = svInt;
				timeLeft = startTime;
			}
		} catch(e) {
			console.warn(e);
		}
	}

	update();
});

function save() {
	setCookie('yugioh-timer-default-value', '' + startTime, 1337);
}

function update() {
	$('#start-value').val(startTime);
	$('#time').text(timeLeft);
	if(timeLeft <= 0) {
		$('#time').addClass('text-danger');
	} else {
		$('#time').removeClass('text-danger');
	}
}

function reset() {
	stop();
	timeLeft = startTime;
	update();
}

function addTime() {
	timeLeft+=5;
	update();
}

function stop() {
	if(intervalId != null) {
		clearInterval(intervalId);
		intervalId = null;
	}
	update();
}

function start() {
	if(intervalId == null) {
		intervalId = setInterval(function() {
			if(timeLeft <= 0) {
				stop();
			} else {
				timeLeft--;
			}
			update();
		}, 1000);
	}
}