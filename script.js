const musicContainer = document.querySelector('.music-container')
const repeat = document.querySelector('#repeat');
const prev = document.querySelector('#prev');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const trackCurrentTime = document.querySelector('#current-time');
const trackDurationTime = document.querySelector('#duration-time');
const authorName = document.querySelector('#author');

//song titles
// const songs= ['Bless the lord', 'Let Me Love You', 'venom']
const data = [
    {
        "title":"Bless the lord",
        "author":"Matt Redman",
        "songName": "Bless the lord",
        "cover":"Bless the lord"
    },
    {
        "title":"Let Me Love You",
        "author":"Justin Bieber",
        "songName": "Let Me Love You",
        "cover":"Let Me Love You"
    },
    {
        "title":"venom",
        "author":"Matt Redman",
        "songName": "venom",
        "cover":"venom"
    }
]
// const authors = ['Matt Redman', 'Justin Bieber', 'Eminem']



//keep track of songs
let songIndex = 0

let index = 0
// Initially load songs into DOM
loadSong(data[songIndex])
// loadSong(data[index])
//update song detials
function loadSong(song) {
    console.log(song)
    title.innerText = song.title
    authorName.innerHTML = song.author
    audio.src = `music player/${song.songName}.mp3`
    cover.src =`images/${song.cover}.png`
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
        songIndex=data.length - 1
        
    }
    loadSong(data[songIndex])
    Playsong()


}
function nextSong() {
    songIndex++
    if (songIndex > data.length -1) {
        songIndex= 0
        
    }
    loadSong(data[songIndex])
    Playsong()

}
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

    
    }

function changeSongTimer(){
    if (audio.duration) {
        let curmins = Math.floor(audio.currentTime / 60);
        let cursecs = Math.floor(audio.currentTime - curmins * 60);
        let durmins = Math.floor(audio.duration / 60);
        let dursecs = Math.floor(audio.duration - durmins * 60);
    
        if (dursecs < 10) {
          dursecs = "0" + dursecs;
        }
        if (durmins < 10) {
          durmins = "0" + durmins;
        }
        if (curmins < 10) {
          curmins = "0" + curmins;
        }
        if (cursecs < 10) {
          cursecs = "0" + cursecs;
        }
        trackCurrentTime.innerHTML = curmins + ":" + cursecs;
        trackDurationTime.innerHTML = durmins + ":" + dursecs;
      } 
      else {
        trackCurrentTime.innerHTML = "00" + ":" + "00";
        trackDurationTime.innerHTML = "00" + ":" + "00";
      }
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
audio.addEventListener('timeupdate', changeSongTimer)

progressContainer.addEventListener('click', setProgress)


audio.addEventListener('ended', nextSong)