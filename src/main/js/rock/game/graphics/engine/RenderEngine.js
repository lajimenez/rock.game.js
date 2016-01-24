rock.namespace('rock.game.graphics.engine');

/**
 * The render engine is responsible for rendering game. Internally, this class will use a
 * {@link rock.game.graphics.engine.renderer.RendererContext} to do the render
 *
 * @param {rock.graphics.IGraphicsEngine} graphicsEngine
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.RenderEngine = function (graphicsEngine) {
    this.graphicsEngine = graphicsEngine;
    this.rendererContexts = {};
    this.currentRendererContext = null;

    this.renderableConstructors = {};
};

/**
 * Add a new renderable constructor that will be used for a specific model type.
 *
 * @param modelType
 * @param renderableConstructor
 */
rock.game.graphics.engine.RenderEngine.prototype.addRenderableConstructor = function (modelType, renderableConstructor) {
    this.renderableConstructors[modelType] = renderableConstructor;
};

/**
 * Add a new renderer context
 *
 * @param {rock.game.graphics.engine.renderer.RendererContext} rendererContext
 */
rock.game.graphics.engine.RenderEngine.prototype.addRendererContext = function (rendererContext) {
    this.rendererContexts[rendererContext.getId()] = rendererContext;
};

/**
 * Set renderer context to use
 *
 * @param {String} id
 */
rock.game.graphics.engine.RenderEngine.prototype.setActiveRendererContext = function (id) {
    this.currentRendererContext = this.rendererContexts[id];
};

/**
 * Do the render
 *
 * @param {rock.game.graphics.scene.Camera} camera
 * @param {rock.game.graphics.scene.Lighting} lighting
 * @param {rock.js.Array} representations
 *      array of {@link rock.game.graphics.scene.Representation}
 */
rock.game.graphics.engine.RenderEngine.prototype.render = function (camera, lighting, representations) {
   this.currentRendererContext.render(camera, lighting, representations);
};

/**
 * Get the graphicsEngine
 */
rock.game.graphics.engine.RenderEngine.prototype.getGraphicsEngine = function() {
    return this.graphicsEngine;
};

/**
 * Set the color used for clear window before drawing
 *
 * @param {rock.graphics.Color} color
 */
rock.game.graphics.engine.RenderEngine.prototype.setClearColor = function (color) {
    var rendererContexts = this.rendererContexts;
    var propertyName, rendererContext;

    for (propertyName in rendererContexts) {
        rendererContext = rendererContexts[propertyName];
        if (rock.instanceof_(rendererContext, rock.game.graphics.engine.renderer.RendererContext)) {
            rendererContext.setClearColor(color);
        }
    }
};

/**
 * Create a renderable for an specific model. This method should only be call for the
 * {@link rock.game.engine.RepresentationAttendant}.
 *
 * @param {rock.game.graphics.model.Model} model
 *
 * @returns {rock.game.graphics.engine.renderer.ModelRenderable} renderable
 */
rock.game.graphics.engine.RenderEngine.prototype.createRenderable = function (model) {
    var type = model.getType();

    var renderableConstructor = this.renderableConstructors[type];
    if (rock.util.JsUtils.isNullOrUndefined(renderableConstructor)) {
        return null;
    }
    var renderable = new renderableConstructor();
    renderable.setModel(model);
    renderable.setModelType(model.getType());
    return renderable;
};