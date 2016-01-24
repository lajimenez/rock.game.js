rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh');

/**
 * Setter for {@link rock.game.graphics.model.mesh.TextureCoordMesh}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordMeshSetter = function (glContext) {
    this.ATTRIBUTE_TEXCOORD = 'a_texCoord';
    rock.super_(this, [glContext]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordMeshSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordMeshSetter.prototype.getAttributeNames = function () {
    var attributes = rock.super_method(this,
        rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordMeshSetter, 'getAttributeNames');
    attributes.push(this.ATTRIBUTE_TEXCOORD);
    return attributes;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordMeshSetter.prototype.setAttributesFromMesh = function (program, mesh) {
    rock.super_method(this,
        rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordMeshSetter, 'setAttributesFromMesh', arguments);

    var textureCoordinates = mesh.getTextureCoordinates();
    program.populateAttribute(this.ATTRIBUTE_TEXCOORD, new Float32Array(textureCoordinates), 2);
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordMeshSetter.prototype.setAttributesFromMeshAdapter = function (program, meshAdapter) {
    rock.super_method(this,
        rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordMeshSetter, 'setAttributesFromMeshAdapter', arguments);

    var textureCoordinatesAdapter = meshAdapter.getTextureCoordinatesAdapter();
    program.bufferAttribute(this.ATTRIBUTE_TEXCOORD, textureCoordinatesAdapter.getBuffer(), 2);
};