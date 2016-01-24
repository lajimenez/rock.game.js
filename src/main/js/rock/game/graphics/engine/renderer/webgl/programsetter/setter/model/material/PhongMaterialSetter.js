rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material');

/**
 * Setter for {@link rock.game.graphics.model.material.PhongMaterial}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.MaterialSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongMaterialSetter = function (glContext) {
    this.UNIFORM_MATERIAL_AMBIENT = 'u_material.ambient';
    this.UNIFORM_MATERIAL_DIFFUSE = 'u_material.diffuse';
    this.UNIFORM_MATERIAL_SPECULAR = 'u_material.specular';
    this.UNIFORM_MATERIAL_SHININESS = 'u_material.shininess';
    this.UNIFORM_MATERIAL_ALPHA = 'u_material.alpha';

    rock.super_(this, [glContext]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongMaterialSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.MaterialSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongMaterialSetter.prototype.getAttributeNames = function () {
    return [];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongMaterialSetter.prototype.getUniformNames = function () {
    return [this.UNIFORM_MATERIAL_AMBIENT, this.UNIFORM_MATERIAL_DIFFUSE,
        this.UNIFORM_MATERIAL_SPECULAR, this.UNIFORM_MATERIAL_SHININESS,
        this.UNIFORM_MATERIAL_ALPHA];
};
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongMaterialSetter.prototype.getTextureNames = function () {
    return [];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongMaterialSetter.prototype.setValues = function (program, settable) {
    var material = settable.getMaterial();
    this.setUniformMaterial(program, material);
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongMaterialSetter.prototype.setUniformMaterial = function (program, material) {
    var gl = this.glContext.getHTMLContext();

    var ambient = material.getAmbient();
    gl.uniform3f(
        program.getUniformLocation(this.UNIFORM_MATERIAL_AMBIENT),
        ambient.getNormalizedRed(), ambient.getNormalizedGreen(), ambient.getNormalizedBlue()
    );

    var diffuse = material.getDiffuse();
    gl.uniform3f(
        program.getUniformLocation(this.UNIFORM_MATERIAL_DIFFUSE),
        diffuse.getNormalizedRed(), diffuse.getNormalizedGreen(), diffuse.getNormalizedBlue()
    );

    var specular = material.getSpecular();
    gl.uniform3f(
        program.getUniformLocation(this.UNIFORM_MATERIAL_SPECULAR),
        specular.getNormalizedRed(), specular.getNormalizedGreen(), specular.getNormalizedBlue()
    );

    gl.uniform1f(program.getUniformLocation(this.UNIFORM_MATERIAL_SHININESS), material.getShininess());

    gl.uniform1f(program.getUniformLocation(this.UNIFORM_MATERIAL_ALPHA), material.getAlpha());
};