rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting');

/**
 * Setter for {@link rock.game.graphics.scene.LightArrayLighting}. Lights may have attenuation and
 * thereby the array contain {@link rock.game.graphics.lighting.AttenuationLight}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 * @param varName
 *          name of the program variable containing lights
 * @param maxLights
 *          maximum lights to use
 *
 * @constructor
 * @extends {rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter}
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.AttenuationLightArrayLightingSetter = function (glContext, varName, maxLights) {
    this.UNIFORM_LIGHT_CONSTANT_ATTENUATION = varName + '[X].constantAttenuation';
    this.UNIFORM_LIGHT_LINEAR_ATTENUATION = varName + '[X].linearAttenuation';
    this.UNIFORM_LIGHT_EXPONENTIAL_ATTENUATION = varName + '[X].exponentialAttenuation';

    rock.super_(this, arguments);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.AttenuationLightArrayLightingSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter);


rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.AttenuationLightArrayLightingSetter.prototype.getCustomUniformNames = function (position) {
    var uniforms = rock.super_method(this, rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.AttenuationLightArrayLightingSetter, 'getCustomUniformNames', arguments);
    uniforms = uniforms.concat(this.getAttenuationLightUniformNames(position));
    return uniforms;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.AttenuationLightArrayLightingSetter.prototype.getAttenuationLightUniformNames = function (position) {
    var uniforms = [];
    uniforms.push(this.getUniformNameInPosition(this.UNIFORM_LIGHT_CONSTANT_ATTENUATION, position));
    uniforms.push(this.getUniformNameInPosition(this.UNIFORM_LIGHT_LINEAR_ATTENUATION, position));
    uniforms.push(this.getUniformNameInPosition(this.UNIFORM_LIGHT_EXPONENTIAL_ATTENUATION, position));
    return uniforms;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.AttenuationLightArrayLightingSetter.prototype.setCustomLightUniforms = function (program, lighting, position, camera) {
    rock.super_method(this, rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.AttenuationLightArrayLightingSetter, 'setCustomLightUniforms', arguments);
    this.setAttenuationLightUniforms(program, lighting, position);
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.AttenuationLightArrayLightingSetter.prototype.setAttenuationLightUniforms = function (program, lighting, position) {
    var gl = this.glContext.getHTMLContext();
    var light = lighting.getLight(position);

    gl.uniform1f(
        program.getUniformLocation(this.getUniformNameInPosition(this.UNIFORM_LIGHT_CONSTANT_ATTENUATION, position)),
        light.getConstantAttenuation()
    );

    gl.uniform1f(
        program.getUniformLocation(this.getUniformNameInPosition(this.UNIFORM_LIGHT_LINEAR_ATTENUATION, position)),
        light.getLinearAttenuation()
    );

    gl.uniform1f(
        program.getUniformLocation(this.getUniformNameInPosition(this.UNIFORM_LIGHT_EXPONENTIAL_ATTENUATION, position)),
        light.getExponentialAttenuation()
    );
};
