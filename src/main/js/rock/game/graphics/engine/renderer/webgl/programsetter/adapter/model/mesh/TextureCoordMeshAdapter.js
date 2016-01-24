rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh');

/**
 * Adapter for {@link rock.game.graphics.model.mesh.TextureCoordMesh}
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordMeshAdapter = function (glContext, mesh) {
    rock.super_(this, arguments);
    this.textureCoordinatesAdapter = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordMeshAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter);

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#build
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordMeshAdapter.prototype.build = function () {
    rock.super_method(this, rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordMeshAdapter, 'build');

    var glContext = this.glContext;
    var mesh = this.mesh;
    var textureCoordinatesAdapter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter(glContext, mesh.getTextureCoordinates(), Float32Array,
            rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.ARRAY_BUFFER);
    textureCoordinatesAdapter.build();
    this.textureCoordinatesAdapter = textureCoordinatesAdapter;
};

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#release
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordMeshAdapter.prototype.release = function () {
    rock.super_method(this, rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordMeshAdapter, 'release');

    this.textureCoordinatesAdapter.release();
    this.textureCoordinatesAdapter = null;
};

/**
 * Get the textureCoordinatesAdapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordMeshAdapter.prototype.getTextureCoordinatesAdapter = function() {
    return this.textureCoordinatesAdapter;
};