
// var item = 
function item(name,itloc,effect){
    this.name = name;
    this.itemLocation = itloc;
    this.effect = effect;
    this.life = setLife(name);
};

// var trap = 
function trap(name, itloc){
  this.name = name;
  this.itemLocation = itloc;
  this.effect = "Damage " + damageValue();
  this.life = setLife(name);
};

var damageValue = function(){
  return Math.floor(Math.random() * 10);  
};

var setLife = function(name){
  if( (name == "chain") || (name == "cutters") )
    return "forever";
  else
    return "single";
};