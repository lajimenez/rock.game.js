rock.namespace('rock.game.engine');

/**
 * This class should be responsible to set the game to its correct point in game's history.
 * Also is responsible for setting correct window.
 *
 * @param {rock.window.WindowSystem} windowSystem
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.engine.GameDirector = function (windowSystem) {
    this.windowSystem = windowSystem;
};

/**
 * Start the game. It will usually means that the window running game will be shown.
 *
 * @function
 */
rock.game.engine.GameDirector.prototype.start = rock.abstract_;

/**
 * Resume the game.
 *
 * @function
 */
rock.game.engine.GameDirector.prototype.resume = rock.abstract_;

/**
 * Load the game. From where and how it's up to the developer.
 *
 * @function
 */
rock.game.engine.GameDirector.prototype.load = rock.abstract_;

/**
 * Load the game. Where and how it's up to the developer.
 *
 * @function
 */
rock.game.engine.GameDirector.prototype.save = rock.abstract_;

/**
 * Handle the game state so we can decide we have to show another window (for example, end of game window)
 *
 * @param {rock.game.engine.GameState} gameState
 * @function
 */
rock.game.engine.GameDirector.prototype.handleGameState = rock.abstract_;