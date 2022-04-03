
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
  x : {
    name: "mystery", img: "url(image)", multiplier: 1, price: 50, quantity: 0, type: "auto", id: "x",},
  y : {   
    name: "y", img: "url(image)", multiplier: 3, price: 150, quantity: 0, type: "auto", id: "y",}
}

let augs = {
  u : {
    name: "u", img: "url(image)", multiplier: 1, price: 15, quantity: 0, type: "aug", id: "u",},
  v : {  
    name: "v", img: "url(image)", multiplier: 3, price: 60, quantity: 0, type: "aug", id: "v",}
}

let baseClick = 1
let cheese = 0
let totalClicks = 0
let autoClickerCount = 0



// function finder(upgradeItem){
  //   let found = {}
  //   for (let key in dict){
    //     let value = dict[key]
    //     found = value.find(u => upgradeItem === u.name)
    //     if (found){
      //       console.log(found, 'found')
      //       return found
      //     }
      //   }
      // }
      
function startGame(){
  drawUpgrades()
}
// Users can click on an image to collect a resource [x]
      
// Every time you click, the properly calculated amount of cheese is added to bank [x]



function clicker(){
  cheese += baseClick
  totalClicks += 1
  writeTotals()
}

function drawUpgrades(upgrade){
  let upgradeElem = document.getElementById("upgrade-list")
  upgradeElem.innerHTML = /*html*/ `
  <div class="d-flex align-items-center">
    <i class="mdi mdi-disc"></i>
    <div class="d-flex justify-content-between w-100 mb-1">
      <p class="m-0 ms-1" id="upgrade-name">${upgrade.name}</p>
      <p class="m-0 me-4" id="upgrade-quantity">${upgrade.quantity}</p>
    </div>
  </div>`
}

// function updateUpgrades(){

// }

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
  cheese += collatedTotal
  autoClickerCount += collatedTotal
  writeTotals()
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
  writeTotals()
}

// The current resource total is always displayed [x]

function writeTotals(){
  let totalClicksElem = document.getElementById('total-clicks')
  totalClicksElem.innerText = totalClicks
  let totalCheeseElem = document.getElementById('counter')
  totalCheeseElem.innerText = cheese
  let totalAutoClicksElem = document.getElementById('auto-clicks')
  totalAutoClicksElem.innerText = autoClickerCount
}

function checkForAutoUpgrades(itemName){
  itemName.quantity += 1
  // writeQuantities(itemName)
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
    console.log(autoClickerCount)
  }
}

function priceIncreaser(itemName){
  itemName.price = (itemName.price * 2) * itemName.multiplier
  priceWriter(itemName)
}

function priceWriter(itemName){
  console.log(itemName)
  let priceElem  = document.getElementById(itemName.id)
  priceElem.innerText = itemName.price
  console.log(itemName.price)
}

function buyItem(itemName){
  if(cheese >= itemName.price){
    checkForAutoUpgrades(itemName)
    if (itemName.type === "aug"){
      tallyAugmentUpgrades()
    }
  cheese -= itemName.price
  writeTotals()
  priceIncreaser(itemName)
  drawUpgrades(itemName)
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
  // if(itemName.type === "aug"){
  //   baseClick *= itemName.multiplier
  // }

// Users cannot purchase an upgrade if they do not have enouugh resource
// use a conditional that checks 'cheese'



// Purchasing an upgrade decreases the current resource total

// When a user purchases an upgrade, the price of the upgrade increases



// NOTE Stretch goals



//NOTE extras --
// You can use marquee classes to make things move on the page.
// bootstrap offcanvas to generate a pop up menu
// sweet alert insufficient funds?

