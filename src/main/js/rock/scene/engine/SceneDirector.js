rock.namespace('rock.scene.engine');

/**
 * Game director for scene.
 *
 * @constructor
 * @extends rock.game.engine.GameDirector
 *
 * @author Luis Alberto Jiménez
 */
rock.scene.engine.SceneDirector = function (windowSystem) {
    rock.super_(this, arguments);
};

rock.extends_(rock.scene.engine.SceneDirector, rock.game.engine.GameDirector);

rock.scene.engine.SceneDirector.prototype.start = function () {};

rock.scene.engine.SceneDirector.prototype.resume = function () {};

rock.scene.engine.SceneDirector.prototype.load = function () {};

rock.scene.engine.SceneDirector.prototype.save = function () {};

rock.scene.engine.SceneDirector.prototype.handleGameState = function () {};