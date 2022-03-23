var gameHasStarted = false,
	backgroundMusic = new Audio('audio/backgroundMusic.mp3'),
	victoryMusic = new Audio('audio/victoryMusic.mp3'),
	failureMusic = new Audio('audio/failureMusic.mp3'),
	numberOfCards = 16,
	musicOn = true,
	interval,
	firstFlippedCard,
	secondFlippedCard,
	initialTimeInSeconds;

function randomiseCards() {
	var cardContainerArray = $('.cardContainer').toArray();

	while (cardContainerArray.length > 0) {
		var idx = Math.floor(Math.random() * (cardContainerArray.length - 1));
		var element = cardContainerArray.splice(idx, 1);

		if ($(element).hasClass('flipped')) {
			$(element).removeClass('flipped');
		}
		$(element).find('.cardBack').attr('style', '');

		$('#cardsContainer').append(element[0]);
	}
}

randomiseCards();

$('.cardBack').on('click', function () {
	if ($('.overlay').is(':visible')) {
		$('.overlay:visible').addClass('shake');
		setTimeout(function () {
			$('.overlay:visible').removeClass('shake');
		}, 1000);
		return;
	}

	if (gameHasStarted === false) {
		initialTimeInSeconds = $('#timer p').text();
		gameHasStarted = true;
		startTimer();
	}

	let currentFlippedCards = $('.cardContainer.flipped');

	if (currentFlippedCards.length <= 1) {
		$(this).parent().addClass('flipped');
	}

	if (currentFlippedCards.length == 0) {
		firstFlippedCard = $(this);
	} else if (currentFlippedCards.length == 1) {
		secondFlippedCard = $(this);

		setTimeout(() => {
			firstFlippedCard.parent().removeClass('flipped');
			secondFlippedCard.parent().removeClass('flipped');
		}, 800);

		if (
			firstFlippedCard.parent().attr('data-id') ===
			secondFlippedCard.parent().attr('data-id')
		) {
			numberOfCards = numberOfCards - 2;

			if (numberOfCards === 0) {
				handleGameOver();
			}

			firstFlippedCard.fadeTo(500, 0, function () {
				$(this).css('visibility', 'hidden');
			});
			secondFlippedCard.fadeTo(500, 0, function () {
				$(this).css('visibility', 'hidden');
			});
		}
	}
});

function startTimer() {
	musicOn ? backgroundMusic.play() : null;
	let seconds = parseInt($('#timer p').text());

	interval = setInterval(function () {
		seconds--;

		seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

		$('#timer p').text(seconds);

		if ($('#timer p').text() === '00') {
			handleGameOver();
			clearInterval(interval);
		}
	}, 1000);
}

function handleGameOver() {
	gameHasStarted = false;

	if (backgroundMusic.paused === false) {
		backgroundMusic.pause();
		backgroundMusic.currentTime = 0;
	}

	let secondsLeftInGame = parseInt($('#timer p').text());

	clearInterval(interval);

	if (secondsLeftInGame >= 0 && numberOfCards === 0) {
		musicOn ? victoryMusic.play() : null;
		$('#won').show();
	} else {
		musicOn ? failureMusic.play() : null;
		$('#lost').show();
	}

	numberOfCards = 16;
}

$('#titleSection > p').on('click', function () {
	$('#rules').show();
});

$('#settingsButton').on('click', function () {
	$('.overlay:visible').hide();
	clearInterval(interval);
	$('.overlay#settings').show();
});

$('#editTime').on('click', function () {
	let inputValue = $('.overlay#settings input').val();

	if (inputValue.length !== 0) {
		$('#titleSection #timer p').text(inputValue);

		$('.overlay#settings').hide();

		randomiseCards();
	}
});

$('.closeButton').on('click', function () {
	$('.cardContainer.flipped').removeClass('flipped');
	if ($(this).parent().attr('id') == 'settings') {
		if (gameHasStarted) {
			startTimer();
		} else {
			if (initialTimeInSeconds != undefined) {
				$('#timer p').text(initialTimeInSeconds);
			}
			randomiseCards();
		}
	} else {
		randomiseCards();
		$('#timer p').text(initialTimeInSeconds);
	}
	$('.overlay:visible').hide();
});

$('#volumeOn').on('click', function () {
	$(this).hide();
	$('#volumeOff').show();
	musicOn = false;

	if (backgroundMusic.paused === false) {
		backgroundMusic.pause();
		backgroundMusic.currentTime = 0;
	}
});

$('#volumeOff').on('click', function () {
	$(this).hide();
	$('#volumeOn').show();
	musicOn = true;

	if (backgroundMusic.paused && gameHasStarted) {
		backgroundMusic.play();
	}
});

backgroundMusic.addEventListener('ended', function () {
	if (gameHasStarted) {
		backgroundMusic.play();
	}
});
