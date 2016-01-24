rock.namespace('rock.scene.graphics.scene');

/**
 * This class is the representation for a ModelNode.
 *
 * ATTENTION:
 * This class is awful. The representations are not thought to be generic...
 * A representation must know what model it handles but here a generic model is passed instead...
 * This is why 'updateModel' and 'createRenderables' has no code and there is a function
 * 'createRenderablesFromModel' that let you initiate the representation from a model.
 * PLEASE, AVOID TO DO THIS WHENEVER POSSIBLE
 *
 * @constructor
 * @extends rock.game.graphics.scene.AffineTransformationRepresentation
 *
 * @author Luis Alberto Jiménez
 */
rock.scene.graphics.scene.ModelNodeRepresentation = function (representationAttendant, object) {
    rock.super_(this, arguments);
};

rock.extends_(rock.scene.graphics.scene.ModelNodeRepresentation, rock.game.graphics.scene.AffineTransformationRepresentation);

rock.scene.graphics.scene.ModelNodeRepresentation.prototype.updateModel = function () {
};

rock.scene.graphics.scene.ModelNodeRepresentation.prototype.createRenderables = function () {
};

rock.scene.graphics.scene.ModelNodeRepresentation.prototype.createRenderablesFromModel = function (baseModel) {
    this.model = baseModel;
    var renderables = this.renderables;
    var modelArray = this.getAsModelArray(baseModel);
    var renderEngine = this.representationAttendant.getRenderEngine();

    var i, model, renderable, adapter;
    for (i = 0; i < modelArray.length; i++) {
        model = modelArray[i];
        renderable = renderEngine.createRenderable(model);
        adapter = renderEngine.createAdapter(model);
        adapter.build();
        renderable.setModelAdapter(adapter);
        renderables.addValue(renderable);
    }
};

rock.scene.graphics.scene.ModelNodeRepresentation.prototype.releaseRenderables = function () {
    var renderables = this.renderables;
    var length = renderables.getLength();

    var i, renderable, adapter;
    for (i = 0; i < length; i++) {
        renderable = renderables.getValue(i);
        adapter = renderable.getModelAdapter();
        if (adapter != null) {
            adapter.release();
        }
    }

    renderables.clear(true);
};

rock.scene.graphics.scene.ModelNodeRepresentation.prototype.getAsModelArray = function (model) {
    var modelArray = null;

    if (rock.instanceof_(model, rock.game.graphics.model.GroupModel)) {
        return model.getModels();
    } else {
        modelArray = [];
        modelArray.push(model);
    }

    return modelArray;
};

rock.scene.graphics.scene.ModelNodeRepresentation.prototype.update = function () {
    this.updateModelView();
};

rock.scene.graphics.scene.ModelNodeRepresentation.prototype.setAffineTransformationValues = function () {
    this.setCommonValues();
    this.setTranslation();
    this.setRotation();
    this.setScale();
};

rock.scene.graphics.scene.ModelNodeRepresentation.prototype.setCommonValues = function () {
    this.applyAffineTransformationsFromModelCenter = this.object.getApplyAffineTransformationsFromModelCenter();
};

rock.scene.graphics.scene.ModelNodeRepresentation.prototype.setTranslation = function () {
    var objectNodeTranslation = this.object.getTranslation();
    var translation = this.translation;
    translation.setX(objectNodeTranslation.getX());
    translation.setY(objectNodeTranslation.getY());
    translation.setZ(objectNodeTranslation.getZ());
};

rock.scene.graphics.scene.ModelNodeRepresentation.prototype.setRotation = function () {
    var objectNode = this.object;
    this.rotationX = objectNode.getRotationX();
    this.rotationY = objectNode.getRotationY();
    this.rotationZ = objectNode.getRotationZ();
};

rock.scene.graphics.scene.ModelNodeRepresentation.prototype.setScale = function () {
    var objectNode = this.object;
    this.scaleX = objectNode.getScaleX();
    this.scaleY = objectNode.getScaleY();
    this.scaleZ = objectNode.getScaleZ();
};