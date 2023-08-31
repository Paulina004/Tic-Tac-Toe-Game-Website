/*
The code for the tic tac toe mechanics was not created by myself. The source for this code can be found at the link that is provided below:

https://jsfiddle.net/rtoal/ThPEH/


The small changes that I have personally made to this code and were NOT provided in the original source's code can be found by looking for comments that say:

ADDED CODE
*/



/*
 * A complete tic-tac-toe widget, using JQuery.  Just include this 
 * script in a browser page and play.  A tic-tac-toe game will be 
 * included as a child element of the element with id "tictactoe".  
 * If the page has no such element, it will just be added at the end 
 * of the body.
 */
$(function () {

    var squares = [], 
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",

    /*
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */
    wins = [7, 56, 448, 73, 146, 292, 273, 84],

    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */
    startNewGame = function () {
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        squares.forEach(function (square) {square.html(EMPTY);});
    },

    /*
     * Returns whether the given score is a winning score.
     */
    win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },

    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    set = function () {
        
        if ($(this).html() !== EMPTY) {
            return;
        }
        $(this).html(turn);
        console.log($(this));
        moves += 1;
        score[turn] += $(this)[0].indicator;
        console.log(score[turn]);
        if (win(score[turn])) {
            //alert(turn + " wins!");
            
            //ADDED CODE
            if (turn == "X")
            {
                $('#results').empty();
                $('#results').append('<div class="winner">X won the last game!</div>');
            }
            
            if (turn == "O")
            {
                $('#results').empty();
                $('#results').append('<div class="winner">O won the last game!</div>');
            }
            //END OF ADDED CODE

            startNewGame();
        } else if (moves === SIZE * SIZE) {
            //alert("There was a tie.");
            
            //ADDED CODE
            $('#results').empty();
            $('#results').append('<div class="winner">The last game ended in a tie.</div>')
            //END OF ADDED CODE
            
            startNewGame();
        } else {
            turn = turn === "X" ? "O" : "X";
        }
    },

    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    play = function () {
        var board = $("<table border=1 cellspacing=0>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td class=tdfix height=50 width=50 align=center valign=center></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }

        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    };

    play();
});