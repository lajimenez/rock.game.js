rock.namespace('rock.game');

/**
 * Window prepared for drawing a game.
 *
 * @param {rock.window.WindowSystem} windowSystem
 *            the window system
 * @param {rock.game.engine.GameDirector} gameDirector
 *            the game director
 * @param {rock.game.engine.GameEngine} gameEngine
 *            the game engine
 *
 * @constructor
 * @abstract
 * @extends rock.game.GameWindow
 *
 * @author Luis Alberto Jiménez
 */
rock.game.GameEngineWindow = function (windowSystem, gameDirector, gameEngine) {
    rock.super_(this, [windowSystem, gameDirector]);
    this.gameEngine = gameEngine;
    this.gameEngine.setWindow(this);
};

rock.extends_(rock.game.GameEngineWindow, rock.game.GameWindow);

/**
 * @see rock.graphics.engine.IDrawable#draw
 * @override
 */
rock.game.GameEngineWindow.prototype.draw = function (graphicsEngine) {
    var gameState = this.gameEngine.update();
    this.drawUI(graphicsEngine);
    this.gameDirector.handleGameState(gameState);
};

rock.game.GameEngineWindow.prototype.start = function () {
    rock.timer.registerTimerFunction(this, this.redraw, []);
    rock.timer.start();
};

rock.game.GameEngineWindow.prototype.stop = function () {
    rock.timer.unregisterTimerFunction(this.redraw);
    rock.timer.stop();
};