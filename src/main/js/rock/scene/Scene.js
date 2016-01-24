rock.namespace('rock.scene');

/**
 * Scene main object.
 *
 * @param {rock.game.engine.GameEngine} gameEngine
 *
 * @constructor
 * @extends rock.game.universe.World
 *
 *
 * @author Luis Alberto Jiménez
 */
rock.scene.Scene = function (gameEngine) {
    rock.super_(this, arguments);
    this.lightingNode = null;
    this.cameraNode = null;
    this.modelNodes = [];
    this.backgroundColor = new rock.graphics.Color(150, 150, 150);
};

rock.extends_(rock.scene.Scene, rock.game.universe.World);


/**
 * Create a new model node
 *
 * @param {rock.game.graphics.model.Model} model
 *
 * @returns {rock.scene.node.ModelNode}
 */
rock.scene.Scene.prototype.createModelNode = function (model) {
    return this.gameEngine.createModelNode(model);
};

/**
 * Create a new lighting node
 *
 * @param {rock.game.graphics.scene.Lighting} lighting
 *
 * @returns {rock.scene.node.LightingNode}
 */
rock.scene.Scene.prototype.createLightingNode = function (lighting) {
    return this.gameEngine.createLightingNode(lighting);
};

/**
 * Create a new camera node
 *
 * @param {rock.game.graphics.scene.Camera} camera
 *
 * @returns {rock.scene.node.CameraNode}
 */
rock.scene.Scene.prototype.createCameraNode =  function (camera) {
    return this.gameEngine.createCameraNode(camera);
};

/**
 * Set the lighting node to use in the scene
 *
 * @param {rock.scene.node.LightingNode} lightingNode
 */
rock.scene.Scene.prototype.setLightingNode = function (lightingNode) {
    this.lightingNode = lightingNode;
};

/**
 * Get the lighting node used in the scene
 *
 * @returns {rock.scene.node.LightingNode}
 */
rock.scene.Scene.prototype.getLightingNode = function () {
    return this.lightingNode;
};

/**
 * Set the camera node to use in the scene
 *
 * @param {rock.scene.node.CameraNode} cameraNode
 */
rock.scene.Scene.prototype.setCameraNode = function (cameraNode) {
    this.cameraNode = cameraNode;
};

/**
 * Get the camera node used in the scene
 *
 * @returns {rock.scene.node.CameraNode}
 */
rock.scene.Scene.prototype.getCameraNode = function () {
    return this.cameraNode;
};

/**
 * Get all model nodes
 *
 * @returns {Array} models
 */
rock.scene.Scene.prototype.getModelNodes = function () {
    return this.modelNodes;
};

/**
 * Add a new model node to the scene
 *
 * @param {rock.scene.node.ModelNode} modelNode
 */
rock.scene.Scene.prototype.addModelNode = function (modelNode) {
    this.modelNodes.push(modelNode);
};

/**
 * Remove a model from the scene
 *
 * @param {rock.scene.node.ModelNode} modelNode
 */
rock.scene.Scene.prototype.removeModelNode = function (modelNode) {
    rock.util.JsUtils.removeByValueFromArray(this.modelNodes, modelNode);
};

rock.scene.Scene.prototype.setRendererContextId = function (rendererContextId) {
    this.gameEngine.setRendererContextId(rendererContextId);
};

/**
 * Get the backgroundColor
 */
rock.scene.Scene.prototype.getBackgroundColor = function() {
    return this.backgroundColor;
};

/**
 * Set the backgroundColor
 *
 * @param backgroundColor the value
 */
rock.scene.Scene.prototype.setBackgroundColor = function(backgroundColor) {
    this.backgroundColor = backgroundColor;
};