import { songContent, audioSrc, imageSrc, list } from './global.js';

import AudioFrames from './frames.js';

	// ==== Controls Class ====
	const Controls = class extends AudioFrames{
		constructor(media, index, icon){
			super(media); //add to Audio frames class
			this._sourceIndex = index;
			this._iconVar = icon;
		}

		set setSongList(collection){
			this._songList = collection;
		}

		set setSourceIndex(val){
			this._sourceIndex = val;
		}

		static setValueTime (number) {
			return (number < 10) ? `0${number}` : number;
		}

		static changueImage (image) {
			imageSrc.src = `assets/images/${image}`; 
		}

		#setIconDelay(first, second){
			this._iconVar.classList.replace(second, first);
			setTimeout(() => this._iconVar.classList.replace(first, second), 150);
		}

		songActive({audioSrc, srcDuration}){
			this._sourceMedia = audioSrc;
			this._sourceMediaDuration = srcDuration;
			this.playSong()
		}
		
		songActiveBox(index){
			this._songList.forEach( (ele) => {
				ele.classList.remove('active');
				ele.children[1].firstElementChild.lastElementChild.textContent = '';
			});

			let minDuration = Math.trunc(this._sourceMediaDuration / 60),
				secDuration = Math.trunc(this._sourceMediaDuration % 60);
			
			this._songList[index].classList.add('active');
			this._songList[index].querySelector('#duration').textContent = 
			`${Controls.setValueTime(minDuration)}:${Controls.setValueTime(secDuration)}`;
			
			Controls.changueImage(list[index].img);
		}

		playSong(){
			this._sourceMedia.play();				

			this.#setIconDelay('bx-play','bx-pause'); 

			this._sourceMedia.addEventListener('timeupdate', () => {
				this._mediaMinutes = Math.trunc(this._sourceMedia.currentTime / 60);
				this._mediaSeconds = Math.trunc(this._sourceMedia.currentTime % 60);

				songContent[2].textContent = `${Controls.setValueTime(this._mediaMinutes)}:${Controls.setValueTime(this._mediaSeconds)}`;
				
				this.barAnimation(this._sourceMedia.currentTime); //val bar

				if(this._sourceMedia.currentTime == this._sourceMedia.duration) 
					return this.pauseSong();
			});

			this.audioContext();
		}
		pauseSong(){
			this._sourceMedia.pause();
			this.#setIconDelay('bx-pause','bx-play'); 
		}
		previousSong(){
			if(!this._sourceIndex) return;

				Song.setSong(list[this._sourceIndex-1])
					.then((res) => {
						this.songActive(res);
						this.songActiveBox(this._sourceIndex - 1);
						this._sourceIndex--;
					} );
		}
		nextSong(){
			if (this._sourceIndex === (list.length-1)) return;

				Song.setSong(list[this._sourceIndex+1])
					.then((res) => {
						this.songActive(res); 
						this.songActiveBox(this._sourceIndex + 1);
						this._sourceIndex++;
					});				
		}
	}

	class Song {
		get songBox(){
			return `<div class="song__box">
						<i class='song__box--icon bx bx-music bx-md'></i>
						<div class="song__box--text">
							<div>
								<h4>${this.name}</h4>
								<b id="duration"></b>
							</div>
							<p class="text--truncate">${this.text}</p>
						</div>
					</div>`;
		}
		set songIn({name, text}) {
			this.name = name;
			this.text = text;
		}

		static setSongPromise() {
			return new Promise( (resolve) => {
				audioSrc.addEventListener('loadeddata', (e) => {
					return resolve({audioSrc, srcDuration: Math.trunc(audioSrc.duration)});
				});
			});
		}

		static setSong({name, text, src}){
			audioSrc.src = `assets/audio/${src}`;
			songContent[0].textContent = name;
			songContent[1].textContent = text;

			return Song.setSongPromise();
		}
	}

export { Song, Controls}

