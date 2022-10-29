const beats_status = document.querySelector('.beats');
const start = document.querySelector('.btn-start');
const btn_minus = document.querySelector('.btn-minus');
const btn_plus = document.querySelector('.btn-plus');
const bpm_slider = document.querySelector('.bpm-input');
const decrease_beats = document.querySelector('.decrease-beats');
const increase_beats = document.querySelector('.increase-beats');
const measure_count = document.querySelector('.measure-count');
const bpm_number = document.querySelector('.bpm-number');
const circles = Array.from(document.getElementsByClassName('beat-circle'));
const btn_text = document.querySelector('.btn_text');

const click1 = new Audio('assets/Click1.mp3');
const click2 = new Audio('assets/Click2.mp3');

let bpm = 140;
let beat_per_measure = 4;
let counter = 1;
let active = false; //Variable to check if metronome is playing

updateCircles(); //update visible circles

//Set tempo by clicking on button
btn_minus.addEventListener('click', () => {
    if (bpm <= 20) { return };
    bpm--; 
    bpm_number.textContent = bpm;
    bpm_slider.value = bpm;
});
//Set tempo by clicking on button
btn_plus.addEventListener('click', () => {
    if (bpm >= 280) { return };
    bpm++;
    bpm_number.textContent = bpm;
    bpm_slider.value = bpm;
});
//Set tempo by slider
bpm_slider.addEventListener('input', () => {
    bpm = bpm_slider.value;
    bpm_number.textContent = bpm;
    metronome.timeInterval = 60000 / bpm;
})


//Try to make circles disappear
function updateCircles(){
    circles.forEach((element, index) => {
        if(index >= beat_per_measure){
            element.style.display = 'none';
        }
        else{
            element.style.display = 'inline';
        }
    })
}

//Set beat per measure clicking on buttons
increase_beats.addEventListener('click', () => {
    if(beat_per_measure >= 12){
        return;
    }
    beat_per_measure++;
    measure_count.innerText = beat_per_measure;
    updateCircles();
})

//Set beat per measure clicking on buttons
decrease_beats.addEventListener('click', () => {
    if(beat_per_measure <= 1){
        return;
    }
    beat_per_measure--;
    measure_count.innerText = beat_per_measure;
    updateCircles();
})


//Function to play clicks when metronome is active
function playClick(){ 

    if(counter > beat_per_measure){
        counter = 1;
    }

    //Highlite active beat
    circles.forEach((element, index) => {
        let beat = index + 1;
        if((beat) === counter){
            element.style.backgroundColor = 'rgb(245, 199, 147)';
        }
        else{
            element.style.backgroundColor = '#c1c1c1';
        }
    })
    
    beats_status.innerText = counter; //Show active beat by number

    if (counter === 1){
        click1.play();
        click1.currentTime = 0;
    }
    else{
        click2.play();
        click2.currentTime = 0;
    }
    counter++;       
}

//Create new timer to set an interal between clicks
const metronome = new Timer(playClick, 60000 / bpm, { immediate: true});

start.addEventListener('click', () => {
    counter = 1;
    if (!active){
        metronome.start();
        active = true;
        btn_text.innerText = 'STOP';  
    }
    else{
        metronome.stop();
        active = false;
        btn_text.innerText = 'START';  
    }
})


