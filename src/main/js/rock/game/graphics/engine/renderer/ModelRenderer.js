rock.namespace('rock.game.graphics.engine.renderer');

/**
 * This class is the rensponsible for rendering a model with a specific lighting.
 * All renderers must inherit this class.
 *
 * @param {String} lightingType
 *         the lighting type
 * @param {String} modelType
 *         the model type
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.ModelRenderer = function (lightingType, modelType) {
    this.lightingType = lightingType;
    this.modelType = modelType;

    this.rendererContext = null;
};

/**
 * Render de model
 *
 * @params lighting
 *
 * @param camera
 *
 * @params {rock.game.graphics.engine.renderer.ModelRenderable} renderable
 *
 * @abstract
 * @function
 */
rock.game.graphics.engine.renderer.ModelRenderer.prototype.render = rock.abstract_;

rock.game.graphics.engine.renderer.ModelRenderer.prototype.setUp = function () {
};

rock.game.graphics.engine.renderer.ModelRenderer.prototype.tearDown = function () {
};

/**
 * Get the lightingType
 */
rock.game.graphics.engine.renderer.ModelRenderer.prototype.getLightingType = function() {
    return this.lightingType;
};

/**
 * Get the modelType
 */
rock.game.graphics.engine.renderer.ModelRenderer.prototype.getModelType = function() {
    return this.modelType;
};

/**
 * Get the rendererContext
 */
rock.game.graphics.engine.renderer.ModelRenderer.prototype.getRendererContext = function() {
    return this.rendererContext;
};

/**
 * Set the rendererContext
 *
 * @param rendererContext the value
 */
rock.game.graphics.engine.renderer.ModelRenderer.prototype.setRendererContext = function(rendererContext) {
    this.rendererContext = rendererContext;
};
