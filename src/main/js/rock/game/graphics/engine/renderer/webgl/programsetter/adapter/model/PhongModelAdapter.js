rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model');

/**
 * Adapter for {@link rock.game.graphics.model.PhongModel}
 *
 * @constructor
 * @abstract
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.PhongModelAdapter = function (glContext, model) {
    var meshAdapterClass = rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.NormalMeshAdapter;
    var materialAdapterClass = null;
    rock.super_(this, [glContext, model, meshAdapterClass, materialAdapterClass]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.PhongModelAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter);