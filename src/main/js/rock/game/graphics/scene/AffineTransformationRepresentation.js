rock.namespace('rock.game.graphics.scene');

/**
 * A representation that makes easy to apply affine transformations to its model.
 *
 * @constructor
 * @abstract
 * @extends rock.game.graphics.scene.Representation
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.scene.AffineTransformationRepresentation = function (representationAttendant, object) {
    rock.super_(this, arguments);

    this.applyAffineTransformationsFromModelCenter = false;

    this.translation = new rock.geometry.Point3(0, 0, 0);

    this.rotationMode = rock.game.graphics.scene.AffineTransformationRepresentation.ROTATION_MODE_XYZ;
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;

    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
};

rock.extends_(rock.game.graphics.scene.AffineTransformationRepresentation, rock.game.graphics.scene.Representation);

/**
 * In this mode, the rotations are applied in the next order: axis X, axis Y and axis Z.
 * @const
 */
rock.game.graphics.scene.AffineTransformationRepresentation.ROTATION_MODE_XYZ = 'ROTATION_MODE_XYZ';

rock.game.graphics.scene.AffineTransformationRepresentation.prototype.updateModelView = function () {
    this.setAffineTransformationValues();
    this.applyAffineTransformations();
};

/**
 *
 * @function
 */
rock.game.graphics.scene.AffineTransformationRepresentation.prototype.setAffineTransformationValues = rock.abstract_;

rock.game.graphics.scene.AffineTransformationRepresentation.prototype.applyAffineTransformations = function () {
    // Calculate modelMatrix
    var modelMatrix = this.matrix_ma;
    this.computeModelMatrix(modelMatrix);

    // Apply modelMatrix
    var renderables = this.renderables;
    var length = renderables.getLength();
    var i, renderable, renderableModelMatrix;
    for (i = 0; i < length; i++) {
        renderable = renderables.getValue(i);
        renderableModelMatrix = renderable.getModelMatrix();
        renderableModelMatrix.initFromMatrix(modelMatrix);
    }
};

rock.game.graphics.scene.AffineTransformationRepresentation.prototype.computeModelMatrix = function (modelMatrix) {
    modelMatrix.identity();

    // the order applied is inverse
    this.applyTranslation(modelMatrix);
    this.applyRotation(modelMatrix);
    this.applyScale(modelMatrix);

    this.moveModelCenterToOrigin(modelMatrix);
};

rock.game.graphics.scene.AffineTransformationRepresentation.prototype.applyTranslation = function (modelMatrix) {
    var translationPoint = this.translation;
    modelMatrix.translate(translationPoint.getX(), translationPoint.getY(), translationPoint.getZ());
};

rock.game.graphics.scene.AffineTransformationRepresentation.prototype.applyRotation = function (modelMatrix) {
    var rotationMode = this.rotationMode;

    if (rotationMode == rock.game.graphics.scene.AffineTransformationRepresentation.ROTATION_MODE_XYZ) {
        modelMatrix.rotateX(this.rotationX);
        modelMatrix.rotateY(this.rotationY);
        modelMatrix.rotateZ(this.rotationZ);
    } else {
        // TODO: throw exception
    }
};

rock.game.graphics.scene.AffineTransformationRepresentation.prototype.applyScale = function (modelMatrix) {
    modelMatrix.scale(this.scaleX, this.scaleY, this.scaleZ);
};

rock.game.graphics.scene.AffineTransformationRepresentation.prototype.moveModelCenterToOrigin = function (modelMatrix) {
    if (!this.applyAffineTransformationsFromModelCenter) {
        return;
    }

    var modelCenter = this.model.getCenter();
    modelMatrix.translate(-modelCenter.getX(), -modelCenter.getY(), -modelCenter.getZ());
};