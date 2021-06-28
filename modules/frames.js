import { audiobar, canvasCTX } from './global.js';

// ==== AudioFrames Class ====
export default class {
	_canvasCTX = canvasCTX.getContext('2d');
	_canvasH = canvasCTX.height;
	_canvasW = canvasCTX.width;
	_x = 0;

	_context = window.AudioContext || window.webkitAudioContext;
	
	constructor({audioSrc, srcDuration}){
		this._sourceMedia = audioSrc;
		this._sourceMediaDuration = srcDuration;
	}
	
	barAnimation (curr) {
		audiobar.value = Math.trunc((curr / this._sourceMediaDuration) * 100);
	}

	setTimeSong(val){
		this._sourceMedia.currentTime = val * this._sourceMediaDuration / 100; 
	}

	audioContext(){
		//Context
		if (this._analyserCTX) return; //lol jajajajaja el contexto alv

		this._audioCTX = new this._context;
		this._analyserCTX = new AnalyserNode(this._audioCTX, {fftSize: 4096 });
		this._bufferLenght = this._analyserCTX.frequencyBinCount;

		if (!this._mediaCTX) {
			this._mediaCTX = new MediaElementAudioSourceNode(this._audioCTX, { mediaElement: this._sourceMedia});
		}
			this._mediaCTX.connect(this._analyserCTX);
			this._analyserCTX.connect(this._audioCTX.destination);

			// Must be a power of 2 between 2^5 and 2^15, so one of: 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, and 32768. Defaults to 2048.
			this._mediaArray = new Uint8Array(this._bufferLenght);

		this.#canvasAnimation();
	}

	#canvasAnimation(){

		let x = 0;
		const drawBarsCanvas = () => {
			requestAnimationFrame(drawBarsCanvas);

			this._analyserCTX.getByteFrequencyData(this._mediaArray);
	
	      	this._canvasCTX.clearRect(0, 0, this._canvasW, this._canvasH);
			
			this._barWIDTH = (this._canvasW / this._bufferLenght) * 5; //2.5
			this._barHEIGHT;
			let x = 0;

			for(let i = 0; i < this._bufferLenght; i++) {
		       	this._barHEIGHT = this._mediaArray[i] / 1.8;

		        this._canvasCTX.fillStyle = 'rgb(' + (this._barHEIGHT + 100) + ',50,50)';
		        // this._canvasCTX.fillStyle = 'rgb(200, 50, 0)';
		        this._canvasCTX.fillRect(x, this._canvasH - this._barHEIGHT / 2, this._barWIDTH, this._barHEIGHT / 2);

		        x += this._barWIDTH + 1;
		      }
		};

		drawBarsCanvas();
	}

}