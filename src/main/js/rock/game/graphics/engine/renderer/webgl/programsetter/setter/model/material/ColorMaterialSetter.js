rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material');

/**
 * Setter for {@link rock.game.graphics.model.material.ColorMaterial}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.MaterialSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.ColorMaterialSetter = function (glContext) {
    this.UNIFORM_COLOR = 'u_color';

    rock.super_(this, [glContext]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.ColorMaterialSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.MaterialSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.ColorMaterialSetter.prototype.getAttributeNames = function () {
    return [];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.ColorMaterialSetter.prototype.getUniformNames = function () {
    return [this.UNIFORM_COLOR];
};
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.ColorMaterialSetter.prototype.getTextureNames = function () {
    return [];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.ColorMaterialSetter.prototype.setValues = function (program, settable) {
    var colorMaterial = settable.getMaterial();
    this.setUniformColor(program, colorMaterial.getColor());
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.ColorMaterialSetter.prototype.setUniformColor = function (program, color) {
    var gl = this.glContext.getHTMLContext();

    gl.uniform3f(
        program.getUniformLocation(this.UNIFORM_COLOR),
        color.getNormalizedRed(), color.getNormalizedGreen(), color.getNormalizedBlue()
    );
};