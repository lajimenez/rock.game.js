rock.namespace('rock.scene.engine');

/**
 * Game engine for scene.
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} graphicsEngine
 *
 * @param {rock.game.Repository} repository
 *
 * @constructor
 * @extends rock.game.engine.GameEngine
 *
 * @author Luis Alberto Jiménez
 */
rock.scene.engine.SceneEngine = function (graphicsEngine, repository) {
    var renderEngine = new rock.game.graphics.engine.webgl.RockBasicRenderEngine(graphicsEngine);
    var representationAttendant = new rock.scene.engine.RepresentationAttendant(renderEngine, repository);
    rock.super_(this, [renderEngine, representationAttendant]);
};

rock.extends_(rock.scene.engine.SceneEngine, rock.game.engine.GameEngine);

/**
 * @see rock.game.engine.GameEngine#runLogic
 * @override
 */
rock.scene.engine.SceneEngine.prototype.runLogic = function () {
    var scene = this.world;
    this.lighting = scene.getLightingNode().getLighting();
    this.camera = scene.getCameraNode().getCamera();
    this.renderEngine.setClearColor(scene.getBackgroundColor());
    // result is not used in scene...
    return null;
};

/**
 * Create a node for add an object to the scene
 *
 * IMPORTANT: This function creates adapters that you should release manually.
 * So when you are not gonna use a ModelNode anymore, you should call 'releaseResources()' method on it.
 *
 * @param {rock.game.graphics.model.Model} model
 *
 * @returns {rock.scene.node.ModelNode}
 */
rock.scene.engine.SceneEngine.prototype.createModelNode = function (model) {
    var modelNode = new rock.scene.node.ModelNode(this.world);
    var representation = this.createRepresentation(modelNode);
    representation.createRenderablesFromModel(model);

    modelNode.setRepresentation(representation);
    return modelNode;
};

/**
 * Create a node for set lighting to the scene
 *
 * @param {rock.game.graphics.scene.Lighting} lighting
 *
 * @returns {rock.scene.node.LightingNode}
 */
rock.scene.engine.SceneEngine.prototype.createLightingNode = function (lighting) {
    var lightNode = new rock.scene.node.LightingNode();
    lightNode.setLighting(lighting);
    return lightNode;
};

/**
 * Create a node for set a camera to the scene
 *
 * @param {rock.game.graphics.scene.Camera} camera
 *
 * @returns {rock.scene.node.CameraNode}
 */
rock.scene.engine.SceneEngine.prototype.createCameraNode = function (camera) {
    var cameraNode = new rock.scene.node.CameraNode();
    cameraNode.setCamera(camera);
    return cameraNode;
};

rock.scene.engine.SceneEngine.prototype.setRendererContextId = function (rendererContextId) {
    this.renderEngine.setActiveRendererContext(rendererContextId);
};