let name = "koko";
let birth = undefined;
let sign = undefined;

//states
let state = `intro`;


let animalData = `undefined`;
let colorData = `undefined`;
let animalColor = `undefined`;
let formData = `undefined`;
let animal = `undefined`;
let nameOfGuardian = `undefined`;

let animalResponse = false;
let secretData = undefined;
let hideSecret = false;
let secretExposed = false;

// let mood = `undefined`;
let animalEcho = undefined;

let characteristic = {
  type: `tbd`,
  form: `tbd`,
  element: `tbd`,
  name: `tbd`,
  features: `tbd`,
  texture: `tbd`,
  animalColor: `tbd`,
  animal: `tbd`,
  secret: `tbd`,
  password: `tbd`
}
let guardianProfile = null;
let passedVerification = false;

/**
loads the json lists
*/
function preload() {
  animalData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/common.json`);
  formData = loadJSON(`Form.json`);
  colorData = loadJSON(`Colors.json`);
  //https://raw.githubusercontent.com/dariusk/corpora/master/data/colors/wikipedia.json
  animalEcho = loadSound(`Preloads/Sounds/bark.wav`);

}

function setup (){
  intro();
//tamagotchi();
//diary();
console.log(state);
localStorage.removeItem('guardianData');


//set the guardian or generates one
if (localStorage.getItem(`guardianData`) === null) {
  setGuardianProfile();
  passedVerification = true;
}
if (annyang) {
  let commands = {
    'I promise': function() {
      animalResponse = true;
      tellMeUrSecret();
    }
  };
  annyang.addCommands(commands);
  annyang.start();
}
}


function setGuardianProfile(){
let animal = random(formData.animals);
let animalFeature = random(formData.animals);
let animalColor = random(colorData.animalColors);
let animalForm = random(animalData);
let animalTexture = random(formData.animals);

characteristic.name = prompt(`PET SHOP SERVICE: Hi. Got some secrets to protect? Choose a name for your new guardian.`)
characteristic.animal = random(animalData.animals);
characteristic.type = random(animal.Type);
characteristic.form = animalForm;
characteristic.features = random(animalFeature.Form);
characteristic.texture = random(animalFeature.Texture);
characteristic.element = random(animal.Element);
characteristic.animalColor = animalColor.name;
characteristic.secret = "";
localStorage.setItem(`guardianData`, JSON.stringify(characteristic));
guardianProfile = characteristic;
console.log(guardianProfile);
//call the tamagotchi state;
tamagotchi();
}

function tellMeUrSecret() {
  secretData = prompt(`${guardianProfile.name} : Tell me your secret.`)
  //let secret = JSON.stringify(localStorage.getItem(`secretData`));
  guardianProfile.secret = guardianProfile.secret + "," + secretData;
  localStorage.setItem('guardianData', JSON.stringify(guardianProfile));
}
function intro(){
//  let introBox = document.getElementById('introBox');
//  document.getElementById('introBox').style.display = 'none';
  document.getElementById('parentBox').style.display = 'none';
}

function tamagotchi (){
  document.getElementById('parentBox').style.display = 'block';
  document.getElementById('introBox').style.display = 'none';
  state = `tamagotchi`;
  console.log(state);
// window.onload = function() {

  let dt = new Date();
  // presets
  let nameBox = document.getElementById('nameBox');
  console.log(nameBox);
  let birthBox = document.getElementById('birthBox');
  console.log(birthBox);
  let signBox = document.getElementById('signBox');
  console.log(signBox);
  let petBox = document.getElementById('petBox');
  let coinsBox = document.getElementById('coinsBox');
  let moodBox = document.getElementById('moodBox');
  let moodText = document.getElementById('moodText');
  let pet = document.getElementById('pet');
  let hungerBox = document.getElementById('hungerBox');

let weatherVar = document.getElementById('rain');
let weatherShowing = false;

  let hungerLevel = 5;
  let coins = 15;
  let moodLevel = 5;

  // what is this for? cos its called so many times
  let heartIcon = document.getElementById('lilHeart');
  let hungerHeartIcon = document.getElementById('hungerLilhearts');

  // zone detection
  let petZone = document.querySelector('#petBox');
  let petZoneRect = petZone.getBoundingClientRect();
  // requestAnimationFrame(makeNewPosition);

  function makeNewPosition() {
    // Get viewport dimensions (remove the dimension of the div)
    let h = petZoneRect.height;
    let w = petZoneRect.width;

    let nw = getRandomInt(-5, 5);
    let nh = getRandomInt(-5, 5);

    let newLeft = parseInt(pet.style.left) + nw;
    let newTop = parseInt(pet.style.top) + nh;

    pet.style.left = Math.min(Math.max(parseInt(newLeft), 25), w - 25) + "px";
    pet.style.top = Math.min(Math.max(parseInt(newTop), 25), h - 200) + "px";


    requestAnimationFrame(makeNewPosition);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let playButt = document.getElementById('playButton');
  let eatButton = document.getElementById('eatButton');
  let helloButton = document.getElementById('helloButton');
  let washButton = document.getElementById('washButton');
  let meditationButton = document.getElementById('meditateButton');
  let changeBgButton = document.getElementById('newRoom');
  let changeFitButton= document.getElementById('newKokoButton');

  // // preload
  helloSoundtrack = document.getElementById('helloSound');
  showerSoundtrack = document.getElementById('showerSoundtrack');
  ilySoundtrack = document.getElementById('ilySoundtrack');

let fits = [];
let currentFit =0;
fits[0]="Preloads/Images/output-onlinegiftools.gif";
fits[1]="Preloads/Images/1output-onlinegiftools.gif";

  room = document.getElementById('room');
  ramenRoom = document.getElementById('dinnerBackground');
  let rooms = [];
  let currentRoom = 0;
  rooms[0] = "Preloads/Images/https-::www.tumbral.com:blog:anime-bedrooms.jpeg";
  rooms[1] = "Preloads/Images/https-::wallpapersafari.com:w:XMIvn0.png";
  rooms[2] = "Preloads/Images/https-::anime.desktopnexus.com:wallpaper:1519445:.webp"
  rooms[3] = "Preloads/Images/https-::wallpaperaccess.com:saturne.jpeg"


  nameBox.innerHTML = `<h2> NAME: ${characteristic.name} </h2>`;
  birthBox.innerHTML = `<h2> DAY AND TIME: ${dt.toLocaleString()} </h2>`;
  signBox.innerHTML = `<h2> ELEMENT: ${characteristic.element} </h2>`;
  coinsBox.innerHTML = `<h2> COINS: ${coins}</h2>`;
  moodText.innerHTML = `MOOD: `;
  hungerText.innerHTML = `BELLY: `;

  // why creating hearts here and at line 103?
  for (let i = 0; i < moodLevel; i++) {
    let heart = document.createElement("img");
    heart.src = "Preloads/Images/https-::www.pngitem.com:middle:hmibbwx_pink-pixel-heart-png-transparent-png:.png";
    document.getElementById('lilhearts').appendChild(heart);
  }

  for (let i = 0; i < hungerLevel; i++) {
    let hungerHeart = document.createElement("img");
    hungerHeart.src = "Preloads/Images/tsi coeur.png";
    document.getElementById('hungerLilhearts').appendChild(hungerHeart);
  }


  // functions

// change fit

changeFitButton.addEventListener("click", changeFit);
function changeFit() {
  if (currentFit >= fits.length - 1) {
    currentFit = 0;
    pet.src = fits[currentFit]

  } else {
    currentFit = currentFit + 1;

    pet.src = fits[currentFit]
  }
}

// rain
setInterval(weatherChanging, 3000);

function weatherChanging() {
      weatherVar.style.display= "block";
      setTimeout(function() {
        weatherVar.style.display="none";
}
,1000);
  }
console.log("weather changing");

// attempt2
// setTimeout(function() {
// weatherVar.style.display= "block";
//   setTimeout(returnUsualWeather, 9000)
// })
// function returnUsualWeather() {
// weatherVar.style.display= "none";
// }
// }

  // eat and hunger
  setInterval(hungerUpdate, 20000);

  function hungerUpdate() {
    hungerLevel -= 1;
    if (hungerLevel <= 1) {
      hungerLevel = 1;
    }
    hungerText.innerHTML = `BELLY: `;

    document.getElementById('hungerLilhearts').innerHTML = "";
    for (let i = 0; i < hungerLevel; i++) {
      let hungerHeart = document.createElement("img");
      hungerHeart.src = "Preloads/Images/tsi coeur.png";
      document.getElementById('hungerLilhearts').appendChild(hungerHeart);
    }
  }

  eatButton.addEventListener("click", eatPressed);

  function eatPressed() {
    setTimeout(function() {
      room.src = "Preloads/Images/https-::imgur.com:gallery:OI5Ev4n.gif"
      setTimeout(returnToBackground, 3000)
    })

  function returnToBackground() {
    room.src = rooms[currentRoom]
  }
  hungerLevel += 4;
  coins -= 5;
  if (hungerLevel >= 7) {
    hungerLevel = 7;
  }
  coinsBox.innerHTML = `<h2> COINS: ${coins}</h2>`;
  hungerText.innerHTML = `BELLY:`;
  console.log(event);
  console.log(this);

  document.getElementById('hungerLilhearts').innerHTML = "";

  for (let i = 0; i < hungerLevel; i++) {

    let hungerHeart = document.createElement("img");
    hungerHeart.src = "Preloads/Images/tsi coeur.png";
    document.getElementById('hungerLilhearts').appendChild(hungerHeart);
  }
}

// play and mood
setInterval(moodUpdate, 30000);
function moodUpdate() {
  moodLevel -= 1;
  if (moodLevel <= 1) {
    moodLevel = 1;
  }

  console.log(moodLevel);
  moodText.innerHTML = `MOOD: `;

  // console.log(moodUpdate);
  document.getElementById('lilhearts').innerHTML = "";
  for (let i = 0; i < moodLevel; i++) {
    let heart = document.createElement("img");
    heart.src = "Preloads/Images/https-::www.pngitem.com:middle:hmibbwx_pink-pixel-heart-png-transparent-png:.png";
    document.getElementById('lilhearts').appendChild(heart);
  }
}

playButt.addEventListener("click", playPressed);

function playPressed() {
  ilySoundtrack.play();
  setTimeout(function() {
    room.src = "Preloads/Images/https-::www.pinterest.ca:pin:706431891538867328:.jpeg"
    setTimeout(returnToBackground, 3000)
  })
function returnToBackground() {
  room.src = rooms[currentRoom]
}
  moodLevel += 2;
  coins -= 5;
  if (moodLevel >= 7) {
    moodLevel = 7;

    pet.style.left = 50+ "px";
    pet.style.top = 50+ "px";

  }
  coinsBox.innerHTML = `<h2> COINS: ${coins}</h2>`;
  moodText.innerHTML = `MOOD:`;
  console.log(event);
  console.log(this);


  document.getElementById('lilhearts').innerHTML = "";

  for (let i = 0; i < moodLevel; i++) {

    let heart = document.createElement("img");
    heart.src = "Preloads/Images/https-::www.pngitem.com:middle:hmibbwx_pink-pixel-heart-png-transparent-png:.png";
    document.getElementById('lilhearts').appendChild(heart);
  }

}
// meditative kitty
meditationButton.addEventListener("click", meditationPressed);

function meditationPressed() {
  setTimeout(function() {
    room.src = "Preloads/Images/https-::overlordmaruyama.fandom.com:wiki:Spa_Resort_Nazarick.png"
    setTimeout(returnToBackground, 3000)
  })
function returnToBackground() {
  room.src = rooms[currentRoom]
}

  moodLevel += 3;
  moodText.innerHTML = `MOOD:`;
  console.log(event);
  console.log(this);

  document.getElementById('lilhearts').innerHTML = "";

  for (let i = 0; i < moodLevel; i++) {

    let heart = document.createElement("img");
    heart.src = "Preloads/Images/https-::www.pngitem.com:middle:hmibbwx_pink-pixel-heart-png-transparent-png:.png";
    document.getElementById('lilhearts').appendChild(heart);
  }
}


setInterval(coinsUpdate, 10000);
function coinsUpdate() {
  coins += 1;
  if (coins < 1) {
    coins = 1;
  }
  coinsBox.innerHTML = `<h2> COINS: ${coins}</h2>`;
}



// plays hello
helloButton.addEventListener("click", playHelloSound);
function playHelloSound() {
  helloSoundtrack.play();
  console.log(event);
  console.log(this);
}

// displays shower room at shower

// doesnt come back to normal after 2 seconds
// let showerTimer = setTimeout(displayShower, 5000);
washButton.addEventListener("click", displayShower);

function displayShower() {
  setTimeout(function() {
    showerSoundtrack.play();
    room.src = "Preloads/Images/https-::www.pinterest.ca:pin:809522101760396658:.jpeg"
    console.log("shower on");
    setTimeout(returnToBackground, 3000)
  })
}

  function returnToBackground() {
    console.log("back");
    room.src = rooms[currentRoom]
  }


// displays bg room
changeBgButton.addEventListener("click", changeBgPicture);
function changeBgPicture() {

  if (currentRoom >= rooms.length - 1) {
    currentRoom = 0;
    room.src = rooms[currentRoom]

  } else {
    currentRoom = currentRoom + 1;
    room.src = rooms[currentRoom]
  }
  console.log("change button click")
}
}


function diary (){
  document.getElementById('journalBox').style.display = 'block';
}



// function draw(){
//   if (state === `intro`){
//     intro();
//     // switchToTamagotchi();
//   } else if (state=== `tamagotchi`){
//     tamagotchi();
//     // secretGuardianGenerator();
//     // askPassword();
//   } else if (state === `diary`){
//     diary();
//     // secretGuardian();
//   }
// }




//onload end}
