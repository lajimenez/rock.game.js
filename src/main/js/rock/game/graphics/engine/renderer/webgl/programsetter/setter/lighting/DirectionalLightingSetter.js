rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting');

/**
 * Setter for {@link rock.game.graphics.scene.DirectionalLighting}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *          the WebGL context
 * @param maxLights
 *          maximum lights to use
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.DirectionalLightingSetter = function (glContext, maxLights) {
    var varName = 'u_directionalLights';
    rock.super_(this, [glContext, varName, maxLights]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.DirectionalLightingSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter);