rock.namespace('rock.game.graphics.engine.renderer');

/**
 * This class represents the state of a model that is going to be renderer. 'Representation' class
 * must be responsible to set the values as expected.
 *
 * Why there is a modelType here if models also have its modelType? Well, this way the representation
 * has the possibility to change the renderer to use (this could be discussed...)
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.ModelRenderable = function () {
    this.model = null;
    this.modelType = null;
    this.modelMatrix = new rock.geometry.Matrix4();
};

/**
 * Get the model
 */
rock.game.graphics.engine.renderer.ModelRenderable.prototype.getModel = function() {
    return this.model;
};

/**
 * Set the model
 *
 * @param model the value
 */
rock.game.graphics.engine.renderer.ModelRenderable.prototype.setModel = function(model) {
    this.model = model;
};

/**
 * Get the modelType
 */
rock.game.graphics.engine.renderer.ModelRenderable.prototype.getModelType = function() {
    return this.modelType;
};

/**
 * Set the modelType
 *
 * @param modelType the value
 */
rock.game.graphics.engine.renderer.ModelRenderable.prototype.setModelType = function(modelType) {
    this.modelType = modelType;
};

/**
 * Get the modelMatrix
 */
rock.game.graphics.engine.renderer.ModelRenderable.prototype.getModelMatrix = function() {
    return this.modelMatrix;
};