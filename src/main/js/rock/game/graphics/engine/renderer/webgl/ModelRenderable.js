rock.namespace('rock.game.graphics.engine.renderer');

/**
 * Model renderable for using in WebGL
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.ModelRenderable
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.ModelRenderable = function () {
    rock.super_(this);
    this.modelAdapter = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.ModelRenderable,
    rock.game.graphics.engine.renderer.ModelRenderable);

/**
 * Get the modelAdapter
 */
rock.game.graphics.engine.renderer.webgl.ModelRenderable.prototype.getModelAdapter = function() {
    return this.modelAdapter;
};

/**
 * Set the modelAdapter
 *
 * @param modelAdapter the value
 */
rock.game.graphics.engine.renderer.webgl.ModelRenderable.prototype.setModelAdapter = function(modelAdapter) {
    this.modelAdapter = modelAdapter;
};