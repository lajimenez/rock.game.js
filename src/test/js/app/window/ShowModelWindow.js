rock.namespace('app.window');

/**
 * Show model window
 *
 * @constructor
 * @extends rock.scene.SceneEngineWindow
 *
 * @author Luis Alberto Jiménez
 */
app.window.ShowModelWindow = function (windowSystem) {
    var graphicsEngine = windowSystem.getGraphicsEngine();
    var repository = windowSystem.getApplication().getRepository();
    var sceneEngine = new app.engine.ShowModelSceneEngine(graphicsEngine, repository);
    rock.super_(this, [windowSystem, sceneEngine]);
};

rock.extends_(app.window.ShowModelWindow, rock.scene.SceneEngineWindow);

app.window.ShowModelWindow.prototype.loadAndShowTextureModel = function (JSONModelList) {
    this.gameEngine.loadAndShowTextureModel(JSONModelList);
};

app.window.ShowModelWindow.prototype.loadAndShowMaterialModel = function (JSONModelList) {
    this.gameEngine.loadAndShowMaterialModel(JSONModelList);
};

app.window.ShowModelWindow.prototype.loadAndShowMaterialTextureModel = function (JSONModelList) {
    this.gameEngine.loadAndShowMaterialTextureModel(JSONModelList);
};
