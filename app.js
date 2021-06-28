import { btnTheme, notfound, findSong, songContent, audiobar, songList, songControls, list } from './modules/global.js';

import { Song, Controls } from './modules/extend.js';

'use strict';

((d) => {

	// ==== Render Songs ====
	const song = new Song();
	let controls;
	const renderWait = new Promise((resolve) => {
		list.forEach( (ele) => {
			song.songIn = ele;
			songList.insertAdjacentHTML('beforeend', song.songBox);			
		});
		resolve(songList.children);
	});
	let songBoxes;
	renderWait.then( (res) => {
		songBoxes =  Array.from(res);
		Song.setSong(list[0]).then( (res) => {
			controls = new Controls(res, 0, songControls.children[1]);
			controls.setSongList = songBoxes;
			controls.songActiveBox(0);
		});
		
		songBoxes.forEach( (ele, idx) => {
			ele.onclick = () => {
				// resolve promise
				Song.setSong(list[idx]).then((res) => {
					controls.setSourceIndex = idx;
					controls.songActive(res);
					controls.songActiveBox(idx);

				}).catch((err) => err);
			};
		});
	}, (err) => console.error(err.status));


	// ==== Controls buttons ====
	songControls.addEventListener('click', (e) => {
		const classControls = e.target.classList; 

		if (classControls.contains('btn__control')){
			let foundControl, foundedPart;			
			
			for (let val of classControls.values()) {
				if( ['bx-skip-previous','bx-play','bx-pause','bx-skip-next'].includes(val)){ 
					foundControl = val.split('-');
					break;
				}
			}
			foundedPart = foundControl[foundControl.length - 1];
			controls[`${foundedPart}Song`](); // Controls function
		}
	});
	audiobar.addEventListener('input', () => controls.setTimeSong(audiobar.value));
	
	// ==== Search Song ==== 
	findSong.addEventListener('input', (e) => {

		let val = (e.target.value).toLowerCase().trim();
		let full = 0;

		list.filter( ( {text}, idx ) => {
			if (text.toLowerCase().includes(val)) {
				songBoxes[idx].classList.remove('d--none');
				songBoxes[idx].classList.add('d--block');
			}else{
				songBoxes[idx].classList.remove('d--block');
				songBoxes[idx].classList.add('d--none');
				full++; //up to full
			}
		});
		// empty
		if (list.length === full) songList.appendChild(notfound);
		else if (songList.lastElementChild.classList.contains('not__found')) {
			songList.removeChild(songList.lastElementChild);
		}
	});

	// ==== Dark Theme ====
	const theme = {
		setDark(icon){
			icon.classList.replace('bx-moon','bx-sun');
			d.body.classList.add('dark__theme');
			localStorage.setItem('audio__theme', 'mi panaaa');
		},
		setLight(icon){
			icon.classList.replace('bx-sun','bx-moon');
			d.body.classList.remove('dark__theme');
			localStorage.clear();
		}
	}
	const icon = btnTheme.firstElementChild;

	if(!localStorage.getItem('audio__theme')) theme.setLight(icon);
	else theme.setDark(icon);

	btnTheme.onclick = (e) => {
		let ic = e.target;
		if (ic.classList.contains('bx-moon')) theme.setDark(ic);
		else theme.setLight(ic);
	};
})(document);