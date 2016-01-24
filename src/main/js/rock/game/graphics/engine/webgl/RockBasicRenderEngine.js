rock.namespace('rock.game.graphics.engine.webgl');

/**
 * This a render engine that is ready for using with some basics models.
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} graphicsEngine
 *
 * @constructor
 * @extends rock.game.graphics.engine.webgl.RenderEngine
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.webgl.RockBasicRenderEngine = function (graphicsEngine) {
    rock.super_(this, arguments);

    this.addRenderableConstructor(rock.game.constants.COLOR_MODEL_TYPE,
        rock.game.graphics.engine.renderer.webgl.ModelRenderable);
    this.addRenderableConstructor(rock.game.constants.TEXTURE_MODEL_TYPE,
        rock.game.graphics.engine.renderer.webgl.ModelRenderable);
    this.addRenderableConstructor(rock.game.constants.PHONG_MODEL_TYPE,
        rock.game.graphics.engine.renderer.webgl.ModelRenderable);
    this.addRenderableConstructor(rock.game.constants.PHONG_TEXTURE_MODEL_TYPE,
        rock.game.graphics.engine.renderer.webgl.ModelRenderable);

    this.addAdapterConstructor(rock.game.constants.COLOR_MODEL_TYPE,
        rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.WireframeModelAdapter);
    this.addAdapterConstructor(rock.game.constants.TEXTURE_MODEL_TYPE,
        rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.TextureModelAdapter);
    this.addAdapterConstructor(rock.game.constants.PHONG_MODEL_TYPE,
        rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.PhongModelAdapter);
    this.addAdapterConstructor(rock.game.constants.PHONG_TEXTURE_MODEL_TYPE,
        rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.PhongTextureModelAdapter);

    var rendererContext = new rock.game.graphics.engine.renderer.webgl.RockBasicRendererContext(graphicsEngine.getContext());
    this.addRendererContext(rendererContext);
    this.setActiveRendererContext(rendererContext.getId());
};

rock.extends_(rock.game.graphics.engine.webgl.RockBasicRenderEngine, rock.game.graphics.engine.webgl.RenderEngine);
