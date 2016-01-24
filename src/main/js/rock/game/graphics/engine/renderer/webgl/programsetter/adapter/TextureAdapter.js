rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter');

/**
 * Adapter for {@link rock.game.graphics.model.material.Texture}
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.TextureAdapter = function (glContext, texture) {
    rock.super_(this, [glContext]);
    this.texture = texture;
    this.glTexture = null;

    // Handle context events
    var app = glContext.getApplication();
    app.addEventListener(rock.constants.ROCK_EVENT_CONTEXT_RESTORED, rock.createEventHandler(this, this.onContextRestored));
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.TextureAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter);

/**
 * Function for handling event context restore
 *
 * @private
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.TextureAdapter.prototype.onContextRestored = function () {
    this.restore();
};

/**
 * Restore the adapter
 *
 * @private
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.TextureAdapter.prototype.restore  = function () {
    this.build();
};

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#build
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.TextureAdapter.prototype.build  = function () {
    var gl = this.glContext.getHTMLContext();
    var texture = this.texture;
    var textureImage = texture.getImage();
    this.glTexture = rock.util.WebGlUtils.populateTexture(gl, textureImage);
};

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#release
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.TextureAdapter.prototype.release  = function () {
    var gl = this.glContext.getHTMLContext();
    var glTexture = this.glTexture;

    if (glTexture != null) {
        gl.deleteTexture(glTexture);
        this.glTexture = null;
    }
};

/**
 * Get the glTexture
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.TextureAdapter.prototype.getGlTexture = function() {
    return this.glTexture;
};