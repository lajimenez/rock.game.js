rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting');

/**
 * Setter for {@link rock.game.graphics.scene.LightArrayLighting}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 * @param varName
 *          name of the program variable containing lights
 * @param maxLights
 *          maximum lights to use
 *
 * @constructor
 * @extends {rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightingSetter}
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter = function (glContext, varName, maxLights) {
    this.UNIFORM_LIGHT_COUNT = varName +'Count';
    this.UNIFORM_LIGHT_POSITION = varName + '[X].position';
    this.UNIFORM_LIGHT_AMBIENT = varName + '[X].ambient';
    this.UNIFORM_LIGHT_DIFFUSE = varName + '[X].diffuse';
    this.UNIFORM_LIGHT_SPECULAR = varName + '[X].specular';

    rock.super_(this, [glContext]);
    this.maxLights = maxLights;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightingSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter.prototype.getUniformNames = function () {
    var maxLights = this.maxLights;
    var uniforms = [this.UNIFORM_LIGHT_COUNT];
    var i;

    for (i = 0; i < maxLights; i++) {
        uniforms = uniforms.concat(this.getCustomUniformNames(i));
    }

    return uniforms;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter.prototype.getCustomUniformNames = function (position) {
    return this.getLightUniformNames(position);
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter.prototype.getLightUniformNames = function (position) {
    var uniforms = [];
    uniforms.push(this.getUniformNameInPosition(this.UNIFORM_LIGHT_POSITION, position));
    uniforms.push(this.getUniformNameInPosition(this.UNIFORM_LIGHT_AMBIENT, position));
    uniforms.push(this.getUniformNameInPosition(this.UNIFORM_LIGHT_DIFFUSE, position));
    uniforms.push(this.getUniformNameInPosition(this.UNIFORM_LIGHT_SPECULAR, position));
    return uniforms;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter.prototype.setValues = function (program, settable) {
    var lighting = settable.getLighting();
    var camera = settable.getCamera();
    var lightsCount = lighting.getLightsCount();
    var i;
    for (i = 0; i < lightsCount; i++) {
        this.setCustomLightUniforms(program, lighting, i, camera);
    }

    var gl = this.glContext.getHTMLContext();
    gl.uniform1i(program.getUniformLocation(this.UNIFORM_LIGHT_COUNT), lightsCount);
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter.prototype.setCustomLightUniforms = function (program, lighting, position, camera) {
    this.setLightUniforms(program, lighting, position, camera);
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightArrayLightingSetter.prototype.setLightUniforms = function (program, lighting, position, camera) {
    var gl = this.glContext.getHTMLContext();
    var light = lighting.getLight(position);

    var lightPosition = this.getPointInCorrectSpace(light.getPosition(), camera.getLookAtViewMatrix(),
        light.getIsPositionInCameraSpace(), light.getIsPositionAVector());
    gl.uniform3f(
        program.getUniformLocation(this.getUniformNameInPosition(this.UNIFORM_LIGHT_POSITION, position)),
        lightPosition.getX(), lightPosition.getY(), lightPosition.getZ()
    );

    var ambient = light.getAmbient();
    gl.uniform3f(
        program.getUniformLocation(this.getUniformNameInPosition(this.UNIFORM_LIGHT_AMBIENT, position)),
        ambient.getNormalizedRed(), ambient.getNormalizedGreen(), ambient.getNormalizedBlue()
    );

    var diffuse = light.getDiffuse();
    gl.uniform3f(
        program.getUniformLocation(this.getUniformNameInPosition(this.UNIFORM_LIGHT_DIFFUSE, position)),
        diffuse.getNormalizedRed(), diffuse.getNormalizedGreen(), diffuse.getNormalizedBlue()
    );

    var specular = light.getSpecular();
    gl.uniform3f(
        program.getUniformLocation(this.getUniformNameInPosition(this.UNIFORM_LIGHT_SPECULAR, position)),
        specular.getNormalizedRed(), specular.getNormalizedGreen(), specular.getNormalizedBlue()
    );
};