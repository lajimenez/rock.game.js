rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh');

/**
 * Adapter for {@link rock.game.graphics.model.mesh.NormalMesh}
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.NormalMeshAdapter = function (glContext, mesh) {
    rock.super_(this, arguments);
    this.normalsAdapter = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.NormalMeshAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter);

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#build
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.NormalMeshAdapter.prototype.build = function () {
    rock.super_method(this, rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.NormalMeshAdapter, 'build');

    var glContext = this.glContext;
    var mesh = this.mesh;
    var normalsAdapter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter(glContext, mesh.getNormals(), Float32Array,
            rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.ARRAY_BUFFER);
    normalsAdapter.build();
    this.normalsAdapter = normalsAdapter;
};

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#release
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.NormalMeshAdapter.prototype.release = function () {
    rock.super_method(this, rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.NormalMeshAdapter, 'release');

    this.normalsAdapter.release();
    this.normalsAdapter = null;
};

/**
 * Get the normalsAdapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.NormalMeshAdapter.prototype.getNormalsAdapter = function() {
    return this.normalsAdapter;
};