var maxLevel = 50;
var level = 1;
var spentPoints = 0;

var baseMelee = 0;
var baseArmor = 0;
var baseHealth = 200;
var baseRanged = 0;
var baseStamina = 100;
var baseEncumbrance = 70;
var baseSustenance = 0;

var stats = {};
stats["strength"] = 0;
stats["agility"] = 0;
stats["vitality"] = 0;
stats["accuracy"] = 0;
stats["grit"] = 0;
stats["encumbrance"] = 0;
stats["survival"] = 0;

var attributes = {};
attributes["melee"] = baseMelee;
attributes["armor"] = baseArmor;
attributes["health"] = baseHealth;
attributes["ranged"] = baseRanged;
attributes["stamina"] = baseStamina;
attributes["encumbrance"] = baseEncumbrance;
attributes["sustenance"] = baseSustenance;

var attributeEffects = {};
attributeEffects["strength"] = "melee";
attributeEffects["agility"] = "armor";
attributeEffects["vitality"] = "health";
attributeEffects["accuracy"] = "ranged";
attributeEffects["grit"] = "stamina";
attributeEffects["encumbrance"] = "encumbrance";
attributeEffects["survival"] = "sustenance";

var statWeights = {};
statWeights["melee"] = 0;
statWeights["armor"] = 1;
statWeights["health"] = 12;
statWeights["ranged"] = 0;
statWeights["stamina"] = 3;
statWeights["encumbrance"] = 7;
statWeights["sustenance"] = 0;

$(document).ready(function()
{
  document.getElementById("level-value").innerHTML = level;
  document.getElementById("points-value").innerHTML = spentPoints;

  document.getElementById("strength-value").innerHTML = 0;
  document.getElementById("agility-value").innerHTML = 0;
  document.getElementById("vitality-value").innerHTML = 0;
  document.getElementById("accuracy-value").innerHTML = 0;
  document.getElementById("grit-value").innerHTML = 0;
  document.getElementById("encumbrance-value").innerHTML = 0;
  document.getElementById("survival-value").innerHTML = 0;

  document.getElementById("attribute-melee-value").innerHTML = baseMelee;
  document.getElementById("attribute-armor-value").innerHTML = baseArmor;
  document.getElementById("attribute-health-value").innerHTML = baseHealth;
  document.getElementById("attribute-ranged-value").innerHTML = baseRanged;
  document.getElementById("attribute-stamina-value").innerHTML = baseStamina;
  document.getElementById("attribute-encumbrance-value").innerHTML = baseEncumbrance;
  document.getElementById("attribute-sustenance-value").innerHTML = baseSustenance;

  document.getElementById("str-button-inc").addEventListener("click", function(){ increaseStat("strength"); });
  document.getElementById("str-button-dec").addEventListener("click", function(){ decreaseStat("strength"); });

  document.getElementById("agi-button-inc").addEventListener("click", function(){ increaseStat("agility"); });
  document.getElementById("agi-button-dec").addEventListener("click", function(){ decreaseStat("agility"); });

  document.getElementById("vit-button-inc").addEventListener("click", function(){ increaseStat("vitality"); });
  document.getElementById("vit-button-dec").addEventListener("click", function(){ decreaseStat("vitality"); });

  document.getElementById("acc-button-inc").addEventListener("click", function(){ increaseStat("accuracy"); });
  document.getElementById("acc-button-dec").addEventListener("click", function(){ decreaseStat("accuracy"); });

  document.getElementById("gri-button-inc").addEventListener("click", function(){ increaseStat("grit"); });
  document.getElementById("gri-button-dec").addEventListener("click", function(){ decreaseStat("grit"); });

  document.getElementById("enc-button-inc").addEventListener("click", function(){ increaseStat("encumbrance"); });
  document.getElementById("enc-button-dec").addEventListener("click", function(){ decreaseStat("encumbrance"); });

  document.getElementById("sur-button-inc").addEventListener("click", function(){ increaseStat("survival"); });
  document.getElementById("sur-button-dec").addEventListener("click", function(){ decreaseStat("survival"); });

  document.getElementById("reset-button").addEventListener("click", resetAll);
});

function resetAll()
{
  for (var stat in stats)
  {
    stats[stat] = 0;
    document.getElementById(stat + "-value").innerHTML = 0;
  }

  attributes["health"] = baseHealth;
  attributes["stamina"] = baseStamina;
  attributes["armor"] = baseArmor;
  attributes["encumbrance"] = baseEncumbrance;
  document.getElementById("attribute-health-value").innerHTML = baseHealth;
  document.getElementById("attribute-stamina-value").innerHTML = baseStamina;
  document.getElementById("attribute-armor-value").innerHTML = baseArmor;
  document.getElementById("attribute-encumbrance-value").innerHTML = baseEncumbrance;

  level = 1;
  spentPoints = 0;
  document.getElementById("level-value").innerHTML = level;
  document.getElementById("points-value").innerHTML = spentPoints;
}

function getStatCost(value)
{
  return parseInt(value / 5) + 1;
}

function getLevelByPoints(value)
{
  var tempValue = value;
  var level = 0;

  var i = 1;
  while (tempValue > 0)
  {
    tempValue -= parseInt(i++ / 5) + 1;
    level++;
  }

  if (level <= 0)
    level = 1;

  return level;
}

function getProgress(stat)
{
  return progress = (stats[stat] / 50) * 100;
}

function setProgress(stat, value)
{
  var progress = getProgress(stat);

  document.getElementById("progress-" + stat).style.width = progress + "%";
}

function increaseStat(stat)
{
  var cost = getStatCost(stats[stat]);

  if (level < 50)
  {
    spentPoints += cost;
    stats[stat]++;
    var levelReq = getLevelByPoints(spentPoints);
    level = levelReq;
    document.getElementById(stat + "-value").innerHTML = stats[stat];
    document.getElementById("points-value").innerHTML = spentPoints;
    document.getElementById("level-value").innerHTML = level;

    var attribute = attributeEffects[stat];
    document.getElementById("attribute-" + attribute + "-value").innerHTML = attributes[attribute] + (statWeights[attribute] * stats[stat]);
    setProgress(stat);
  }
}

function decreaseStat(stat)
{
  var cost = getStatCost(stats[stat] - 1);

  if (stats[stat] > 0)
  {
    spentPoints -= cost;
    stats[stat]--;
    var levelReq = getLevelByPoints(spentPoints);
    level = levelReq;
    document.getElementById(stat + "-value").innerHTML = stats[stat];
    document.getElementById("points-value").innerHTML = spentPoints;
    document.getElementById("level-value").innerHTML = level;

    var attribute = attributeEffects[stat];
    document.getElementById("attribute-" + attribute + "-value").innerHTML = attributes[attribute] + (statWeights[attribute] * stats[stat]);
    setProgress(stat);
  }
}