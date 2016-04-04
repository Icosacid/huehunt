/**
 * JS for Hue Hunt Results
 *
 * @author Alexandre Andrieux <alex@icosacid.com>
 * @since 03-2016
 */

var rounds;
var players = [];

rounds = {
  "KBxE015HXj3bV0jEenb" : {
    "performance" : "41",
    "roundLevel" : "1",
    "targetH" : "268",
    "targetL" : "50",
    "targetS" : "100",
    "username" : "Lindrox"
  },
  "KBxEDPJXxshVCk0Sl1t" : {
    "performance" : "62",
    "roundLevel" : "1",
    "targetH" : "26",
    "targetL" : "50",
    "targetS" : "100",
    "username" : "Lindrox"
  },
  "KCu4Ucc0bW5kjMf3mY1" : {
    "performance" : "59",
    "roundLevel" : "1",
    "targetH" : "318",
    "targetL" : "50",
    "targetS" : "100",
    "username" : "Icosacid"
  }
};

var myFirebaseRef = new Firebase("https://blistering-torch-4182.firebaseio.com/rounds");

myFirebaseRef.on("value", function(data) {
  rounds = data.val();
  getData();
  buildUI();
  showUI();
});


function getData() {
  // Remove scores that are not for this level
  var thisLevelRounds = _.filter(rounds, function(value) {
    return value.roundLevel == 1;
  });

  // Sort them by ascending performance
  var sortedRounds = _.sortBy(thisLevelRounds, function(value) {
    return parseInt(value.performance);
  });
  // Put the best performances on top
  sortedRounds = sortedRounds.reverse();

  // Pick the very bests
  var bestRounds = sortedRounds.splice(0, 10);
  console.log(bestRounds);

  // Content-1 - Players
  for (var prop in rounds) {
    // Get username
    var username = rounds[prop].username;
    // Check if already in players
    var alreadyInPlayers = false;
    for (var j = 0; j < players.length; j++) {
      if (username == players[j]) {
        alreadyInPlayers = true;
      }
    }
    // If so, don't add player to list, otherwise do
    if (!alreadyInPlayers) {
      players.push(username);
    }
  }
}

function buildUI() {
  // Content-1 - Players
  jQuery('.content-1 .tile-container:nth-of-type(1) .data-data p').html(players.length);
  // Content-1 - Rounds
  console.log(rounds);
  jQuery('.content-1 .tile-container:nth-of-type(2) .data-data p').html(Object.keys(rounds).length);
  // ...

}
function showUI() {
  // Undo loading icon
  jQuery('.huehunt-results .loading-icon').css('display', 'none');
  // Display UI
  jQuery('.huehunt-results .side-menu').show();
  jQuery('.huehunt-results .content').show();
  // Show first tab content
  jQuery('.huehunt-results .content .content-1').show();
  jQuery('.huehunt-results .side-menu p.tab:nth-of-type(1)').addClass('selected');
}

jQuery(document).ready(function() {
  // Menu tabs
  jQuery('.huehunt-results').on('click', '.side-menu p.tab', function() {
    var tabNumber = 1 + jQuery(this).index('.side-menu p.tab');
    // Show according content
    jQuery('.huehunt-results .content > div').hide();
    jQuery('.huehunt-results .content .content-' + tabNumber).show();
    // Highlight clicked tab
    jQuery('.huehunt-results .side-menu p.tab').removeClass('selected');
    jQuery(this).addClass('selected');
  });
});
