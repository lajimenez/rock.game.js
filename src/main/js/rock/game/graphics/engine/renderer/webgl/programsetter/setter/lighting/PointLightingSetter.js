rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting');

/**
 * Setter for {@link rock.game.graphics.scene.PointLighting}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *          the WebGL context
 * @param maxLights
 *          maximum lights to use
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.AttenuationLightArrayLightingSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.PointLightingSetter = function (glContext, maxLights) {
    var varName = 'u_pointLights';
    rock.super_(this, [glContext, varName, maxLights]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.PointLightingSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.AttenuationLightArrayLightingSetter);