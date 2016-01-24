rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model');

/**
 * Setter for matrices needed for rendering
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends {rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter}
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.MatricesSetter = function (glContext) {
    this.UNIFORM_MODEL_VIEW_MATRIX = 'u_modelViewMatrix';
    this.UNIFORM_PROJECTION_MATRIX = 'u_projectionMatrix';
    this.UNIFORM_NORMAL_MATRIX = 'u_normalMatrix';

    rock.super_(this, [glContext]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.MatricesSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.MatricesSetter.prototype.getAttributeNames = function () {
    return [];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.MatricesSetter.prototype.getUniformNames = function () {
    return[this.UNIFORM_MODEL_VIEW_MATRIX, this.UNIFORM_PROJECTION_MATRIX, this.UNIFORM_NORMAL_MATRIX];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.MatricesSetter.prototype.getTextureNames = function () {
    return [];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.MatricesSetter.prototype.setValues = function (program, settable) {
    var gl = this.glContext;

    var modelViewMatrix = settable.getModelViewMatrix();
    var projectionMatrix = settable.getProjectionMatrix();
    var normalMatrix = settable.getNormalMatrix();

    gl.uniformMatrix4fv(
        program.getUniformLocation(this.UNIFORM_MODEL_VIEW_MATRIX),
        gl.FALSE,
        modelViewMatrix.getMatrixAsArray()
    );

    gl.uniformMatrix4fv(
        program.getUniformLocation(this.UNIFORM_PROJECTION_MATRIX),
        gl.FALSE,
        projectionMatrix.getMatrixAsArray()
    );

    var normalMatrixUniformLocator = program.getUniformLocation(this.UNIFORM_NORMAL_MATRIX);

    if (normalMatrixUniformLocator != null) {
        gl.uniformMatrix3fv(
            normalMatrixUniformLocator,
            gl.FALSE,
            normalMatrix.getAsMatrix3().getMatrixAsArray()
        );
    }
};