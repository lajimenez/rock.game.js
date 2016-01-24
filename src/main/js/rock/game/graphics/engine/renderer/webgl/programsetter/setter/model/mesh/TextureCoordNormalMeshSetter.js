rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh');

/**
 * Setter for {@link rock.game.graphics.model.mesh.TextureCoordNormalMesh}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.NormalMeshSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordNormalMeshSetter = function (glContext) {
    this.ATTRIBUTE_TEXCOORD = 'a_texCoord';
    rock.super_(this, [glContext]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordNormalMeshSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.NormalMeshSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordNormalMeshSetter.prototype.getAttributeNames = function () {
    var attributes = rock.super_method(this,
        rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordNormalMeshSetter, 'getAttributeNames');
    attributes.push(this.ATTRIBUTE_TEXCOORD);
    return attributes;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordNormalMeshSetter.prototype.setAttributesFromMesh = function (program, mesh) {
    rock.super_method(this,
        rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordNormalMeshSetter, 'setAttributesFromMesh', arguments);

    var textureCoordinates = mesh.getTextureCoordinates();
    program.populateAttribute(this.ATTRIBUTE_TEXCOORD, new Float32Array(textureCoordinates), 2);
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordNormalMeshSetter.prototype.setAttributesFromMeshAdapter = function (program, meshAdapter) {
    rock.super_method(this,
        rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordNormalMeshSetter, 'setAttributesFromMeshAdapter', arguments);

    var textureCoordinatesAdapter = meshAdapter.getTextureCoordinatesAdapter();
    program.bufferAttribute(this.ATTRIBUTE_TEXCOORD, textureCoordinatesAdapter.getBuffer(), 2);
};