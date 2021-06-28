const d = document;

const not = d.createElement('p');
	  not.classList = 'not__found';
	  not.insertAdjacentHTML('afterbegin', "<b> <i class='bx bx-block'></i> Ooops no se encontraron resultados. </b>");

const elementsApp = {
	songContent : d.querySelectorAll('#songRender'),
	imageSrc : d.querySelector('.image__render'),
	audioSrc : d.getElementById('audio'),
	notfound : not,
	findSong : d.getElementById('find'),
	audiobar : d.getElementById('audio-bar'),
	songList : d.querySelector('.songs__list'),
	songControls : d.querySelector('.song__controls--group'),
	canvasCTX : d.querySelector('.canvas__render'),
	btnTheme :  d.querySelector('.btn__theme'),
	list : [
			{name:'Conro', src:'all-eyes-on-me.mp3', img:'all-eyes-on-me.jpg', text:'All Eyes On Me - Conro'},
			{name:'Blockheads', src:'cant-get-enough.mp3', img:'cant-get-enough.jpg', text:"Can't Get Enough - Blockheads Mix"},
			{name:'Conro', src:'thrill-of-it.mp3', img:'thrill-of-it.jpg', text:'Thrill Of It - Conro'},
			{name:'Bahjat', src:'hometown-smile.mp3', img:'hometown-smile.jpg', text:'Hometown Smile Bahjat Mix'},
			{name:'Royal Deluxe', src:'get-that-feeling.mp3', img:'get-that-feeling.jpg', text:'Get That Feeling - Royal Deluxe'},
			{name:'Oh The Larceny', src:'man-on-a-Mission.mp3', img:'man-on-a-mission.jpg', text:'Man on a mission - Oh the Larceny Mix'},
			{name:'The Vespids', src:'rob-from-texas.mp3', img:'rob-from-texas.jpg', text:'Rob From Texas - The Vespids'},
			{name:'Vicetone', src:'i-hear-you.mp3', img:'i-hear-you.jpg', text:'I Hear You - Vicetone'},
			{name:'Saint Chaos', src:'walk.mp3', img:'walk.jpg', text:'Walk Saint Chaos'}
		]
};

export const { notfound, songContent, audioSrc, audiobar, songList, songControls, canvasCTX, imageSrc, list, findSong, btnTheme } = elementsApp