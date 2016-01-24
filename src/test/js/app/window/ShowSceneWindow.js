rock.namespace('app.window');

/**
 * Show model window
 *
 * @constructor
 * @extends rock.scene.SceneEngineWindow
 *
 * @author Luis Alberto Jiménez
 */
app.window.ShowSceneWindow = function (windowSystem) {
    var graphicsEngine = windowSystem.getGraphicsEngine();
    var repository = windowSystem.getApplication().getRepository();
    var sceneEngine = new app.engine.ShowSceneSceneEngine(graphicsEngine, repository);
    rock.super_(this, [windowSystem, sceneEngine]);
};

rock.extends_(app.window.ShowSceneWindow, rock.scene.SceneEngineWindow);

app.window.ShowSceneWindow.prototype.loadScene = function () {
    this.gameEngine.loadScene();
};