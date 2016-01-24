rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.settable');

/**
 * Settable for {@link rock.game.graphics.model.Model}
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.settable.AdaptableSettable
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.ModelSettable = function () {
    rock.super_(this);

    this.model = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.settable.ModelSettable,
    rock.game.graphics.engine.renderer.webgl.programsetter.settable.AdaptableSettable);

/**
 * Get the model
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.ModelSettable.prototype.getModel = function() {
    return this.model;
};

/**
 * Set the model
 *
 * @param model the value
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.ModelSettable.prototype.setModel = function(model) {
    this.model = model;
};
