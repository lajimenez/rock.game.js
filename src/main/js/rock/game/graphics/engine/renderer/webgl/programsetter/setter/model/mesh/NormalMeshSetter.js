rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh');

/**
 * Setter for {@link rock.game.graphics.model.mesh.NormalMesh}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.NormalMeshSetter = function (glContext) {
    this.ATTRIBUTE_NORMAL = 'a_normal';
    rock.super_(this, [glContext]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.NormalMeshSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.NormalMeshSetter.prototype.getAttributeNames = function () {
    var attributes = rock.super_method(this,
        rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.NormalMeshSetter, 'getAttributeNames');
    attributes.push(this.ATTRIBUTE_NORMAL);
    return attributes;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.NormalMeshSetter.prototype.setAttributesFromMesh = function (program, mesh) {
    rock.super_method(this,
        rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.NormalMeshSetter, 'setAttributesFromMesh', arguments);

    var normals = mesh.getNormals();
    program.populateAttribute(this.ATTRIBUTE_NORMAL, new Float32Array(normals), 3);
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.NormalMeshSetter.prototype.setAttributesFromMeshAdapter = function (program, meshAdapter) {
    rock.super_method(this,
        rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.NormalMeshSetter, 'setAttributesFromMeshAdapter', arguments);

    var normalsAdapter = meshAdapter.getNormalsAdapter();
    program.bufferAttribute(this.ATTRIBUTE_NORMAL, normalsAdapter.getBuffer(), 3);
};