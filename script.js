var videoContainer = $("#video-container");
var playButton = $("#play-button");
var video = $("#video");

videoContainer.mousemove(function (event) {
	var containerRect = videoContainer[0].getBoundingClientRect();
	var mouseX = event.clientX - containerRect.left;
	var mouseY = event.clientY - containerRect.top;

	var buttonWidth = playButton.outerWidth();
	var buttonHeight = playButton.outerHeight();
	var buttonX = mouseX - buttonWidth / 2;
	var buttonY = mouseY - buttonHeight / 2;

	var maxButtonX = containerRect.width - buttonWidth;
	var maxButtonY = containerRect.height - buttonHeight;
	playButton.css("left", Math.min(Math.max(buttonX, 0), maxButtonX) + "px");
	playButton.css("top", Math.min(Math.max(buttonY, 0), maxButtonY) + "px");
});

videoContainer.mouseleave(function () {
	setTimeout(function () {
		playButton.css({
			left: "50%",
			top: "50%",
			transform: "translate(-50%, -50%) scale(1)",
			transition: "all 0.3s ease-out"
		});
	}, 50);
});

videoContainer.mouseover(function () {
	playButton.css({
		transition: "transform ease-out 0.3s",
		transform: "scale(1.2)"
	});
});

videoContainer.mouseenter(function () {
	if (!video[0].paused) {
		playButton.css("opacity", "1");
	}
});

videoContainer.mouseleave(function () {
	if (!video[0].paused) {
		playButton.css({
			opacity: "1",
			transition: "opacity ease 1s"
		});
	}
});

videoContainer.click(function () {
	if (video[0].paused) {
		video[0].play();
		playButton.html(
			'<span class="pause-icon"><i class="fa fa-solid fa-pause"></i></span>'
		);
	} else {
		video[0].pause();
		playButton.html(
			'<span class="play-icon"><i class="fa fa-solid fa-play"></i></span>'
		);
	}
});

video.on("ended", function () {
	playButton.html(
		'<span class="play-icon"><i class="fa fa-solid fa-play"></i></span>'
	);
	playButton.css("opacity", "1");
});

// END OF MAIN PART FOR THE VIDEO AND PLAY BUTTON

// Optional - Code for inputting video
var videoSource = $("#video-source");
var videoUrl = $("#video-url");
var loadButton = $("#load-button");

function loadVideo() {
	var url = videoUrl.val().trim();
	if (!url) return;
	videoSource.attr("src", url);
	video[0].load();
	video[0].play();
}

loadButton.click(function () {
	loadVideo();
	video[0].play();
	playButton.html(
		'<span class="pause-icon"><i class="fa fa-solid fa-pause"></i></span>'
	);
	playButton.css({
		opacity: "0",
		transition: "opacity ease 1s"
	});
});

Fancybox.bind('[data-fancybox="video"]', {
	//
});