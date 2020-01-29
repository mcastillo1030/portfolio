/*
 * This program is a simple sliding tile puzzle game.
 * It uses multiple decision structures and iterative statements
 * to achieve its logic. 
 * @author  Marlon Castillo-Lopez
 * @date    March 2019
 */

$(document).ready(function() {
   var seconds = 0, minutes = 0;
   var time;
   var clicks = 0;   // This variable counts the number of clicks on the tiles.
   var images = $("div.tile img").toArray();    // Array contains all images from puzzle grid
   

   // The following code shuffles the images on the page
   // after a five (5) second delay.
   setTimeout(function () {
      var imgAry = shuff(images.slice()); // call function to shuffle
      for (var i = 0; i < imgAry.length; i++) {
         place_back($("div.tile")[i],imgAry[i]);   // put images back on page
      }

      // The click event handler for the puzzle tiles. 
      $(".tile").on("click", function(event) {
         clicks++;
         if (clicks == 1) {
            startTimer();  // Start the timer on the first click
         }

         //get blank image & its index
         var blankImg = $("#blank");
         var blankIndex = $("div.tile img").index(blankImg);
         var blankTile = $("div.tile").get(blankIndex);

         //get current image & its index
         var curIndex = $("div.tile").index(this);
         var curImg = $("div.tile img").get(curIndex);
         
         var adjacent = testAdj(curIndex, blankIndex);

         if (adjacent){
            place_back($(this), blankImg);
            place_back(blankTile, curImg);
         } // end if

         is_solved();   // Check if puzzle is solved
      }); // end click event handler on div of class=tile
   }, 5000);

   // This function tests whether a tile is adjacent to 
   // the blank tile and returns a boolean value to 
   // represent whether a swap is possible.
   function testAdj(cur, blank) {
      var result = false;
      var diff = blank - cur;

      if((cur === 4) || (blank === 4)){
      //if(cur === 4){
         if (diff < 0){
            diff *= -1;
         }

         if((diff === 1) || (diff === 3)){
            result = true;
         }
      }else if(diff === -1){
         if((blank === 0) || (blank === 1) ||
            (blank === 6) || blank === 7){
            result = true;
         }
      }else if (diff === -3){
         if((blank === 0) || (blank === 2) ||
            (blank === 3) || (blank === 5)){
            result = true;
         }
      }else if (diff === 1){
         if((blank === 1) || (blank === 2) ||
            (blank === 7) || (blank === 8)){
            result = true;
         }
      } else if(diff === 3){
         if((blank === 3) || (blank === 5) ||
            (blank === 6) || (blank === 8)){
            result = true;
         }
      }

      return result;
   }

   // This function shuffles an array effectively. This is an adaptation
   // of the Durstenfeld shuffle algorithm.
   function shuff(array) {
      for (var i = array.length - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var temp = array[i];
         array[i] = array[j];
         array[j] = temp;
      }

      return array;
   }

   // This function inserts the DOM object represented by the 
   // parameter obj into the node represented by
   // the parameter into. 
   function place_back(into, obj) {
      into.append(obj);
   }

   // This function handles the timer on the page by updating
   // with the current elapsed time. 
   function startTimer() {
      time = setInterval(function() {
         seconds++;
         if (seconds >= 60) {
            minutes++;
            seconds = 0;
         }
         $("#timer").text(minutes + "m " + seconds + "s");
      }, 1000);
   }

   // This function stop the timer 
   function stopTimer() {
      clearInterval(time);
   }

   // This function checks whether the puzzle has been solved
   // and if it is, prevents any more swaps, then stops the timer.
   // Lastly, it displays results for the current puzzle run.
   function is_solved() {
      var current = $("div.tile img").toArray();
      var count = 0;

      for (var i = 0; i < current.length; i++) {
         if (current[i].outerHTML === images[i].outerHTML) {
            count++;
         }//end nested if
      }// end for

      if (count == current.length) {
         $(".tile").off("click");
         stopTimer();
         var msg = "<p>Congratulations! You solved the puzzle in " + clicks + " moves.</p>";
         $("#timer").after(msg);
      }// end if
   }
});

function refresh() {
   location.reload();
}