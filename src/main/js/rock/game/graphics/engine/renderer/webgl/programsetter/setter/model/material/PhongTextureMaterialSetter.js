rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material');

/**
 * Setter for {@link rock.game.graphics.model.material.PhongTextureMaterial}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongMaterialSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongTextureMaterialSetter = function (glContext) {
    this.TEXTURE_AMBIENT = 'u_textureAmbient';
    this.TEXTURE_DIFFUSE = 'u_textureDiffuse';
    this.TEXTURE_SPECULAR = 'u_textureSpecular';

    rock.super_(this, [glContext]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongTextureMaterialSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongMaterialSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongTextureMaterialSetter.prototype.getTextureNames = function () {
    var textureNames = rock.super_method(this,
        rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongTextureMaterialSetter,
        'getTextureNames');
    textureNames = textureNames.concat([this.TEXTURE_AMBIENT, this.TEXTURE_DIFFUSE, this.TEXTURE_SPECULAR]);
    return textureNames;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongTextureMaterialSetter.prototype.setValues = function (program, settable) {
    rock.super_method(this,
        rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongTextureMaterialSetter,
        'setValues',  arguments);

    var material = settable.getMaterial();
    var adapter = settable.getAdapter();

    if (rock.util.JsUtils.isNullOrUndefined(adapter)) {
        this.setAttributesFromMaterial(program, material);
    } else {
        this.setAttributesFromAdapter(program, adapter);
    }
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongTextureMaterialSetter.prototype.setAttributesFromMaterial = function (program, material) {
    var ambientTexture = material.getAmbientTexture();
    var diffuseTexture = material.getDiffuseTexture();
    var specularTexture = material.getSpecularTexture();

    if (ambientTexture != null) {
        program.populateTexture(this.TEXTURE_AMBIENT, ambientTexture.getImage());
    }

    if (diffuseTexture != null) {
        program.populateTexture(this.TEXTURE_DIFFUSE, diffuseTexture.getImage());
    }

    if (specularTexture != null) {
        program.populateTexture(this.TEXTURE_SPECULAR, specularTexture.getImage());
    }
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongTextureMaterialSetter.prototype.setAttributesFromAdapter = function (program, adapter) {
    var ambientTextureAdapter = adapter.getAmbientTextureAdapter();
    var diffuseTextureAdapter = adapter.getDiffuseTextureAdapter();
    var specularTextureAdapter = adapter.getSpecularTextureAdapter();

    if (ambientTextureAdapter != null) {
        program.updateTexture(this.TEXTURE_AMBIENT, ambientTextureAdapter.getGlTexture());
    } else {
        program.updateTexture(this.TEXTURE_AMBIENT, null);
    }

    if (diffuseTextureAdapter != null) {
        program.updateTexture(this.TEXTURE_DIFFUSE, diffuseTextureAdapter.getGlTexture());
    } else {
        program.updateTexture(this.TEXTURE_DIFFUSE, null);
    }

    if (specularTextureAdapter != null) {
        program.updateTexture(this.TEXTURE_SPECULAR, specularTextureAdapter.getGlTexture());
    } else {
        program.updateTexture(this.TEXTURE_SPECULAR, null);
    }
};