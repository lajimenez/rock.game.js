rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material');

/**
 * Setter for {@link rock.game.graphics.model.material.TextureMaterial}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.MaterialSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.TextureMaterialSetter = function (glContext) {
    this.TEXTURE = 'u_texture';

    rock.super_(this, [glContext]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.TextureMaterialSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.MaterialSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.TextureMaterialSetter.prototype.getAttributeNames = function () {
    return [];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.TextureMaterialSetter.prototype.getUniformNames = function () {
    return [];
};
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.TextureMaterialSetter.prototype.getTextureNames = function () {
    return [this.TEXTURE];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.TextureMaterialSetter.prototype.setValues = function (program, settable) {
    var material = settable.getMaterial();
    var textureMaterialAdapter = settable.getAdapter();
    var textureAdapter = null;

    if (!rock.util.JsUtils.isNullOrUndefined(textureMaterialAdapter)) {
        textureAdapter = textureMaterialAdapter.getTextureAdapter();
    }

    this.setTexture(program, material.getTexture(), textureAdapter);
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.TextureMaterialSetter.prototype.setTexture = function (program, texture, textureAdapter) {
    if (rock.util.JsUtils.isNullOrUndefined(textureAdapter)) {
        this.setAttributesFromTexture(program, texture);
    } else {
        this.setAttributesFromTextureAdapter(program, textureAdapter);
    }
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.TextureMaterialSetter.prototype.setAttributesFromTexture = function (program, texture) {
    program.populateTexture(this.TEXTURE, texture.getImage());
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.TextureMaterialSetter.prototype.setAttributesFromTextureAdapter = function (program, textureAdapter) {
    program.updateTexture(this.TEXTURE, textureAdapter.getGlTexture());
};