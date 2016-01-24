rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh');

/**
 * Adapter for {@link rock.game.graphics.model.mesh.Mesh}
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter = function (glContext, mesh) {
    rock.super_(this, [glContext]);
    this.mesh = mesh;

    this.verticesAdapter = null;
    this.indexesAdapter = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter);

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#build
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter.prototype.build = function () {
    var glContext = this.glContext;
    var mesh = this.mesh;

    var verticesAdapter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter(glContext, mesh.getVertices(), Float32Array,
            rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.ARRAY_BUFFER);
    var indexesAdapter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter(glContext, mesh.getIndexes(), Uint16Array,
            rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.ELEMENT_ARRAY_BUFFER);

    verticesAdapter.build();
    indexesAdapter.build();

    this.verticesAdapter = verticesAdapter;
    this.indexesAdapter = indexesAdapter;
};

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#release
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter.prototype.release = function () {
    this.verticesAdapter.release();
    this.indexesAdapter.release();

    this.verticesAdapter = null;
    this.indexesAdapter = null;
};

/**
 * Get the mesh
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter.prototype.getMesh = function() {
    return this.mesh;
};

/**
 * Get the verticesAdapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter.prototype.getVerticesAdapter = function() {
    return this.verticesAdapter;
};

/**
 * Get the indexesAdapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter.prototype.getIndexesAdapter = function() {
    return this.indexesAdapter;
};