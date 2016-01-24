rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting');

/**
 * Setter for {@link rock.game.graphics.scene.SpotlightLighting}
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
rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.SpotlightLightingSetter = function (glContext, maxLights) {
    var varName = 'u_spotlightLights';
    this.UNIFORM_LIGHT_CONE_ANGLE = varName +'[X].coneAngle';
    this.UNIFORM_LIGHT_CONE_DIRECTION = varName + '[X].coneDirection';
    rock.super_(this, [glContext, varName, maxLights]);

    this.point3_ma = new rock.geometry.Point3(0, 0, 0);
    this.vec3_ma = new rock.geometry.Vector3(0, 0, 0);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.SpotlightLightingSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.AttenuationLightArrayLightingSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.SpotlightLightingSetter.prototype.getCustomUniformNames = function (position) {
    var uniforms = rock.super_method(this, rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.SpotlightLightingSetter, 'getCustomUniformNames', arguments);
    uniforms = uniforms.concat(this.getSpotlightLightUniformNames(position));
    return uniforms;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.SpotlightLightingSetter.prototype.getSpotlightLightUniformNames = function (position) {
    var uniforms = [];
    uniforms.push(this.getUniformNameInPosition(this.UNIFORM_LIGHT_CONE_ANGLE, position));
    uniforms.push(this.getUniformNameInPosition(this.UNIFORM_LIGHT_CONE_DIRECTION, position));
    return uniforms;
};
rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.SpotlightLightingSetter.prototype.setCustomLightUniforms = function (program, lighting, position, camera) {
    rock.super_method(this, rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.SpotlightLightingSetter, 'setCustomLightUniforms', arguments);
    this.setSpotlightLightUniforms(program, lighting, position, camera);
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.SpotlightLightingSetter.prototype.setSpotlightLightUniforms = function (program, lighting, position, camera) {
    var gl = this.glContext.getHTMLContext();
    var light = lighting.getLight(position);

    gl.uniform1f(
        program.getUniformLocation(this.getUniformNameInPosition(this.UNIFORM_LIGHT_CONE_ANGLE, position)),
        light.getConeAngle()
    );

    var point = this.point3_ma;
    var coneDirection = this.vec3_ma;
    var lightConeDirection = light.getConeDirection();
    point.setX(lightConeDirection.getX());
    point.setY(lightConeDirection.getY());
    point.setZ(lightConeDirection.getZ());
    var coneDirectionPoint = this.getPointInCorrectSpace(point,
        camera.getLookAtViewMatrix(), light.getIsPositionInCameraSpace(), true);

    coneDirection.setX(coneDirectionPoint.getX());
    coneDirection.setY(coneDirectionPoint.getY());
    coneDirection.setZ(coneDirectionPoint.getZ());
    coneDirection.normalize();
    gl.uniform3f(
        program.getUniformLocation(this.getUniformNameInPosition(this.UNIFORM_LIGHT_CONE_DIRECTION, position)),
        coneDirection.getX(), coneDirection.getY(), coneDirection.getZ()
    );
};