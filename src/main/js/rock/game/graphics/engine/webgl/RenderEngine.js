rock.namespace('rock.game.graphics.engine.webgl');

/**
 * Render engine for WebGL.
 *
 * @param {rock.graphics.IGraphicsEngine} graphicsEngine
 *
 * @constructor
 * @abstract
 * @extends rock.game.graphics.engine.RenderEngine
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.webgl.RenderEngine = function (graphicsEngine) {
    rock.super_(this, arguments);

    this.adapterConstructors = {};
};

rock.extends_(rock.game.graphics.engine.webgl.RenderEngine, rock.game.graphics.engine.RenderEngine);

rock.game.graphics.engine.webgl.RenderEngine.prototype.addAdapterConstructor = function (modelType, adapterConstructor) {
    this.adapterConstructors[modelType] = adapterConstructor;
};

rock.game.graphics.engine.webgl.RenderEngine.prototype.createAdapter = function (model) {
    var glContext = this.graphicsEngine.getContext();
    var type = model.getType();

    var adapterConstructor = this.adapterConstructors[type];
    if (rock.util.JsUtils.isNullOrUndefined(adapterConstructor)) {
        return null;
    }
    return new adapterConstructor(glContext, model);
};
