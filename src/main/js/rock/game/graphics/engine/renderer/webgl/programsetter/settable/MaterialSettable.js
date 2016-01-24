rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.settable');

/**
 * Settable for {@link rock.game.graphics.model.material.Material}
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.settable.AdaptableSettable
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MaterialSettable = function () {
    rock.super_(this);

    this.material = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.settable.MaterialSettable,
    rock.game.graphics.engine.renderer.webgl.programsetter.settable.AdaptableSettable);

/**
 * Get the material
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MaterialSettable.prototype.getMaterial = function() {
    return this.material;
};

/**
 * Set the material
 *
 * @param material the value
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MaterialSettable.prototype.setMaterial = function(material) {
    this.material = material;
};