var gameHasStarted = false;
var interval;

function randomiseCards() {
	var cardContainerArray = $('.cardContainer').toArray();

	while (cardContainerArray.length > 0) {
		var idx = Math.floor(Math.random() * (cardContainerArray.length - 1));
		var element = cardContainerArray.splice(idx, 1);
		$('#cardsContainer').append(element[0]);
	}
}

randomiseCards();

$('.cardFront').on('click', function () {
	if (gameHasStarted === false) {
		gameHasStarted = true;
		startTimer();
		//play game music
	}

	$(this).parent().addClass('flipped');

	let currentFlippedCards = $('.cardContainer.flipped');
	if (currentFlippedCards.length == 2) {
		if (
			$(currentFlippedCards[0]).attr('data-id') ===
			$(currentFlippedCards[1]).attr('data-id')
		) {
			//play win music
			currentFlippedCards.fadeTo(500, 0, function () {
				$(this).css('visibility', 'hidden');
			});

			let numberOfCardsLeft = $('.cardContainer:visible').length - 2;
			if (numberOfCardsLeft === 0) {
				handleGameOver();
			}
		}
		$('.cardContainer.flipped').removeClass('flipped');
	}
});

function startTimer() {
	let seconds = parseInt($('#timer p').text());

	interval = setInterval(function () {
		seconds--;

		if (seconds === 0) {
			clearInterval(interval);
			handleGameOver();
		}

		seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

		$('#timer p').text(seconds);
	}, 1000);
}

function handleGameOver() {
	let timer = parseInt($('#timer p').text());

	let numberOfCardsLeft = $('.cardContainer:visible').length;

	if (timer > 0 && numberOfCardsLeft === 0) {
		$('#won').show();
		return;
	} else {
		$('#lost').show();
	}

	clearInterval(interval);
}

$('#titleSection > p').on('click', function () {
	$('#rules').show();
});

$('#settingsButton').on('click', function () {
	$('.overlay#settings').show();
});

$('#editTime').on('click', function () {
	let inputValue = $('.overlay#settings input').val();
	if (inputValue.length !== 0) {
		$('#titleSection #timer p').text(inputValue);

		$('.overlay#settings').hide();
	}
});
