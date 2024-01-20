// Intialize the variable
let index = 0;
let rotation;
let angle = 0;
let audioElement = new Audio('music/Justin-Bieber-Intentions.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songpic = document.getElementById('songpic');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Justin Bieber Intentions", filepath: "music/Justin-Bieber-Intentions.mp3", coverPath: "covers/5.jpg", durationTime: "03:44" },
    { songName: "Pitbull International Love ft Chris Brown", filepath: "music/Pitbull -International-Love-ft-Chris-Brown.mp3", coverPath: "covers/4.jpg", durationTime: "04:08" },
    { songName: "Post Malone Sunflower", filepath: "music/Post Malone-Sunflower.mp3", coverPath: "covers/6.jpg", durationTime: "02:21" },
    { songName: "The Weeknd Blinding Lights", filepath: "music/The-Weeknd-Blinding-Lights.mp3", coverPath: "covers/2.jpg", durationTime: "03:20" },
    { songName: "The Weeknd Save Your Tears", filepath: "music/The-Weeknd-Save-Your-Tears.mp3", coverPath: "covers/1.jpg", durationTime: "03:35" },
    { songName: "The Weeknd Starboy ft Daft Punk", filepath: "music/The-Weeknd-Starboy-ft-Daft-Punk-Official.mp3", coverPath: "covers/3.jpg", durationTime: "04:33" },
]


songItems.forEach((element, i) => {
    const imgElement = element.querySelector('img');
    const songNameElement = element.querySelector('.songName');
    const timestampElement = element.querySelector('.timestamp');

    imgElement.src = songs[i].coverPath;
    songNameElement.innerHTML = songs[i].songName;
    timestampElement.innerHTML = songs[i].durationTime;
});

//audioElement.play();


function rotating() {
    rotation = setInterval(() => {
        angle = angle + 2;
        songpic.style.transform = `rotate(${angle}deg)`;
    }, 100);
}

// Handle play/pause click
masterPlay.addEventListener('click', playing);

function playing() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterSongName.innerText = songs[index].songName;
        // masterPlay.classList.remove('fa-play');
        // masterPlay.classList.add('fa-pause');
        masterPlay.src = "images/pause.png";
        document.getElementsByClassName('songItemPlay')[index].src = "images/pause.png"
        rotating();
        // console.log(angle);
        // songpic.style.transform = `rotate(${angle}deg)`;
        // Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        //     element = document.getElementsByClassName('songitem')[index];
        //     element.classList.remove('fa-play');
        //     element.classList.add('fa-pause');
        // })
        // gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.src = "images/play.png";
        makeAllPlays();
        clearInterval(rotating);
        songpic.style.transform = `rotate(0deg)`;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.add('fa-play');
            element.classList.remove('fa-pause');
        })
        // gif.style.opacity = 0;
    }
}

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // Upadate seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    var s = parseInt(audioElement.currentTime % 60);
    var m = parseInt((audioElement.currentTime / 60) % 60);
    s = String(s).padStart(2, '0');
    m = String(m).padStart(2, '0');
    document.getElementById('current').innerHTML = `${m}:${s}`;

    if (progress === 100) {
        next();
    }
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration
        / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
       element.src = "images/play.png"
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = parseInt(e.target.id);

        if (audioElement.played || audioElement.currentTime != 0) {
            makeAllPlays();
            masterSongName.innerText = songs[index].songName;
            e.target.src = "images/pause.png";
            audioElement.src = songs[index].filepath;
            songpic.src = songs[index].coverPath;
            document.getElementById('length').innerHTML = songs[index].durationTime;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.src = "images/pause.png";
        } else if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.pause();
            masterPlay.src = "images/play.png";
            e.target.src = "images/play.png";
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
                element.classList.add('fa-play');
                element.classList.remove('fa-pause');
            })
        } else {
            console.log("Some issue occurred");
        }
    });
});


document.getElementById('next').addEventListener('click', next);

document.getElementById('previous').addEventListener('click', previous);

function next() {
    index = (index + 1) % songs.length; // Use modulo to loop back to the first song when reaching the end
    loadAndPlaySong();
}

function loadAndPlaySong() {
    audioElement.src = songs[index].filepath;
    masterSongName.innerText = songs[index].songName;
    songpic.src = songs[index].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.src = "images/play.png";
    });
    document.getElementsByClassName('songItemPlay')[index].src = "images/pause.png";
    document.getElementById('length').innerHTML = songs[index].durationTime;
    masterPlay.src = "images/pause.png";
}



function previous() {
    index = (index - 1 + songs.length) % songs.length;
    loadAndPlaySong();
}

function loadAndPlaySong() {
    audioElement.src = songs[index].filepath;
    masterSongName.innerText = songs[index].songName;
    songpic.src = songs[index].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.src = "images/play.png";
    });
    document.getElementsByClassName('songItemPlay')[index].src = "images/pause.png";
    document.getElementById('length').innerHTML = songs[index].durationTime;
    masterPlay.src = "images/pause.png";
}




