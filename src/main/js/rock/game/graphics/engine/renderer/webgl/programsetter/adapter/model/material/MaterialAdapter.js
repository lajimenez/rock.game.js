rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material');

/**
 * Adapter for a {@link rock.game.graphics.model.material.Material}
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *
 * @param {rock.game.graphics.model.material.Material} material
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.MaterialAdapter = function (glContext, material) {
    rock.super_(this, arguments);
    this.material = material;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.MaterialAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter);


/**
 * Get the material
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.MaterialAdapter.prototype.getMaterial = function() {
    return this.material;
};