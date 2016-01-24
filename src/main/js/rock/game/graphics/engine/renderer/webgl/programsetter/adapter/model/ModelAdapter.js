rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model');

/**
 * Adapter for {@link rock.game.graphics.model.Model}
 *
 * @constructor
 * @abstract
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter = function (glContext, model, meshAdapterClass, materialAdapterClass) {
    rock.super_(this, [glContext]);
    this.model = model;

    this.meshAdapterClass = meshAdapterClass;
    this.materialAdapterClass = materialAdapterClass;

    this.meshAdapter = null;
    this.materialAdapter = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter);

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#build
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter.prototype.build = function () {
    var glContext = this.glContext;
    var model = this.model;
    var meshAdapterClass = this.meshAdapterClass;
    var meshAdapter = null;
    if (!rock.util.JsUtils.isNullOrUndefined(meshAdapterClass)) {
        meshAdapter = new meshAdapterClass(glContext, model.getMesh());
        meshAdapter.build();
        this.meshAdapter = meshAdapter;
    }

    var materialAdapterClass = this.materialAdapterClass;
    var materialAdapter = null;
    if (!rock.util.JsUtils.isNullOrUndefined(materialAdapterClass)) {
        materialAdapter = new materialAdapterClass(glContext, model.getMaterial());
        materialAdapter.build();
        this.materialAdapter = materialAdapter;
    }
};

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#release
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter.prototype.release = function () {
    var meshAdapter = this.meshAdapter;
    if (!rock.util.JsUtils.isNullOrUndefined(meshAdapter)) {
        meshAdapter.release();
        this.meshAdapter = null;
    }

    var materialAdapter = this.materialAdapter;
    if (!rock.util.JsUtils.isNullOrUndefined(materialAdapter)) {
        materialAdapter.release();
        this.materialAdapter = null;
    }
};


/**
 * Get the model
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter.prototype.getModel = function() {
    return this.model;
};

/**
 * Get the meshAdapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter.prototype.getMeshAdapter = function() {
    return this.meshAdapter;
};

/**
 * Get the materialAdapter
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.model.ModelAdapter.prototype.getMaterialAdapter = function() {
    return this.materialAdapter;
};