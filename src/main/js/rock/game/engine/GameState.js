rock.namespace('rock.game.engine');

/**
 * This class store the state of the game after run logic.
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.game.engine.GameState = function () {
    // All event happened while running world logic can be registered here
    // so the engine could execute actions on each event
    this.events = new rock.js.Array();
    this.result = rock.game.engine.GameState.IS_RUNNING;
};

rock.game.engine.GameState.IS_RUNNING = 0;

rock.game.engine.GameState.FINISH_GAME = 1;

/**
 * Clear events. Call it at the beginning of the run logic loop
 */
rock.game.engine.GameState.prototype.clearEvents = function () {
    this.events.clear();
};

/**
 * Get the events
 */
rock.game.engine.GameState.prototype.getEvents = function() {
    return this.events;
};

/**
 * Get the result
 */
rock.game.engine.GameState.prototype.getResult = function() {
    return this.result;
};

/**
 * Set the result
 *
 * @param result the value
 */
rock.game.engine.GameState.prototype.setResult = function(result) {
    this.result = result;
};
