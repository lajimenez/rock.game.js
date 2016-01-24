rock.namespace('rock.scene.node');

/**
 * Lighting node.
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.scene.node.LightingNode = function () {
    /**
     * @type {rock.game.graphics.scene.Lighting}
     */
    this.lighting = null;
};

/**
 * Get the lighting
 */
rock.scene.node.LightingNode.prototype.getLighting = function() {
    return this.lighting;
};

/**
 * Set the lighting
 *
 * @param {rock.game.graphics.scene.Lighting} lighting the value
 */
rock.scene.node.LightingNode.prototype.setLighting = function(lighting) {
    this.lighting = lighting;
};
