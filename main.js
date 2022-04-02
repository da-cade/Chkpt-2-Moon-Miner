
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
    img: "url(image)", multiplier: 1, price: 15, quantity: 0, type: "auto"},
  y : {   
    img: "url(image)", multiplier: 3, price: 15, quantity: 0, type: "auto"}
}

let augs = {
  u : {
    img: "url(image)", multiplier: 1, price: 15, quantity: 0, type: "aug"},
  v : {  
    img: "url(image)", multiplier: 3, price: 15, quantity: 0, type: "aug"}
}

let baseClick = 1
let cheese = 0


function startGame(){

}

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

// Users can click on an image to collect a resource

//TODO every time you click, the properly calculated amount of cheese is added to bank
function clicker(){
  cheese += baseClick
  writeTotal()
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
    console.log("Automatic totals:", collatedTotal, 'quantity:', item.quantity, 'multiplier:', item.multiplier)
  }
  cheese += collatedTotal
  writeTotal()
}

function tallyAugmentUpgrades(){
  let collatedTotal = 0
  for (let key in augs) {
    const item = augs[key];
    collatedTotal += item.quantity
    if(item.quantity > 0){
      collatedTotal *= item.multiplier
    }
  }
  console.log("Augment totals: ", collatedTotal)
  baseClick = collatedTotal
  writeTotal()
}

// The current resource total is always displayed [x]

function writeTotal(){
  let totalElem = document.getElementById('counter')
  totalElem.innerText = cheese
}

function buyItem(itemName){
  if(itemName.type === "auto"){
    let totalUpgrades = 0
    for (let key in autos) {
      const upgrade = autos[key];
      totalUpgrades += upgrade.quantity;
    }
    console.log(totalUpgrades)
    if(totalUpgrades === 0){
      initializeAutoUpgrade()
    }
  }
  itemName.quantity += 1
  if (itemName.type === "aug"){
    tallyAugmentUpgrades()
  }
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

function buttonDisabler(buttonsArray){}

// Purchasing an upgrade decreases the current resource total

// When a user purchases an upgrade, the price of the upgrade increases



// NOTE Stretch goals



//NOTE extras --
// You can use marquee classes to make things move on the page.
// bootstrap offcanvas to generate a pop up menu
// sweet alert insufficient funds?

