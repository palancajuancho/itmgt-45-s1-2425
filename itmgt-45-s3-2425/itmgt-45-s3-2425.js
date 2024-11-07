/**
 * Relationship status
 *
 * This function describes the relationship that two users have with each other.
 *
 * @param {string} fromMember The subject member
 * @param {string} toMember The object member
 * @param {object} socialGraph The relationship data
 * @returns {string} "follower" if fromMember follows toMember;
 * "followed by" if fromMember is followed by toMember;
 * "friends" if fromMember and toMember follow each other;
 * "no relationship" otherwise.
 */
function relationshipStatus(fromMember, toMember, socialGraph) {
    // Get the list of users that fromMember is following
    var fromFollowing = socialGraph[fromMember]["following"];
    // Get the list of users that toMember is following
    var toFollowing = socialGraph[toMember]["following"];

    // Check if fromMember follows toMember
    var fromFollowsTo = false;
    for (var i = 0; i < fromFollowing.length; i++) {
        if (fromFollowing[i] === toMember) {
            fromFollowsTo = true;
            break;
        }
    }

    // Check if toMember follows fromMember
    var toFollowsFrom = false;
    for (var j = 0; j < toFollowing.length; j++) {
        if (toFollowing[j] === fromMember) {
            toFollowsFrom = true;
            break;
        }
    }

    // Determine the relationship
    if (fromFollowsTo && toFollowsFrom) {
        return "friends";
    } else if (fromFollowsTo) {
        return "follower";
    } else if (toFollowsFrom) {
        return "followed by";
    } else {
        return "no relationship";
    }
}

/**
 * Tic tac toe
 *
 * This function evaluates a Tic Tac Toe game board and returns the winner.
 *
 * @param {Array} board The representation of the Tic Tac Toe board as a square array of arrays.
 * @returns {string} the symbol of the winner, or "NO WINNER" if there is no winner.
 */
function ticTacToe(board) {
    var n = board.length;
    var i, j;

    // Check rows for a win
    for (i = 0; i < n; i++) {
        var rowWin = true;
        var firstCell = board[i][0];
        if (firstCell === '') {
            continue;
        }
        for (j = 1; j < n; j++) {
            if (board[i][j] !== firstCell) {
                rowWin = false;
                break;
            }
        }
        if (rowWin) {
            return firstCell;
        }
    }

    // Check columns for a win
    for (j = 0; j < n; j++) {
        var colWin = true;
        var firstCell = board[0][j];
        if (firstCell === '') {
            continue;
        }
        for (i = 1; i < n; i++) {
            if (board[i][j] !== firstCell) {
                colWin = false;
                break;
            }
        }
        if (colWin) {
            return firstCell;
        }
    }

    // Check main diagonal for a win
    var diagWin = true;
    var firstCell = board[0][0];
    if (firstCell !== '') {
        for (i = 1; i < n; i++) {
            if (board[i][i] !== firstCell) {
                diagWin = false;
                break;
            }
        }
        if (diagWin) {
            return firstCell;
        }
    }

    // Check anti-diagonal for a win
    diagWin = true;
    firstCell = board[0][n - 1];
    if (firstCell !== '') {
        for (i = 1; i < n; i++) {
            if (board[i][n - 1 - i] !== firstCell) {
                diagWin = false;
                break;
            }
        }
        if (diagWin) {
            return firstCell;
        }
    }

    // If no winner, return "NO WINNER"
    return "NO WINNER";
}

/**
 * ETA
 *
 * This function returns how long it will take the shuttle to arrive at a stop after leaving another stop.
 *
 * @param {string} firstStop The stop that the shuttle will leave
 * @param {string} secondStop The stop that the shuttle will arrive at
 * @param {object} routeMap The data describing the routes
 * @returns {Number} The time that it will take the shuttle to travel from firstStop to secondStop
 */
function eta(firstStop, secondStop, routeMap) {
    var totalTime = 0;
    var currentStop = firstStop;
    var maxIterations = Object.keys(routeMap).length * 2; // To prevent infinite loops
    var iterations = 0;

    // Keep traveling until we reach the second stop
    while (currentStop !== secondStop && iterations < maxIterations) {
        var foundNext = false;

        // Find the next leg starting from the current stop
        for (var route in routeMap) {
            var stops = route.split(',');
            if (stops[0] === currentStop) {
                totalTime += routeMap[route]['travel_time_mins'];
                currentStop = stops[1];
                foundNext = true;
                break;
            }
        }

        if (!foundNext) {
            // If there's no next leg, we can't proceed
            return null;
        }

        iterations++;
    }

    // If we've reached the second stop, return the total time
    if (currentStop === secondStop) {
        return totalTime;
    } else {
        // If we couldn't reach the second stop, return null
        return null;
    }
}

