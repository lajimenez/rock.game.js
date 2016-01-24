rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model');

/**
 * Adapter for {@link rock.game.graphics.model.PhongTextureModel}
 *
 * @constructor
 * @abstract
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.PhongTextureModelAdapter = function (glContext, model) {
    var meshAdapterClass =
        rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordNormalMeshAdapter;
    var materialAdapterClass =
        rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.PhongTextureMaterialAdapter;
    rock.super_(this, [glContext, model, meshAdapterClass, materialAdapterClass]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.PhongTextureModelAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter);