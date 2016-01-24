rock.namespace('rock.game.graphics.model');

/**
 * This model is just a group of models.
 *
 * @constructor
 * @extends rock.game.graphics.model.Model
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.GroupModel = function() {
    rock.super_(this, [rock.game.constants.GROUP_MODEL_TYPE]);
    /**
     * The elements of the array must be subclasses from @link {rock.game.graphics.model.MeshModel}
     * @type {Array}
     */
    this.models = [];

    this.BBOX_ma = new rock.geometry.BBOX(Number.MAX_VALUE, Number.MIN_VALUE,
        Number.MAX_VALUE, Number.MIN_VALUE,
        Number.MAX_VALUE, Number.MIN_VALUE);
};

rock.extends_(rock.game.graphics.model.GroupModel, rock.game.graphics.model.BaseModel);

rock.game.graphics.model.GroupModel.prototype.getBBOX = function() {
    var BBOX = this.BBOX_ma;
    BBOX.setXMin(Number.MAX_VALUE);
    BBOX.setXMax(Number.MIN_VALUE);
    BBOX.setYMin(Number.MAX_VALUE);
    BBOX.setYMax(Number.MIN_VALUE);
    BBOX.setZMin(Number.MAX_VALUE);
    BBOX.setZMax(Number.MIN_VALUE);

    var models = this.models;
    var i, modelBBOX;
    for (i = 0; i < models.length; i++) {
        modelBBOX = models[i].getBBOX();
        BBOX.join(modelBBOX);
    }

    return BBOX;
};

/**
 * Add a model
 *
 * @param {rock.game.graphics.model.Model} model
 */
rock.game.graphics.model.GroupModel.prototype.addModel = function (model) {
    this.models.push(model);
};

/**
 * Get the meshModels
 */
rock.game.graphics.model.GroupModel.prototype.getModels = function() {
    return this.models;
};

/**
 * Set the meshModels
 *
 * @param meshModels the value
 */
rock.game.graphics.model.GroupModel.prototype.setMeshModels = function(meshModels) {
    this.meshModels = meshModels;
};