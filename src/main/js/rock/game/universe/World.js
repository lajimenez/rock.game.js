rock.namespace('rock.game.universe');

/**
 * Represents a world. A world is a game 'happen'. It's is composed from game objects
 * {@link rock.game.universe.Object}
 *
 * @param {rock.game.engine.GameEngine} gameEngine
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.universe.World = function (gameEngine) {
    this.gameEngine = gameEngine;
};

/**
 * Get the gameEngine
 */
rock.game.universe.World.prototype.getGameEngine = function() {
    return this.gameEngine;
};

/**
 *
 * @param {rock.game.engine.GameState} gameState
 *
 */
rock.game.universe.World.prototype.runLogic = rock.abstract_;