const DEFAULT = [1,30,8];
const AUDIO_NAME = ['1.mp3','2.mp3','3.mp3','4.mp3','5.mp3','6.mp3','7.mp3','8.mp3'];

let getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min;


let inintRandomness =  (min, max, time) => {
	time = time * 1000;
	var numberDisplay = document.getElementById('number');
	let interval = 50;
	let currentWaitTime = 0;
	while (currentWaitTime < time - interval) {
		setTimeout (() => numberDisplay.innerHTML = getRndInteger(min, max), currentWaitTime);
		interval = interval * 1.1;
		currentWaitTime += interval;
	}

	setTimeout (() => numberDisplay.innerHTML = getRndInteger(min, max), time);
}

let getRandomInput = () => {
	let minEle = document.getElementById('random-min');
	let maxEle = document.getElementById('random-max');
	let timeEle = document.getElementById('random-time');

	let min = parseInt(minEle.value);
	let max = parseInt(maxEle.value);
	let time = parseInt(timeEle.value);

	if ( isNaN(min) ||  isNaN(max) || isNaN(time)){
		minEle.value = DEFAULT[0];
		maxEle.value = DEFAULT[1];
		timeEle.value = DEFAULT[2];
		return DEFAULT;
	}

	return [min, max, time];
}



document.addEventListener('DOMContentLoaded', (event) => {
	let startBtn = document.getElementById('start-random');
	startBtn.addEventListener("click", () => {
		startBtn.disabled = true;
		let randomParam = getRandomInput();
		inintRandomness.apply(null, randomParam);
		let track = AUDIO_NAME[getRndInteger(0,AUDIO_NAME.length-1)];
		try {
			let audio = new Audio('audio/' + track);
			audio.playbackRate = 1.1;
			audio.play();
			setTimeout(() => audio.pause(), randomParam[2] * 1000);
		} catch (e){
			console.log(track);
		}
		setTimeout (() => startBtn.disabled = false,  randomParam[2] * 1000); 

	});
})

