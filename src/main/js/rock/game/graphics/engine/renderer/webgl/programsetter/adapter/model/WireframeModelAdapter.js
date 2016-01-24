rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model');

/**
 * Adapter for {@link rock.game.graphics.model.WireframeColorModel}
 *
 * @constructor
 * @abstract
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.WireframeModelAdapter = function (glContext, model) {
    var meshAdapterClass = rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.mesh.MeshAdapter;
    var materialAdapterClass = null;
    rock.super_(this, [glContext, model, meshAdapterClass, materialAdapterClass]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.WireframeModelAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter);