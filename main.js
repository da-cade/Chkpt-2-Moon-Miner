
//TODO Requirements
//static data set
  //automatic functions will have their own intervals and multipliers.
//break reference with the data set (??)
// Users have at least 4 upgrades to purchase
// Each Upgrade has different modifier values, and prices
// Users can see the quantity of each upgrade they have purchased
//click upgrade type
//automatic upgrade type
// When a user purchases an upgrade, the price of the upgrade increases



let autos = {
  roboticHarmonicInsight : {
    name: "Robotic Harmonic Insight", img: "url(image)", multiplier: 1, 
    price: 50, quantity: 0, type: "auto", id: "robotic-harmonic-insight",},
  
  nuclearSynthesizer : {   
    name: "Nuclear Synthesizer", img: "url(image)", multiplier: 3, 
    price: 150, quantity: 0, type: "auto", id: "nuclear-synthesizer",}
}

let augs = {
  loopPedal : {
    name: "Loop Pedal", img: "url(image)", multiplier: 1, 
    price: 15, quantity: 0, type: "augment", id: "loop-pedal",},
  
  fogMachine : {  
    name: "Fog Machine", img: "url(image)", multiplier: 3, 
    price: 60, quantity: 0, type: "augment", id: "fog-machine",}
}

let baseClick = 1
let jams = 0
let totalClicks = 0
let autoClickerCount = 0


function changeElements(color){
  let bars = document.querySelectorAll(".accent-bar")
  console.log(bars)
  bars.forEach(element => {
    element.style.background = color
  });
  // for (const key in bars) {
  //   const element = object[key];
  //   element.style.background = color
  // }
}

function lights(){
  let glowElem = document.getElementsByClassName('bg-glow')
}

function dimLights(color){
  let dimmer = document.querySelector(".dim-lights")
  dimmer.style.background = color
}

function playAudio(input, time){
  let audioElem = document.getElementById(input)
  audioElem.currentTime = time
  audioElem.play()
}

function introduction(){
  switch(totalClicks){
    case 1:
      playAudio('harder', 0)
      dimLights("var(--bg-one)")
      break;
    case 2:
      playAudio('better', 0)
      dimLights("var(--bg-two)")
      break;
      // #2E305E
    case 3:
      playAudio('faster', 0)
      dimLights("var(--bg-three)")
      // #2D2F5E
      break;
    case 4:
      playAudio('stronger', 0)
      dimLights("var(--bg-four)")
      break;
    case 5:
      playAudio('hbfs', 20)
      drawButton()
      changeElements('yellow')
      break;
    default:
      console.log(jams)
  }
}
      
// function startGame(){
//   drawUpgrades()
// }

function clicker(){
  jams += baseClick
  totalClicks += 1
  writeStats()
  introduction()
}

function drawButton(){
  let buttonSpot = document.getElementById("button-spot")
  buttonSpot.innerHTML = `
    <button class="storeButton" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#storeMenu" aria-controls="storeMenu"><img class="shopClerk" src="./assets/shopclerk.webp" alt="shop_clerk"></button>`
}

function drawUpgrades(upgrade){
  debugger
  let tempId = ""
  let template = ""
  console.log(upgrade, upgrade.quantity)
  if (upgrade.quantity === 1){
    template += /*html*/ `
    <div class="d-flex align-items-center">
      <i class="mdi mdi-disc"></i>
      <div class="d-flex w-100 mb-1 justify-content-between">
        <p class="m-0" id="upgrade-name">${upgrade.name}</p>
        <p class="m-0"><span id="quantity-${upgrade.id}">${upgrade.quantity}</span> ${upgrade.type}</p>
      </div>
    </div>`
    tempId = "upgrade-" + upgrade.id
    let upgradeElem = document.getElementById(tempId)
    upgradeElem.innerHTML = template
  }
  else{
    updateUpgrades(upgrade)
  }
}

function updateUpgrades(upgrade){
  fullId = 'quantity-' + upgrade.id
  let upgradeQuantity = document.getElementById(fullId)
  console.log(fullId)
  console.log(upgradeQuantity)
  upgradeQuantity.innerText = upgrade.quantity
}

function initializeAutoUpgrade(){
  setInterval(tallyAutoUpgrades, 3000)
}


function tallyAutoUpgrades(){
  let collatedTotal = 0
  for (let key in autos) {
    const item = autos[key];
    collatedTotal += item.quantity
    if(item.quantity > 0){
      collatedTotal *= item.multiplier
    }
  }
  jams += collatedTotal
  autoClickerCount += collatedTotal
  writeStats()
}

function tallyAugmentUpgrades(){
  let collatedTotal = 0
  for (let key in augs) {
    const item = augs[key];
    collatedTotal += item.quantity
    if(item.quantity > 0){
      collatedTotal += item.multiplier
    }
  }
  baseClick = collatedTotal
  writeStats()
}

// The current resource total is always displayed [x]

function writeStats(){
  let totalClicksElem = document.getElementById('total-clicks')
  totalClicksElem.innerText = totalClicks
  let totalJamsElem = document.getElementById('counter')
  totalJamsElem.innerText = jams
  let totalAutoClicksElem = document.getElementById('auto-clicks')
  totalAutoClicksElem.innerText = autoClickerCount
}

function checkForAutoUpgrades(itemName){
  if(itemName.type === "auto"){
    let totalUpgrades = 0
    for (let key in autos) {
      const upgrade = autos[key];
      totalUpgrades += upgrade.quantity;
    }
    if(totalUpgrades === 1){
      initializeAutoUpgrade()
    }
    autoClickerCount = totalUpgrades
  }
}

function priceIncreaser(itemName){
  itemName.price = (itemName.price * 2) * itemName.multiplier
  priceWriter(itemName)
}

function priceWriter(itemName){
  let priceElem  = document.getElementById(itemName.id)
  priceElem.innerText = itemName.price
}

function buyItem(itemName){
  if(jams >= itemName.price){
    itemName.quantity += 1
    console.log(itemName, itemName.quantity)
    checkForAutoUpgrades(itemName)
    if (itemName.type === "augment"){
      tallyAugmentUpgrades()
    }
  jams -= itemName.price
  writeStats()
  priceIncreaser(itemName)
  drawUpgrades(itemName)
  // updateUpgrades(itemName)

  }
  //TODO Styling -- make into sweet alert
  else{console.log("You cannot afford this upgrade")}
}

function buttonEnabler(button){

}

// Users can purchase at least 1 click upgrade
// Users can purchase at least 1 automatic upgrade

// Automatic upgrades are applied at least every 3 seconds

  // if(itemName.type === "auto"){
  //   if(baseAutoClick === 0){
  //     baseAutoClick += itemName.multiplier
  //   } 
  // }else{baseAutoClick *= itemName.multiplier}
  // if(itemName.type === "augment"){
  //   baseClick *= itemName.multiplier
  // }

// Users cannot purchase an upgrade if they do not have enouugh resource
// use a conditional that checks 'jams'



// Purchasing an upgrade decreases the current resource total

// When a user purchases an upgrade, the price of the upgrade increases



// NOTE Stretch goals



//NOTE extras --
// You can use marquee classes to make things move on the page.
// bootstrap offcanvas to generate a pop up menu
// sweet alert insufficient funds?

