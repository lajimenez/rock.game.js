rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material');

/**
 * Adapter for {@link rock.game.graphics.model.material.TextureMaterial}
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.MaterialAdapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.TextureModelAdapter = function (glContext, material) {
    rock.super_(this, arguments);
    this.textureAdapter = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.TextureModelAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.MaterialAdapter);

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#build
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.TextureModelAdapter.prototype.build = function() {
    var textureAdapter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.adapter.TextureAdapter(this.glContext, this.material.getTexture());
    textureAdapter.build();
    this.textureAdapter = textureAdapter;
};

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#release
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.TextureModelAdapter.prototype.release = function() {
    this.textureAdapter.release();
    this.textureAdapter = null;
};

/**
 * Get the textureAdapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.TextureModelAdapter.prototype.getTextureAdapter = function() {
    return this.textureAdapter;
};