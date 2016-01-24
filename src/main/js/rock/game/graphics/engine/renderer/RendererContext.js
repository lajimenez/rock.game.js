rock.namespace('rock.game.graphics.engine.renderer');

/**
 * This class is responsible for render the representations using the appropriate renderer
 *
 * @param {String} id
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.RendererContext = function (id) {
    this.id = id;
    this.renderers = [];
    this.clearColor = new rock.graphics.Color(150, 150, 150);
};

/**
 *
 * @param {rock.game.graphics.engine.renderer.ModelRenderer} renderer
 */
rock.game.graphics.engine.renderer.RendererContext.prototype.addRenderer = function (renderer) {
    renderer.setRendererContext(this);
    this.renderers.push(renderer);
};

/**
 * Do any needed initialization before render a model
 *
 * @private
 */
rock.game.graphics.engine.renderer.RendererContext.prototype.setUp = function () {
};

/**
 * Do any action after render a model
 *
 * @private
 */
rock.game.graphics.engine.renderer.RendererContext.prototype.tearDown = function () {
};

/**
 * Clear the window
 *
 * @function
 * @abstract
 */
rock.game.graphics.engine.renderer.RendererContext.prototype.clear = rock.abstract_;

/**
 * Default implementation. You can override and apply any filter, customization,.. you want
 *
 * @param lighting
 * @param {rock.game.graphics.scene.Camera} camera
 * @param {rock.js.Array} representations
 *
 */
rock.game.graphics.engine.renderer.RendererContext.prototype.render = function (lighting, camera, representations) {
    var i, representation;
    this.setUp();
    this.clear();
    camera.updateMatrices();
    var length = representations.getLength();
    for (i = 0; i < length; i++) {
        representation = representations.getValue(i);
        this.renderRepresentation(lighting, camera, representation);
    }
    this.tearDown();
};

rock.game.graphics.engine.renderer.RendererContext.prototype.renderRepresentation = function (lighting, camera, representation) {
    representation.update();
    var renderables = representation.getRenderables();
    var length = renderables.getLength();
    var i;
    for (i = 0; i < length; i++) {
        this.renderRenderable(lighting, camera, renderables.getValue(i));
    }
};

rock.game.graphics.engine.renderer.RendererContext.prototype.renderRenderable = function (lighting, camera, renderable) {
    var renderer = this.getRenderer(lighting.getType(), renderable.getModelType());
    renderer.setUp();
    renderer.render(lighting, camera, renderable);
    renderer.tearDown();
};

rock.game.graphics.engine.renderer.RendererContext.prototype.getRenderer = function (lightingType, modelType) {
    var renderers = this.renderers;
    var i, renderer;
    for (i = 0; i < renderers.length; i++) {
        renderer = renderers[i];
        if (renderer.getLightingType() == lightingType && renderer.getModelType() == modelType) {
            return renderer;
        }
    }

    // Trick. If no renderer found, we try to get one that doesn't need lighting
    for (i = 0; i < renderers.length; i++) {
        renderer = renderers[i];
        if (renderer.getLightingType() == rock.game.constants.NO_LIGHTING_NEEDED_TYPE
            && renderer.getModelType() == modelType) {
            return renderer;
        }
    }
    return null;
};

/**
 * Get the id
 */
rock.game.graphics.engine.renderer.RendererContext.prototype.getId = function() {
    return this.id;
};

/**
 * Get the clearColor
 */
rock.game.graphics.engine.renderer.RendererContext.prototype.getClearColor = function() {
    return this.clearColor;
};

/**
 * Set the clearColor
 *
 * @param clearColor the value
 */
rock.game.graphics.engine.renderer.RendererContext.prototype.setClearColor = function(clearColor) {
    this.clearColor = clearColor;
};