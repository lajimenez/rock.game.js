rock.namespace('rock.scene.node');

/**
 * Camera node.
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.scene.node.CameraNode = function () {
    /**
     * @type {rock.game.graphics.scene.Camera}
     */
    this.camera = null;
};

/**
 * Get the camera
 */
rock.scene.node.CameraNode.prototype.getCamera = function() {
    return this.camera;
};

/**
 * Set the camera
 *
 * @param {rock.game.graphics.scene.Camera} camera
 *      the value
 */
rock.scene.node.CameraNode.prototype.setCamera = function(camera) {
    this.camera = camera;
};
