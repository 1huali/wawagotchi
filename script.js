let name = undefined;
let birth = undefined;
let sign = undefined;
let pet = undefined;
let generatedColor= undefined;
// let currentFit;
let generatedOutfit;
// let outfits = [];
let moodList= undefined;

//initial state
let state = `intro`;

let secretCount = 0;
//json files storage variables
// let animalData = `undefined`;
// let colorData = `undefined`;
let animalColor = `undefined`;
let characteristicData = `undefined`;
let thoughtsList= `undefined`;
let journalBox=`undefined`;

let animal = `undefined`;
let nameOfGuardian = `undefined`;


let animalResponse = false;
let secretData = undefined;
let guardianReply = undefined;

// let animalEcho = undefined;

let characteristic = {
  type: `tbd`,
  form: `tbd`,
  element: `tbd`,
  name: `tbd`,
  nature: `tbd`,
  texture: `tbd`,
  outfit:`tbd`,
  color: `tbd`,
  animal: `tbd`,
  secret: `tbd`,
  password: `tbd`,
  mood:`tbd`
}

let guardianProfile = null;
let passedVerification = false;

/**
loads the json lists
*/
function preload() {
  animalData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/common.json`);
  characteristicData = loadJSON(`Guardians.json`);
  // colorData = loadJSON(`Colors.json`);
  //https://raw.githubusercontent.com/dariusk/corpora/master/data/colors/wikipedia.json
  guardianReply = loadSound(`Preloads/Sounds/bark.wav`);
thoughtsList = loadJSON(`Thoughts.json`);
moodList = loadJSON(`Moods.json`);

}

function setup() {
  //initialization of starting state
  intro();
  // localStorage.removeItem('guardianData');

  if (annyang) {
    let commands = {
      'I promise': function() {
        animalResponse = true;
        tellMeUrSecret();
      },
      'show': function() {
        secretState();
        document.getElementById('journalBox').style.display = 'block';
        document.getElementById('secretList').style.color = '#000000';

      },
      'hide': function() {
        document.getElementById('secretList').style.color = '#FFFFFF';
        document.getElementById('journalBox').style.display = 'none';
      },
      '*tag': function(tag) {
        console.log(tag)
        if (tag.toLowerCase() === characteristic.name.toLowerCase()){
          console.log(`oui?`)
          guardianReply.play();
        }},
        'hello': function() {
            // animalResponse === true;
            console.log(`oui?`)
            guardianReply.play();
          },
          'I love you': function() {
            console.log('me2')
              guardianReply.play();

      }
    };
    annyang.addCommands(commands);
    annyang.start();
  }
  pet = document.getElementById('pet');

}

// sets a guardian random profile for a first visit
function setGuardianProfile() {
  document.getElementById('introBox').style.display = 'block';
  document.getElementById('returning').style.display = 'none';
  document.getElementById("dataInputGuardian").addEventListener("click", function() {

    //stop input button from reloading the page
    event.preventDefault();
    console.log(document.getElementById("inputName").value);
    console.log(document.getElementById("inputPassword").value);

//generation of pet color
generatedColor= Math.random()* 360;
pet.style.filter = `hue-rotate( ${generatedColor}deg)`;


//storing json files to characteristic
    let animal = random(characteristicData.animals);
    let animalFeature = random(characteristicData.animals);
    // let animalColor  = colorData.animalColors[0];
    let animalForm = random(animalData);
    let animalTexture = random(characteristicData.animals);

//guardian profile's characteristic generation and saving
    characteristic.name = document.getElementById("inputName").value;
    characteristic.animal = random(animalData.animals);
    characteristic.type = random(animal.Type);
    characteristic.form = animalForm;
    characteristic.nature = random(animalFeature.Nature);
    characteristic.texture = random(animalFeature.Texture);
    characteristic.element = random(animal.Element);
    characteristic.numberOfSecrets = secretCount;
    characteristic.color = generatedColor;
    // characteristic.outfit = generatedOutfit;
    characteristic.secret = "";
    characteristic.mood= random(moodList.moods);
    characteristic.password = document.getElementById("inputPassword").value;
    localStorage.setItem(`guardianData`, JSON.stringify(characteristic));
    guardianProfile = characteristic;
    console.log(guardianProfile);

    //call the tamagotchi state;
   tamagotchi();
  })
}

// layout on left side
function displayGuardianInstructions() {
  //   if (passedVerification) {
  console.log(guardianProfile);
    profileBox.innerHTML += ``;
  profileBox.innerHTML = `<h2>Hi, I is the guardian keeper of your secrets. I am here to watch over your secrets while you is away</h2>`;
  profileBox.innerHTML += `<h2>♥  ♥           ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ </h2>`;
  profileBox.innerHTML += `<h2> Metaphysical form : ${guardianProfile.animal}</h2>`;
  profileBox.innerHTML += `<h2> Type : ${guardianProfile.type}</h2>`;
  profileBox.innerHTML += `<h2> Nature : ${guardianProfile.nature}</h2>`;
  profileBox.innerHTML += ``;
  profileBox.innerHTML += ``;
  profileBox.innerHTML += `<h2>${guardianProfile.name}'s box *꧂</h2>`;
  profileBox.innerHTML += `<h2> Mood of the day : ${guardianProfile.mood}</h2>`;
  profileBox.innerHTML += `<h2>♥  ♥           ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ </h2>`;


}

// layout on the left side
function displayGuardiansThoughts(thoughtIndex) {
  bottomLeftBox.innerHTML = `<h2> ${thoughtsList.thoughts[thoughtIndex]} </h2>`;
}

// asks to input secrts and stores new secret to the array. Secret count incremente by one.
function tellMeUrSecret() {
  let secretDate = rememberDate();
  secretData = prompt(`${guardianProfile.name} : Tell me your secret.`);
  guardianProfile.secret = guardianProfile.secret + `(${secretDate}) : `+ secretData;
  secretCount += 1;
  guardianProfile.numberOfSecrets= secretCount;
  console.log (secretCount);
  localStorage.setItem('guardianData', JSON.stringify(guardianProfile));
}

// date appears next to the secrets as a journal. Inspired by w3schools
function rememberDate(){
  let date = new Date()
let day = date.getDate();
let month = date.getMonth()+1;
let year = date.getFullYear();

let fullDate = `${day}.${month}.${year}.`;
return fullDate;
console.log(fullDate);
}

//activates the intro layout
function intro() {
  // dont appear in the intro
  document.getElementById('introBox').style.display = 'none';
  document.getElementById('parentBox').style.display = 'none';

  //set the guardian or generates one
  if (localStorage.getItem(`guardianData`) === null) {
    setGuardianProfile();
    //passedVerification = true;
  } else {
    testGuardianName();
  }
}

//authentification thru password when the user is coming back
function testGuardianName() {

  document.getElementById('introBox').style.display = 'block';
  document.getElementById('new').style.display = 'none';

//ask for user to input a password
  document.getElementById("dataInputGuardianReturn").addEventListener("click", function() {
      //stop input button from reloading the page
      event.preventDefault();
      guardianProfile = JSON.parse(localStorage.getItem(`guardianData`));

      let passwordEntry= document.getElementById("inputPasswordReturn").value;
      // console.log(guardianProfile);
      // console.log(passwordEntry);

      if (passwordEntry === guardianProfile.password) {
       tamagotchi();
      console.log("success");
      }

    }) 

  } //testGuardianName

  //secrets appear in their zone
  function displaySecret() {
     document.getElementById("secretList").innerHTML = `<h2> ${guardianProfile.secret} </h2>`;
     document.getElementById("secretsBox").innerHTML = `<h2> ${secretCount} </h2>`;
    }

// tamagotchi state
  function tamagotchi() {

    // this remembers the latest number (integer) of secret and stores it in secretCount
    secretCount = parseInt(guardianProfile.numberOfSecrets);
    console.log(secretCount);
    displayGuardianInstructions();
    state = `tamagotchi`;

    //guardian's thoughts box generating random strings
      setInterval(function(){
        //turn list element into a number
        let randomIndex = Math.floor(Math.random()*thoughtsList.thoughts.length);
        console.log(randomIndex);
      displayGuardiansThoughts(randomIndex);
    }, 6000);

    // side boxes layout settings
    document.getElementById('parentBox').style.display = 'block';
    document.getElementById('introBox').style.display = 'none';
    document.getElementById('secretList').style.display = 'none';

// variables/data to store in their proper boxes 
    let dt = new Date();

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
    let hungerBox = document.getElementById('hungerBox');
    let profileBox = document.getElementById('profileBox');
    let animalThoughtsBox = document.getElementById('bottomLeftBox');
    let secretsBox = document.getElementById('secretList');
    let journalBox = document.getElementById('journalBox');
    let rightSideBox = document.getElementById('secretsBox');

    // intermittent/variable elements
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

    //BUG : the animal would move but too shacky - enable when fixed. maybe need jquery for a smoother flow.
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

    //button variable setting 
    let playButt = document.getElementById('playButton');
    let eatButton = document.getElementById('eatButton');
    let helloButton = document.getElementById('helloButton');
    let washButton = document.getElementById('washButton');
    let meditationButton = document.getElementById('meditateButton');
    let changeBgButton = document.getElementById('newRoom');
    let changeFitButton = document.getElementById('newKokoButton');
    let inputName = document.getElementById('inputName');
    let inputPassword = document.getElementById('inputPassword');

    // // preload
    helloSoundtrack = document.getElementById('helloSound');
    showerSoundtrack = document.getElementById('showerSoundtrack');
    ilySoundtrack = document.getElementById('ilySoundtrack');

    // elements for New Outfit 
    let outfits = [];
    currentFit = 0;
    outfits[0] = "Preloads/Images/cat_red-peach.gif";
    outfits[1] = "Preloads/Images/cat_lucky-black.gif";
    outfits[2] = "Preloads/Images/cat_snow-silver.gif";

    // elements for Rooms
    room = document.getElementById('room');
    ramenRoom = document.getElementById('dinnerBackground');
    let rooms = [];
    let currentRoom = 0;
    rooms[0] = "Preloads/Images/https-::www.tumbral.com:blog:anime-bedrooms.jpeg";
    rooms[1] = "Preloads/Images/https-::wallpapersafari.com:w:XMIvn0.png";
    rooms[2] = "Preloads/Images/https-::anime.desktopnexus.com:wallpaper:1519445:.webp"
    rooms[3] = "Preloads/Images/https-::wallpaperaccess.com:saturne.jpeg"

    // Characteristic boxes
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


    // animal change outfit
    changeFitButton.addEventListener("click", changeFit);

    function changeFit() {
      if (currentFit >= outfits.length - 1) {
        currentFit = 0;
        pet.src = outfits[currentFit]
      } else {
        currentFit = currentFit + 1;
        pet.src = outfits[currentFit]
      }
    }

    // intermittent element appearing in animal box
    setInterval(weatherChanging, 3000);

    function weatherChanging() {
      weatherVar.style.display = "block";
      setTimeout(function() {
        weatherVar.style.display = "none";
      }, 1000);
    }
    console.log("weather changing");

    // eat and hunger : hunger point lost every 20 seconds
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

    // to feed animal, click on Eat HTMLbutton and adds up 4hunger points and takes away 5 coins
    eatButton.addEventListener("click", eatPressed);
    function eatPressed() {
      setTimeout(function() {
        room.src = "Preloads/Images/https-::imgur.com:gallery:OI5Ev4n.gif"
        setTimeout(returnToBackground, 3000)
      })

      // so that current room image comes back after going to a room
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

      moodText.innerHTML = `MOOD: `;

      // mood hearts incrementing with user interaction/decreasing with time
      document.getElementById('lilhearts').innerHTML = "";
      for (let i = 0; i < moodLevel; i++) {
        let heart = document.createElement("img");
        heart.src = "Preloads/Images/https-::www.pngitem.com:middle:hmibbwx_pink-pixel-heart-png-transparent-png:.png";
        document.getElementById('lilhearts').appendChild(heart);
      }
    }

    //Play button
    playButt.addEventListener("click", playPressed);

    //play room image appears
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

        pet.style.left = 50 + "px";
        pet.style.top = 50 + "px";

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
    // meditative button
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
// coins increases by 1 every 10 seconds
    function coinsUpdate() {
      coins += 1;
      if (coins < 1) {
        coins = 1;
      }
      coinsBox.innerHTML = `<h2> COINS: ${coins}</h2>`;
    }

    // plays 'hello"
    helloButton.addEventListener("click", playHelloSound);

    function playHelloSound() {
      helloSoundtrack.play();
      console.log(event);
      console.log(this);
    }

    // displays shower room at shower
    washButton.addEventListener("click", displayShower);

    // shower room displays when Shower button is pressed
    function displayShower() {
      setTimeout(function() {
        showerSoundtrack.play();
        room.src = "Preloads/Images/https-::www.pinterest.ca:pin:809522101760396658:.jpeg"
        console.log("shower on");
        setTimeout(returnToBackground, 3000)
      })
    }
// returns to a background
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

  // secret state, secrets can display
  function secretState() {
    state = `secret`;
    console.log(state);
    document.getElementById('secretList').style.display = 'block';
    displaySecret();
  }