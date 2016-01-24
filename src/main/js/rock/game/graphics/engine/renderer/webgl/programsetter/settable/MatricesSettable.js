rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.settable');

/**
 * Settable for matrices needed for rendering
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.settable.Settable
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MatricesSettable = function () {
    rock.super_(this);

    this.modelViewMatrix = null;
    this.projectionMatrix = null;
    this.normalMatrix = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.settable.MatricesSettable,
    rock.game.graphics.engine.renderer.webgl.programsetter.settable.Settable);

/**
 * Get the modelViewMatrix
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MatricesSettable.prototype.getModelViewMatrix = function() {
    return this.modelViewMatrix;
};

/**
 * Set the modelViewMatrix
 *
 * @param modelViewMatrix the value
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MatricesSettable.prototype.setModelViewMatrix = function(modelViewMatrix) {
    this.modelViewMatrix = modelViewMatrix;
};

/**
 * Get the projectionMatrix
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MatricesSettable.prototype.getProjectionMatrix = function() {
    return this.projectionMatrix;
};

/**
 * Set the projectionMatrix
 *
 * @param projectionMatrix the value
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MatricesSettable.prototype.setProjectionMatrix = function(projectionMatrix) {
    this.projectionMatrix = projectionMatrix;
};

/**
 * Get the normalMatrix
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MatricesSettable.prototype.getNormalMatrix = function() {
    return this.normalMatrix;
};

/**
 * Set the normalMatrix
 *
 * @param normalMatrix the value
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MatricesSettable.prototype.setNormalMatrix = function(normalMatrix) {
    this.normalMatrix = normalMatrix;
};