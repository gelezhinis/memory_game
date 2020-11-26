const boxes = ['red', 'orange', 'salmon', 'blue', 'green', 'gold', 'black', 'brown'];
const game = {};

$('.start-btn').click(startGame);

$('.game').on('click', '.active', function() {
   // console.log($(this).data('value'));
   if (!game.pause) {
      game.clicks++;
      $('.score').text('Clicks: '+game.clicks+'');
      game.selectedCards.push($(this));
      $(this).removeClass('active');
      $(this).find('.back').hide();
      $(this).find('.front').show();

      if (game.selectedCards.length == 2) {
         // console.log(game.selectedCards);
         // check match
         if (game.selectedCards[0].data('value') == 
            game.selectedCards[1].data('value')) {
               // console.log('match');
               game.pause = false;
               removeItems(game.selectedCards[0].data('value'));
               game.selectedCards = [];
               // console.log('doesn\'t match');
               if (game.newArray.length == 0) {
                  gameOver();
               }
            } else {
               game.pause = true;
               game.timer = setInterval(hideCard, 600);
            }
      }
   }
});

function startGame() {
   // console.log('start');
   $('.start-btn').hide();
   game.clicks = 0;
   game.pause = false;
   game.selectedCards = [];
   game.newArray = boxes.concat(boxes);
   // console.log(game.newArray);
   arrayRandomize(game.newArray);
   $('.game').html('');
   $.each(game.newArray, function(key, value) {
      // console.log(key);
      // console.log(value);
      let box = $('<div>');
      // console.log(box);
      box.addClass('box active');
      box.data('count', key + 1);
      box.data('value', value);
      let back = $('<div>');
      back.addClass('back');
      back.html(key + 1);
      box.append(back);
      let front = $('<div>');
      front.addClass('front');
      front.css('background-color', value);
      front.text('.');
      box.append(front);
      
      $('.game').append(box);
   });
}

function arrayRandomize(arr) {
   arr.sort(function() {
      return 0.5 - Math.random();
   });
}

function removeItems(color) {
   // console.log(game.newArray);
   game.newArray = game.newArray.filter(function(el) {
      return el != color;
   });
   // console.log(game.newArray);
}

function hideCard() {
   // console.log('no match');  
   flipper(game.selectedCards[0]);
   flipper(game.selectedCards[1]);

   clearInterval(game.timer);
   game.selectedCards = [];
   game.pause = false;
}

function flipper(el) {
   el.addClass('active');
   el.find('.back').show();
   el.find('.front').hide();
}

function gameOver() {
    // console.log('Game Over');
    $('.score').text('You win with '+game.clicks+' clicks');
    $('.game').hide();
    $('.start-btn').show().on('click', startAgain);
}

function startAgain() {
   $('.game').show();
   $('.score').text('');
   startGame();
}