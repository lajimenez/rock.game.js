rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh');

/**
 * Adapter for {@link rock.game.graphics.model.mesh.TextureCoordNormalMesh}
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.NormalMeshAdapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordNormalMeshAdapter = function (glContext, mesh) {
    rock.super_(this, arguments);
    this.textureCoordinatesAdapter = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordNormalMeshAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.NormalMeshAdapter);

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#build
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordNormalMeshAdapter.prototype.build = function () {
    rock.super_method(this, rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordNormalMeshAdapter, 'build');

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
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordNormalMeshAdapter.prototype.release = function () {
    rock.super_method(this, rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordNormalMeshAdapter, 'release');

    this.textureCoordinatesAdapter.release();
    this.textureCoordinatesAdapter = null;
};

/**
 * Get the textureCoordinatesAdapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordNormalMeshAdapter.prototype.getTextureCoordinatesAdapter = function() {
    return this.textureCoordinatesAdapter;
};