rock.namespace('rock.game.scene');

/**
 * Represents a camera.
 * You need a camera when rendering a scene to determine which part of the world you want see.
 *
 * @param {rock.geometry.Point3} position
 *            the position of the camera
 * @param {rock.geometry.Point3} lookAt
 *            the point where the camera is looking
 * @param {rock.geometry.Vector3} upVector
 *            the up vector
 * @param fov
 *            the field of view (vertical)
 * @param aspectRatio
 *            the aspect ratio
 * @param zNear
 *            the z near plane
 * @param zFar
 *            the z far plane
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.scene.Camera = function (position, lookAt, upVector, fov, aspectRatio, zNear, zFar) {
    this.position = position;
    this.lookAt = lookAt;
    this.upVector = upVector;
    this.fov = fov;
    this.aspectRatio = aspectRatio;
    this.zNear = zNear;
    this.zFar = zFar;

    // cached matrix
    this.lookAtViewMatrix = new rock.geometry.Matrix4();
    this.perspectiveProjectionMatrix = new rock.geometry.Matrix4();

    // This variables are used to void memory allocations on every execution
    this.forward_ma = new rock.geometry.Vector3(0, 0, 0);
    this.side_ma = new rock.geometry.Vector3(0, 0, 0);
    this.up_ma = new rock.geometry.Vector3(0, 0, 0);
};

/**
 * Check if the values of the camera are correct
 *
 * @private
 */
rock.game.graphics.scene.Camera.prototype.validValues = function () {
    if (this.zNear < 1) {
        return false;
    }
    else if (this.zFar < this.zNear) {
        return false;
    }
    else if (this.fov < 1) {
        return false;
    }

    return true;
};

rock.game.graphics.scene.Camera.prototype.updateMatrices = function () {
    this.updateLookAtViewMatrix();
    this.updatePerspectiveProjectionMatrix();
};

/**
 * Update the view matrix defined by this camera (right hand)
 * (http://www.opengl.org/wiki/GluLookAt_code)
 *
 * @return {rock.geometry.Matrix4} the view matrix
 */
rock.game.graphics.scene.Camera.prototype.updateLookAtViewMatrix = function () {
    var position = this.position;
    var lookAt = this.lookAt;
    var upVector = this.upVector;

    var lookAtViewMatrix = this.lookAtViewMatrix;
    lookAtViewMatrix.identity();

    var forward = this.forward_ma;
    forward.setX(lookAt.getX() - position.getX());
    forward.setY(lookAt.getY() - position.getY());
    forward.setZ(lookAt.getZ() - position.getZ());
    forward.normalize();

    // Side = forward x up
    var side = rock.util.GeometryUtils.crossProduct(forward, upVector, this.side_ma);
    side.normalize();

    // Recompute up as: up = side x forward
    var up = rock.util.GeometryUtils.crossProduct(side, forward, this.up_ma);
    // up.normalize(); -> Not necessary :)

    lookAtViewMatrix.setValue(0, 0, side.getX());
    lookAtViewMatrix.setValue(0, 1, side.getY());
    lookAtViewMatrix.setValue(0, 2, side.getZ());
    lookAtViewMatrix.setValue(0, 3, 0);

    lookAtViewMatrix.setValue(1, 0, up.getX());
    lookAtViewMatrix.setValue(1, 1, up.getY());
    lookAtViewMatrix.setValue(1, 2, up.getZ());
    lookAtViewMatrix.setValue(1, 3, 0);

    lookAtViewMatrix.setValue(2, 0, -forward.getX());
    lookAtViewMatrix.setValue(2, 1, -forward.getY());
    lookAtViewMatrix.setValue(2, 2, -forward.getZ());
    lookAtViewMatrix.setValue(2, 3, 0);

    lookAtViewMatrix.translate(-position.getX(), -position.getY(), -position.getZ());
};

/**
 * Update the perspective projection matrix defined by this camera
 * (http://www.songho.ca/opengl/gl_projectionmatrix.html)
 *
 * @return {rock.geometry.Matrix4} the projection matrix
 */
rock.game.graphics.scene.Camera.prototype.updatePerspectiveProjectionMatrix = function () {
    //if (!this.validValues()) {
    //    throw new rock.error.RockError(rock.resource.rockResourceManager.getString('CAMERA_INVALID_VALUES'));
    //}

    // We have to compute the top, bottom, left and right
    var halfAngle = this.fov / 2;

    var radians = rock.util.GeometryUtils.degToRad(halfAngle);

    var near = this.zNear;
    var far = this.zFar;

    var top = Math.tan(radians) * near;
    var bottom = -top;

    var right = top * this.aspectRatio;
    var left = -right;

    var perspectiveProjectionMatrix = this.perspectiveProjectionMatrix;
    perspectiveProjectionMatrix.identity();

    perspectiveProjectionMatrix.setValue(0, 0, (2 * near) / (right - left));
    perspectiveProjectionMatrix.setValue(1, 0, 0);
    perspectiveProjectionMatrix.setValue(2, 0, 0);
    perspectiveProjectionMatrix.setValue(3, 0, 0);

    perspectiveProjectionMatrix.setValue(0, 1, 0);
    perspectiveProjectionMatrix.setValue(1, 1, (2 * near) / (top - bottom));
    perspectiveProjectionMatrix.setValue(2, 1, 0);
    perspectiveProjectionMatrix.setValue(3, 1, 0);

    perspectiveProjectionMatrix.setValue(0, 2, (right + left) / (right - left));
    perspectiveProjectionMatrix.setValue(1, 2, (top + bottom) / (top - bottom));
    perspectiveProjectionMatrix.setValue(2, 2, -(far + near) / (far - near));
    perspectiveProjectionMatrix.setValue(3, 2, -1);

    perspectiveProjectionMatrix.setValue(0, 3, 0);
    perspectiveProjectionMatrix.setValue(1, 3, 0);
    perspectiveProjectionMatrix.setValue(2, 3, -(2 * far * near) / (far - near));
    perspectiveProjectionMatrix.setValue(3, 3, 0);
};

rock.game.graphics.scene.Camera.prototype.getLookAtViewMatrix = function () {
    return this.lookAtViewMatrix;
};

rock.game.graphics.scene.Camera.prototype.getPerspectiveProjectionMatrix = function () {
    return this.perspectiveProjectionMatrix
};

/**
 * Get the position
 *
 * @returns the value
 */
rock.game.graphics.scene.Camera.prototype.getPosition = function () {
    return this.position;
};

/**
 * Set the position
 *
 * @param position
 *            the value to set
 */
rock.game.graphics.scene.Camera.prototype.setPosition = function (position) {
    this.position = position;
};

/**
 * Get the lookAt
 *
 * @returns the value
 */
rock.game.graphics.scene.Camera.prototype.getLookAt = function () {
    return this.lookAt;
};

/**
 * Set the lookAt
 *
 * @param lookAt
 *            the value to set
 */
rock.game.graphics.scene.Camera.prototype.setLookAt = function (lookAt) {
    this.lookAt = lookAt;
};

/**
 * Get the upVector
 *
 * @returns the value
 */
rock.game.graphics.scene.Camera.prototype.getUpVector = function () {
    return this.upVector;
};

/**
 * Set the upVector
 *
 * @param upVector
 *            the value to set
 */
rock.game.graphics.scene.Camera.prototype.setUpVector = function (upVector) {
    this.upVector = upVector;
};

/**
 * Get the fov
 *
 * @returns the value
 */
rock.game.graphics.scene.Camera.prototype.getFov = function () {
    return this.fov;
};

/**
 * Set the fov
 *
 * @param fov
 *            the value to set
 */
rock.game.graphics.scene.Camera.prototype.setFov = function (fov) {
    this.fov = fov;
};

/**
 * Get the aspectRatio
 *
 * @returns the value
 */
rock.game.graphics.scene.Camera.prototype.getAspectRatio = function () {
    return this.aspectRatio;
};

/**
 * Set the aspectRatio
 *
 * @param aspectRatio
 *            the value to set
 */
rock.game.graphics.scene.Camera.prototype.setAspectRatio = function (aspectRatio) {
    this.aspectRatio = aspectRatio;
};

/**
 * Get the zNear
 *
 * @returns the value
 */
rock.game.graphics.scene.Camera.prototype.getZNear = function () {
    return this.zNear;
};

/**
 * Set the zNear
 *
 * @param zNear
 *            the value to set
 */
rock.game.graphics.scene.Camera.prototype.setZNear = function (zNear) {
    this.zNear = zNear;
};

/**
 * Get the zFar
 *
 * @returns the value
 */
rock.game.graphics.scene.Camera.prototype.getZFar = function () {
    return this.zFar;
};

/**
 * Set the zFar
 *
 * @param zFar
 *            the value to set
 */
rock.game.graphics.scene.Camera.prototype.setZFar = function (zFar) {
    this.zFar = zFar;
};
