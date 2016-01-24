rock.namespace('rock.game');

/**
 * Window to use in a Game. This should be the base class for windows in game.
 *
 * @param windowSystem
 *            the window system
 * @param gameDirector
 *            the game director
 *
 * @constructor
 * @abstract
 * @extends rock.window.Window
 *
 * @author Luis Alberto Jiménez
 */
rock.game.GameWindow = function (windowSystem, gameDirector) {
    rock.super_(this, [windowSystem]);
    this.gameDirector = gameDirector;
};

rock.extends_(rock.game.GameWindow, rock.window.Window);