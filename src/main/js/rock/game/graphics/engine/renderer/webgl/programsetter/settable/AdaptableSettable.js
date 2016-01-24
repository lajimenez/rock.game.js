rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.settable');

/**
 * Settable for elements that can have an adapter
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.AdaptableSettable = function () {
    this.adapter = null;
};

/**
 * Get the adapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.AdaptableSettable.prototype.getAdapter = function() {
    return this.adapter;
};

/**
 * Set the adapter
 *
 * @param adapter the value
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.AdaptableSettable.prototype.setAdapter = function(adapter) {
    this.adapter = adapter;
};