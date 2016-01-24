rock.namespace('rock.scene');

/**
 * Window for drawing a scene.
 *
 * @param windowSystem
 *            the window system
 * @param {rock.scene.engine.SceneEngine} sceneEngine
 *            the scene engine
 *
 * @constructor
 * @abstract
 * @extends rock.game.GameEngineWindow
 *
 * @author Luis Alberto Jiménez
 */
rock.scene.SceneEngineWindow = function (windowSystem, sceneEngine) {
    var scene = new rock.scene.Scene(sceneEngine);
    sceneEngine.setWorld(scene);
    var sceneDirector = new rock.scene.engine.SceneDirector(this.windowSystem);
    rock.super_(this, [windowSystem, sceneDirector, sceneEngine]);
};

rock.extends_(rock.scene.SceneEngineWindow, rock.game.GameEngineWindow);