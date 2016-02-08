var items = ["Stake", "Knife", "Garage Key","Chainsaw"];
var rooms = ["Kitchen", "Bedroom", "Foyer","Bathroom"];

var use_item = function(item){
    var index_of_item = items.indexOf(item);
    if (index_of_item == -1){
        console.log("no such item, adding it");
        items.push(item);
    } else {
        console.log("Using item " + items[index_of_item]);
    }
};

var readInput = function(){
    use_item(document.getElementById('InvSelect').value);
    display_items();
};

var display_items = function(){
    var $ul = document.getElementById('item_display');
    $ul.innerHTML = '';
    items.forEach(function(item){
        var $li = document.createElement('li');
        $li.innerHTML = item;
        $li.classList.add('item');
        $ul.appendChild($li); 
    });
};


var appStart = function(){
    display_items();
    document.getElementById('InvSel').addEventListener('click', readInput);
};


document.addEventListener("DOMContentLoaded", appStart);