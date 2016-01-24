rock.namespace('rock.game.graphics.scene');

/**
 * All world objects that you want to draw must have a representation.
 * A representation can be understood as a controller that is responsible to prepare a model
 * according to its world object.
 * A representation must know how a world object must be drawn (and must be the only one :)
 *
 * @param {rock.game.engine.RepresentationAttendant} representationAttendant
 * @param {rock.game.universe.Object} object
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.scene.Representation = function (representationAttendant, object) {
    this.representationAttendant = representationAttendant;
    this.object = object;
    this.model = null;
    this.renderables = new rock.js.Array();

    this.matrix_ma = new rock.geometry.Matrix4();

    this.updateModel();
    this.createRenderables();
};

/**
 * This method must set the model
 *
 * @function
 */
rock.game.graphics.scene.Representation.prototype.updateModel = rock.abstract_;

/**
 *
 * @function
 */
rock.game.graphics.scene.Representation.prototype.createRenderables = rock.abstract_;

/**
 * TODO: This method will update this representation from the game object.
 *
 * @function
 */
rock.game.graphics.scene.Representation.prototype.update = rock.abstract_;

/**
 * Get the object
 */
rock.game.graphics.scene.Representation.prototype.getObject = function() {
    return this.object;
};

/**
 * Get the model
 */
rock.game.graphics.scene.Representation.prototype.getModel = function() {
    return this.model;
};

/**
 * Get the renderables
 */
rock.game.graphics.scene.Representation.prototype.getRenderables = function() {
    return this.renderables;
};

/**
 * This function update the model matrix from the object position
 */
rock.game.graphics.scene.Representation.prototype.updateRenderablesModelMatrixFromPosition = function () {
    var position = this.object.getPosition();
    var renderables = this.renderables;
    var positionModelMatrix = this.matrix_ma;
    positionModelMatrix.identity();
    positionModelMatrix.translate(position.getX(), position.getY(), position.getZ());

    var i, renderable, renderableModelMatrix, length = renderables.getLength();
    for (i = 0; i < length; i++) {
        renderable = renderables.getValue(0);
        renderableModelMatrix = renderable.getModelMatrix();
        renderableModelMatrix.initFromMatrix(positionModelMatrix);
    }
};
