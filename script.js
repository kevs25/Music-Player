const musicContainer = document.querySelector('.music-container')
const repeat = document.querySelector('#repeat');
const prev = document.querySelector('#prev');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');



//song titles
const songs= ['Bless the lord', 'Let Me Love You', 'venom']

//keep track of songs
let songIndex = 1

// Initially load songs into DOM
loadSong(songs[songIndex])
 
//update song detials
function loadSong(song) {
    title.innerText = song
    audio.src = `music player/${song}.mp3`
    cover.src =`images/${song}.png`
}
function Playsong() {
    musicContainer.classList.add('play')
    play.querySelector('i.fas').classList.remove('fa-play')
    play.querySelector('i.fas').classList.add('fa-pause')

    audio.play()

}

function Pausesong() {
    musicContainer.classList.remove('play')
    play.querySelector('i.fas').classList.add('fa-play')
    play.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()

}
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex=songs.length - 1
    }
    loadSong(songs[songIndex])
    Playsong()


}
function nextSong() {
    songIndex++
    if (songIndex > songs.length -1) {
        songIndex= 0
    }
    loadSong(songs[songIndex])
    Playsong()

}
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

}
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

 //Event listeners
 play.addEventListener('click',() => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        Pausesong()
    }
    else{
        Playsong()
    }

 })
//change song event

prev.addEventListener('click',prevSong)
next.addEventListener('click', nextSong)


audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)


audio.addEventListener('ended', nextSong)