rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model');

/**
 * Adapter for {@link rock.game.graphics.model.TextureModel}
 *
 * @constructor
 * @abstract
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.TextureModelAdapter = function (glContext, model) {
    var meshAdapterClass =
        rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.TextureCoordMeshAdapter;
    var materialAdapterClass =
        rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.material.TextureModelAdapter;
    rock.super_(this, [glContext, model, meshAdapterClass, materialAdapterClass]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.TextureModelAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter);