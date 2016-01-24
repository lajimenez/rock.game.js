rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material');

/**
 * Adapter for {@link rock.game.graphics.model.material.PhongTextureMaterial}
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *
 * @param {rock.game.graphics.model.material.Material} material
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.MaterialAdapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.PhongTextureMaterialAdapter = function (glContext, material) {
    rock.super_(this, arguments);
    this.ambientTextureAdapter = null;
    this.diffuseTextureAdapter = null;
    this.specularTextureAdapter = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.PhongTextureMaterialAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.MaterialAdapter);

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#build
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.PhongTextureMaterialAdapter.prototype.build = function() {
    var material = this.material;
    var glContext = this.glContext;
    var texture, textureAdapter;

    texture = material.getAmbientTexture();
    if (texture != null) {
        textureAdapter = new rock.game.graphics.engine.renderer.webgl.programsetter.adapter.TextureAdapter(glContext, texture);
        textureAdapter.build();
        this.ambientTextureAdapter = textureAdapter;
    }

    texture = material.getDiffuseTexture();
    if (texture != null) {
        textureAdapter = new rock.game.graphics.engine.renderer.webgl.programsetter.adapter.TextureAdapter(glContext, texture);
        textureAdapter.build();
        this.diffuseTextureAdapter = textureAdapter;
    }

    texture = material.getSpecularTexture();
    if (texture != null) {
        textureAdapter = new rock.game.graphics.engine.renderer.webgl.programsetter.adapter.TextureAdapter(glContext, texture);
        textureAdapter.build();
        this.specularTextureAdapter = textureAdapter;
    }
};

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#release
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.PhongTextureMaterialAdapter.prototype.release = function() {
    var adapter = this.ambientTextureAdapter;
    if (adapter != null) {
        adapter.release();
        this.ambientTextureAdapter = null;
    }

    adapter = this.diffuseTextureAdapter;
    if (adapter != null) {
        adapter.release();
        this.diffuseTextureAdapter = null;
    }

    adapter = this.specularTextureAdapter;
    if (adapter != null) {
        adapter.release();
        this.specularTextureAdapter = null;
    }
};

/**
 * Get the ambientTextureAdapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.PhongTextureMaterialAdapter.prototype.getAmbientTextureAdapter = function() {
    return this.ambientTextureAdapter;
};

/**
 * Get the diffuseTextureAdapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.PhongTextureMaterialAdapter.prototype.getDiffuseTextureAdapter = function() {
    return this.diffuseTextureAdapter;
};

/**
 * Get the specularTextureAdapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.PhongTextureMaterialAdapter.prototype.getSpecularTextureAdapter = function() {
    return this.specularTextureAdapter;
};