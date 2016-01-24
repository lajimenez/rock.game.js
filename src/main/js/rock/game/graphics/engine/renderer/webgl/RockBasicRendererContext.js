rock.namespace('rock.game.graphics.engine.renderer.webgl');

/**
 * Renderer context with some basic renderers.
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.RendererContext
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.RockBasicRendererContext = function (glContext) {
    rock.super_(this, [rock.game.constants.ROCK_BASIC_RENDERER_CONTEXT_ID, glContext]);

    this.addRenderer(
        new rock.game.graphics.engine.renderer.webgl.WireframeColorMaterialModelRenderer(glContext));
    this.addRenderer(
        new rock.game.graphics.engine.renderer.webgl.TextureMaterialModelRenderer(glContext));
    this.addRenderer(
        new rock.game.graphics.engine.renderer.webgl.DirectionalLightingPhongMaterialModelRenderer(glContext));
    this.addRenderer(
        new rock.game.graphics.engine.renderer.webgl.DirectionalLightingPhongTextureMaterialModelRenderer(glContext));
    this.addRenderer(
        new rock.game.graphics.engine.renderer.webgl.PointLightingPhongMaterialModelRenderer(glContext));
    this.addRenderer(
        new rock.game.graphics.engine.renderer.webgl.PointLightingPhongTextureMaterialModelRenderer(glContext));
    this.addRenderer(
        new rock.game.graphics.engine.renderer.webgl.SpotlightLightingPhongMaterialModelRenderer(glContext));
    this.addRenderer(
        new rock.game.graphics.engine.renderer.webgl.SpotlightLightingPhongTextureMaterialModelRenderer(glContext));
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.RockBasicRendererContext,
    rock.game.graphics.engine.renderer.webgl.RendererContext);