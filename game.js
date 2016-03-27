var items = [];
var unUsedRooms = [];
var locations = [];
var playerHealth = 50;

var knife = new item("Knife", "Dresser", "Stab Enemy");
var trap1 = new trap("Trap", "Picture Frame");
var kitchen_key = new item("Kitchen Key", "Shelf", "Open Kitchen");
var Kitchen_room = new room("Kitchen", [knife,trap1,kitchen_key]);

var main_door_key = new item("Main Door Key", "Dresser", "Open Front Door");
var trap2 = new trap("Trap", "Rug");
var Stake = new item("Stake", "Cabinet", "Kill Vampire");
var Bedroom_room = new room("Bedroom", [main_door_key,Stake,trap2]);

var chainsaw = new item("Chainsaw", "Closet", "Kill Zombie");
var bolt_cutter = new item("Bolt Cutter", "Trunk", "Cut Gate");
var trap3 = new trap("Trap", "Oil Slick");
var Garage_room = new room("Garage", [trap3,bolt_cutter,chainsaw]);

var rooms = [Bedroom_room,Kitchen_room, Garage_room];
var curr_room = rooms[0].name;

var initLoc = function(){
  rooms[0].roomItems.forEach(function (x){
      locations.push(x.itemLocation);
  })
};

// This Block of Code deals with the Controller of the Game

//Used to read the inventory input box
// This function was written by Andy Novocin
var readItem = function(){
    use_item(document.getElementById('InvSelect').value);
    display_items();
};

var readRoom = function(aroom){
    roomCheck(aroom);
    updateroomLocations();
    display_rooms();
    display_room();
    display_locations();
    display_health();
};

var updateUnusedRooms = function(room){
  var index_of_room = unUsedRooms.indexOf(room);
  if (index_of_room > -1)
        rooms.push(unUsedRooms[index_of_room]);
        unUsedRooms.splice(index_of_room,1);
};

var parseKey = function (key){
  var keyLength = key.length();
  
  aroom = kitchen_key;
  updateUnusedRooms(aroom);
};

var updateRooms = function(){
  rooms.forEach(function (aroom){  
      if (aroom.roomItems.length == 0)
           removeRoom(aroom);
           curr_room = rooms[0].name;
           updateroomLocations();
           display_rooms();
           display_locations();
           display_room();
  });
};

var removeRoom = function(aroom){
    var room_index = rooms.indexOf(aroom);
        rooms.splice(room_index,1);
};

//Used to determine if item is in the inventory
// If in inventory, player uses item and remove from list
var use_item = function(item){
    console.log(item);
    var index_of_item = items.indexOf(item);
    if (index_of_item > -1){
        itemLife(item[index_of_item], items);
        // items.splice(index_of_item,1);
    }
};

//Used to update the locations in the room, to explore
var updateroomLocations = function(){
    var newlocation = [];
    rooms.forEach(function (x){
        var itemTemp = [];
        itemTemp = x.rmItems;
        if(x.name == curr_room){
            locations = extractLoc(x.roomItems);
        }})
};
    
// Set the room Location items that the player can choose from
var extractLoc = function(itemArray){
    var tempArray =[];
    itemArray.forEach(function (x){
      tempArray.push(x.itemLocation);  
    })
  return tempArray;  
};    

// Used to read the room input
var roomCheck = function(newroom){
    rooms.forEach(function (x){
        if(x.name == newroom){
            curr_room = newroom;
    }})};

// Used to read the area explore button
var readArea =function(aLocation){
    areaCheck(aLocation);
    getItem(aLocation);
    updateRooms();
    display_items();
    display_locations();
    display_room();
    display_health();
};

// Used to make sure that the explored area is a valid one
var areaCheck = function(newlocation){
    var index_of_location = locations.indexOf(newlocation);
    if(index_of_location > -1){
        var removelocation = locations.indexOf(newlocation);
        locations.splice(removelocation,1);
    }};

var itemHandling = function(itemtoHandle){
    console.log(itemtoHandle);
    var aneffect = itemtoHandle.effect;
    if (aneffect.startsWith("Damage")){
        damagePlayer(itemtoHandle.effect)
    } else{
        items.push(itemtoHandle);
    }
};

var getItem = function(loc){
  var current = curr_room;
  var index = 0;
  rooms.forEach(function(x){
      if(x.name == current){
        var itemList = x.roomItems;
         itemList.forEach(function(x){
            if(x.itemLocation == loc){
                index = itemList.indexOf(x);
                itemHandling(x);
                itemLife(x,itemList);
             }})
      }})
};




var itemLife = function (item, rmitms){
  if (item.life == "single")
        var index = rmitms.indexOf(item);
        rmitms.splice(index,1);
};

// This Block of Code deals with the View of the Game
var display_room =function(){
    var $p = document.getElementById("room_dis");
    $p.innerHTML ='';
    var $li = document.createElement('p');
    $li.innerHTML = "Current Room: " + curr_room;
    $li.classList.add('curr_room');
    $p.appendChild($li);
};

var display_health =function(){
    var $ul = document.getElementById("health_display");
    $ul.innerHTML ='';
    var $li = document.createElement('li');
    $li.innerHTML = "Current health: " + playerHealth;
    $li.classList.add('playerHealth');
    $ul.appendChild($li);
};

var display_locations = function(){
    var $p = document.getElementById("hiding_spots");
    // console.log(rooms);
    $p.innerHTML = 'Locations to Explore';
    locations.forEach(function(x){
        var $li = document.createElement('p');
        $li.innerHTML = x;
        $li.classList.add('x');
        $li.addEventListener('click',function (ev){ readArea(x)});
        $p.appendChild($li); 
    });
};

//Used to display the inventory items in the game
// Written by Andy Novocin
var display_items = function(){
    var $p = document.getElementById('item_display');
    $p.innerHTML = 'Inventory';
    console.log(items);
    items.forEach(function(item){
        var $li = document.createElement('p');
        $li.innerHTML = item.name;
        $li.classList.add('item');
        $p.appendChild($li); 
    });
};

var display_rooms = function(){
    var $p = document.getElementById('room_display');
    $p.innerHTML = 'Rooms to Explore';
    // console.log(rooms);
    rooms.forEach(function(x){
        var $li = document.createElement('p');
        $li.innerHTML = x.name;
        $li.classList.add('x.name');
        $li.addEventListener('click',function (ev){ readRoom(x.name)});
        $p.appendChild($li); 
    });
};


// This Block of Code deals with the Model of the Game


// Functions deal with the Player Health aspect of the model
// Parses the Damage Value String to extract the value of the Damage
var parseDamageValue = function(damageString){
  return damageString.substr(-2,2);  
};

// Update the player's Health, Based on Damage Value of the item
var damagePlayer = function(damageItem){
    var damage = parseDamageValue(damageItem);
    playerHealth -= damage;
    // display_health();
    
};

//Used to implement the game logic and listeners
// Function Declaration & first two lines written by Andy Novocin
var appStart = function(){
    
    // console.log(knife.constructor.name);
    initLoc();
    display_locations();
    display_items();
    display_rooms();
    display_health()
    display_room();
};

document.addEventListener("DOMContentLoaded", appStart);