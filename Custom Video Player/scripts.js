/* 
    Name: Dhaval Thanki
    Date: 15/Aug/2020
    Title: media player thing
*/

/* get all necessary elements */

const player = document.querySelector('.player');   // base div of player
const video = player.querySelector('.viewer');    // one level in for viewer class
const progress = player.querySelector('.progress'); // empty progress bar
const progressBar = player.querySelector('.progress__filled'); // completed progress bar

const toggle = player.querySelector('.toggle'); // play/plause button
const skipButtons = player.querySelectorAll('[data-skip]'); // select data key values
const ranges = player.querySelectorAll('.player__slider'); // vol and video speed range slider

/* build out functionality */

function togglePlay() { // basic function to play a paused video
    const play_pause = (video.paused) ? video.play() : video.pause(); // same thing using ternarary operator
    /*    if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    */
}


function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚'; // 'this' refers to the toggle button in this case
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip); // add or subtract time of video using values set in data-skip (in html)
}

function handleRangeUpdate(){
    /*
        console.log(this.name); // context for why this.name is used
        console.log(this.value); // context for why this.name is used
    */
   video[this.name] = this.value; // update attribute values
}

function handleProgress(){
/* update the flex basis value in correspondance to % of video playback time that has elapsed */
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`; // update the styling on the html content
}

function scrub(e) {
    /* offsetX tells us where the click is on duration bar, divide by total width, get a % and apply it to video duration */
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;  // update current video time
}

/*hook up event listeners*/

video.addEventListener('click', togglePlay);    // click the video to pause it
video.addEventListener('play', updateButton);   // update the play/pause button using play as a trigger
video.addEventListener('pause', updateButton);   // update the play/pause button using play as a trigger
video.addEventListener('timeupdate', handleProgress);   // listen for time update event in order to update progressBar

toggle.addEventListener('click', togglePlay);   // click the button to pause the video
skipButtons.forEach(button => button.addEventListener('click', skip));  // check if either of the buttons were triggered

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); // listen for clicks to change values
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));    // listen for mouse moving over bar for more dynamic updating

progress.addEventListener('click', scrub);

let mousedown = false; // flag variable
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // trigger function scrub only if (boolean var) mousedown is true
progress.addEventListener('mousedown', () => mousedown = true); // set flag to true ONLY if user is clicking down
progress.addEventListener('mouseup', () => mousedown = false);  // reset back to false once there is no more mousedown
