# Metronome
#### Description: Implementation of metronome using HTML/CSS/JS
#### To check out the project follow the link: https://ptarho.github.io/Metronome/

### What is metronome?  
It is a device that produces a click at a regular interval of time. It used by musicians as a practice tool to make sure they are playing at a steady tempo.
Modern implementation of this device was invented by German inventor Johann Maelzel in 1815.

#### `index.html`
That file contains html code of the project. I don't use any id tags, only classes according to bem methodology. The metronome itself is located inside main div with `class="metronome"` and inside it there is another big div with class `'container'`. Every independed element was also coded inside own divs.Thank's to that there will be no probles to embed metronome on your site.
Circles that represents active beat was coded by ul tag, but i think it could be also implemented by table. I tried not to use any css properties in html to avoid making it too complicated. 

#### `style.css`
There is all styles for my app. I've used both flexes and grids to make it responsive.
Nothing speccial here, just some margings, background colors, and ect .I should mention that I had to customize slider separately for chrome (`::-webkit-slider-thumb` , `::-webkit-slider-runnable-track`) and firefox (`::-moz-range-thumb` , `::-moz-range-track`). Also at the and of a file styles for different screen sizes

#### `times.js`
It's a helpful file I implemented and used in my main script. There was a problem with built in function `'setTimeout()'`. It doesn't guarantee that function will start exactly after deley you set, It's only said that function won't start earlier than delay end. So I had to count drifted time and calculate new delay after each round. Also this function has a few methods : `Timer.start()` - to start timer, `Timer.stop()` - to stop it, `Timer.round()` - to start callback function and to take into account drifted time. Also there is a `Timer.options.immediate` propertie, if it's set to True there will be no timeout at the start of first round.

#### `script.js`
At a top of the file i created variables for all elements of the app I've used later. Then also coded two click sounds, so it's easy to change them anytime. Then I added event listener fow all buttons and wrote functions for them. The hurdest part was implementation of circles. I spent out hours figuring how to make them disappear or show them back if needed. For that i used next code `Array.from(document.getElementsByClassName('beat-circle'));`. Firstly i received a list of all circles and then convert it into array, so i could use arrey function `forEach()` later. Any time a number of note per beat change, `updateCircles()` function runs. It's compare the index of each circle with variable `beat_per_measure` and hide all unnecessary circles. Lastly, the main variable `const metronome = new Timer(playClick, 60000 / bpm, { immediate: true});` was coded. Delay timeout calculates dividing 1 minute in ms by bpm . And has immediate propertie set to true, so there is no delay at the start.
