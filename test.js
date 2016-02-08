
var appStart = function(){
    console.log(items.length);
    // alert("HI");
document.getElementById('test').addEventListener('click',function(ev)
{ 
    alert ("You selected " + document.getElementById('anum').value);
    
});

// var $ul = document.createElement('ul');
// $ul.id = "inventory";
// items.forEach(function(name){
//   var $inventor = document.createElement('li');
//   $inventor.innerHTML = name;
//   $inventor.classList.add("name");
//   $ul.appendChild($inventor);
// });
// document.body.appendChild($ul);


roomInit();
//updateItem();
renderItems();

}

var items = ["Stake", "Knife", "Garage Key","Chainsaw"];


var renderItems = function(){
    // alert("hi");
// var item = getElementsByName("items");
    // var $item = document.createElement('ul');
var $ul = document.createElement('ul');
$ul.id = "inventory";
items.forEach(function(name){
  var $inventor = document.createElement('li');
  $inventor.innerHTML = name;
  $inventor.classList.add("name");
  $ul.appendChild($inventor);
});
document.body.appendChild($ul);
    
}


var buttonTest = function(){
    // alert("HI");
document.getElementById('InvSel').addEventListener('click',function(ev)
{ 
    alert ("You selected " + document.getElementById('InvSelect').value);
    
});

    var invName = document.getElementById("InvSelect").value;
    updateInventory(invName);
    console.log(items.length);
}






var updateInventory = function(name){
//     // var invName = document.getElementById("InvSelect").value;
//     var $ul = document.getElementsByName("inventory");
//     // getElementById('ul');
//     // $ul.id = "inventory";
//   var $inventor = document.createElement('li')
//   $inventor.innerHTML = name;
//   $inventor.classList.add(name);
//   $ul.appendChild($inventor);
  items.push(name);
//   console.log(items.length);
}

document.addEventListener("DOMContentLoaded",appStart);
document.addEventListener("DOMContentLoaded",roomInit);


document.getElementById("InvSel").addEventListener('Click', buttonTest );



document.addEventListener("DOMContentLoaded",buttonTest);

// document.addEventListener("change", updateInventory);

document.addEventListener("DOMContentLoaded", updateInventory);





var roomInit = function(){
    
var rooms = ["Kitchen", "Bedroom", "Foyer","Bathroom"];

// var $item = document.createElement('ul');
var $ul = document.createElement('ul');
$ul.id = "rooms";
rooms.forEach(function(name){
  var $roomLoc = document.createElement('li');
  $roomLoc.innerHTML = name;
  $roomLoc.classList.add("name");
  $ul.appendChild($roomLoc);
});
document.body.appendChild($ul);
    // return "Test";
}



var updateItem = function(name){
    var $ul = document.getElementById("li");
    $ul.classList.remove("Knife");
    $ul.removeChild("Knife");
}

