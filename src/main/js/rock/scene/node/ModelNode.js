rock.namespace('rock.scene.node');

/**
 * Model node.
 *
 * @constructor
 * @extends rock.game.universe.Object
 *
 * @author Luis Alberto Jiménez
 */
rock.scene.node.ModelNode = function (world) {
    rock.super_(this, [rock.scene.constants.MODEL_NODE_TYPE, world]);

    this.applyAffineTransformationsFromModelCenter = false;

    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;

    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
};

rock.extends_(rock.scene.node.ModelNode, rock.game.universe.Object);

rock.scene.node.ModelNode.prototype.releaseResources = function () {
    this.representation.releaseRenderables();
};

/**
 * Get the applyAffineTransformationsFromModelCenter
 */
rock.scene.node.ModelNode.prototype.getApplyAffineTransformationsFromModelCenter = function() {
    return this.applyAffineTransformationsFromModelCenter;
};

/**
 * Set the applyAffineTransformationsFromModelCenter
 *
 * @param applyAffineTransformationsFromModelCenter the value
 */
rock.scene.node.ModelNode.prototype.setApplyAffineTransformationsFromModelCenter = function(applyAffineTransformationsFromModelCenter) {
    this.applyAffineTransformationsFromModelCenter = applyAffineTransformationsFromModelCenter;
};

/**
 * Get the translation
 */
rock.scene.node.ModelNode.prototype.getTranslation = function() {
    return this.position;
};

/**
 * Set the translation
 *
 * @param translationX
 * @param translationY
 * @param translationZ
 */
rock.scene.node.ModelNode.prototype.setTranslation = function(translationX, translationY, translationZ) {
    var translation = this.position;
    translation.setX(translationX);
    translation.setY(translationY);
    translation.setZ(translationZ);
};

rock.scene.node.ModelNode.prototype.getBBOX = function () {
    var modelCenter;
    var model = this.representation.getModel();
    var transformedBBOX = model.getBBOX();
    if (this.applyAffineTransformationsFromModelCenter) {
        modelCenter = model.getCenter();
        transformedBBOX = transformedBBOX.getTranslatedBBOX(-modelCenter.getX(), -modelCenter.getY(), -modelCenter.getZ());
    }

    var position = this.position;
    transformedBBOX = transformedBBOX.getRotatedBBOX(this.rotationX, this.rotationY, this.rotationZ);
    transformedBBOX = transformedBBOX.getScaledBBOX(this.scaleX, this.scaleY, this.scaleZ);
    transformedBBOX = transformedBBOX.getTranslatedBBOX(position.getX(), position.getY(), position.getZ());

    return transformedBBOX;
};

/**
 * Get the rotationX
 */
rock.scene.node.ModelNode.prototype.getRotationX = function() {
    return this.rotationX;
};

/**
 * Set the rotationX
 *
 * @param rotationX the value
 */
rock.scene.node.ModelNode.prototype.setRotationX = function(rotationX) {
    this.rotationX = rotationX;
};

/**
 * Get the rotationY
 */
rock.scene.node.ModelNode.prototype.getRotationY = function() {
    return this.rotationY;
};

/**
 * Set the rotationY
 *
 * @param rotationY the value
 */
rock.scene.node.ModelNode.prototype.setRotationY = function(rotationY) {
    this.rotationY = rotationY;
};

/**
 * Get the rotationZ
 */
rock.scene.node.ModelNode.prototype.getRotationZ = function() {
    return this.rotationZ;
};

/**
 * Set the rotationZ
 *
 * @param rotationZ the value
 */
rock.scene.node.ModelNode.prototype.setRotationZ = function(rotationZ) {
    this.rotationZ = rotationZ;
};

/**
 * Get the scaleX
 */
rock.scene.node.ModelNode.prototype.getScaleX = function() {
    return this.scaleX;
};

/**
 * Set the scaleX
 *
 * @param scaleX the value
 */
rock.scene.node.ModelNode.prototype.setScaleX = function(scaleX) {
    this.scaleX = scaleX;
};

/**
 * Get the scaleY
 */
rock.scene.node.ModelNode.prototype.getScaleY = function() {
    return this.scaleY;
};

/**
 * Set the scaleY
 *
 * @param scaleY the value
 */
rock.scene.node.ModelNode.prototype.setScaleY = function(scaleY) {
    this.scaleY = scaleY;
};

/**
 * Get the scaleZ
 */
rock.scene.node.ModelNode.prototype.getScaleZ = function() {
    return this.scaleZ;
};

/**
 * Set the scaleZ
 *
 * @param scaleZ the value
 */
rock.scene.node.ModelNode.prototype.setScaleZ = function(scaleZ) {
    this.scaleZ = scaleZ;
};