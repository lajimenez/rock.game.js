rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting');

/**
 * This class can be used when no lighting setter is needed.
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightingSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.NoLightingSetter = function (glContext) {
    rock.super_(this, arguments);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.NoLightingSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightingSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.NoLightingSetter.prototype.setValues = function (program, settable) {
};