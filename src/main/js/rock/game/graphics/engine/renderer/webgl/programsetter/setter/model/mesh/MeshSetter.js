rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh');

/**
 * Setter for {@link rock.game.graphics.model.mesh.Mesh}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter = function (glContext) {
    this.ATTRIBUTE_VERTEX = 'a_vertex';

    rock.super_(this, [glContext]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter.prototype.getAttributeNames = function () {
    return [this.ATTRIBUTE_VERTEX];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter.prototype.getUniformNames = function () {
    return [];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter.prototype.getTextureNames = function () {
    return [];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter.prototype.setValues = function (program, settable) {
    var mesh = settable.getMesh();
    var adapter = settable.getAdapter();
    this.setMeshAttributes(program, mesh, adapter);
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter.prototype.setMeshAttributes = function (program, mesh, meshAdapter) {
    if (rock.util.JsUtils.isNullOrUndefined(meshAdapter)) {
        this.setAttributesFromMesh(program, mesh);
    } else {
        this.setAttributesFromMeshAdapter(program, meshAdapter);
    }
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter.prototype.setAttributesFromMesh = function (program, mesh) {
    var vertices = mesh.getVertices();
    var indexes = mesh.getIndexes();

    program.populateAttribute(this.ATTRIBUTE_VERTEX, new Float32Array(vertices), 3);
    program.populateIndexes(new Uint16Array(indexes));
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter.prototype.setAttributesFromMeshAdapter = function (program, meshAdapter) {
    var verticesAdapter = meshAdapter.getVerticesAdapter();
    var indexesAdapter = meshAdapter.getIndexesAdapter();

    program.bufferAttribute(this.ATTRIBUTE_VERTEX, verticesAdapter.getBuffer(), 3);
    program.bufferIndexes(indexesAdapter.getBuffer());
};