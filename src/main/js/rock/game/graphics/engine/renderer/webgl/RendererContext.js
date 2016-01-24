rock.namespace('rock.game.graphics.engine.renderer.webgl');

/**
 * Renderer context class for WebGL
 *
 * @param {String} id
 *         the renderer id
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.RendererContext
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.RendererContext = function (id, glContext) {
    rock.super_(this, [id]);
    this.glContext = glContext;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.RendererContext,
    rock.game.graphics.engine.renderer.RendererContext);

rock.game.graphics.engine.renderer.webgl.RendererContext.prototype.setUp = function () {
    var gl = this.glContext.getHTMLContext();
    gl.enable(gl.DEPTH_TEST);

    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // gl.frontFace(gl.CCW); // CW - CCW
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK); // FRONT - BACK - FRONT_AND_BACK
};

rock.game.graphics.engine.renderer.webgl.RendererContext.prototype.clear = function () {
    var gl = this.glContext.getHTMLContext();
    var color = this.clearColor;
    gl.clearColor(color.getNormalizedRed(), color.getNormalizedGreen(), color
        .getNormalizedBlue(), color.getNormalizedAlpha());
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};
