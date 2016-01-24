rock.namespace('rock.game');

/**
 * This class represents a game. A game is a kind of application.
 *
 * @param {rock.app.InitApplicationParams} initParams
 *            params for initialization
 *
 * @constructor
 * @abstract
 * @extends rock.app.Application
 *
 * @author Luis Alberto Jiménez
 */
rock.game.Game = function (initParams) {
    rock.super_(this, arguments);
    this.repository = new rock.game.Repository();
};

rock.extends_(rock.game.Game, rock.app.Application);

/**
 * Get the repository
 */
rock.game.Game.prototype.getRepository = function() {
    return this.repository;
};

/**
 * Set the repository
 *
 * @param repository the value
 */
rock.game.Game.prototype.setRepository = function(repository) {
    this.repository = repository;
};