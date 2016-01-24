rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.settable');

/**
 * Settable for {@link rock.game.graphics.scene.Lighting}
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.settable.Settable
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.LightingSettable = function () {
    rock.super_(this);

    this.lighting = null;
    this.camera = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.settable.LightingSettable,
    rock.game.graphics.engine.renderer.webgl.programsetter.settable.Settable);

/**
 * Get the lighting
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.LightingSettable.prototype.getLighting = function () {
    return this.lighting;
};

/**
 * Set the lighting
 *
 * @param lighting the value
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.LightingSettable.prototype.setLighting = function (lighting) {
    this.lighting = lighting;
};

/**
 * Get the camera
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.LightingSettable.prototype.getCamera = function () {
    return this.camera;
};

/**
 * Set the camera
 *
 * @param camera the value
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.LightingSettable.prototype.setCamera = function (camera) {
    this.camera = camera;
};