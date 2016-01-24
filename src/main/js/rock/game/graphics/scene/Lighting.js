rock.namespace('rock.game.graphics.scene');

/**
 * Represents an illumination model. It's used when render an scene.
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.scene.Lighting = function (type) {
    this.type = type;
};

/**
 * Get the type
 */
rock.game.graphics.scene.Lighting.prototype.getType = function() {
    return this.type;
};

/**
 * Set the type
 *
 * @param type the value
 */
rock.game.graphics.scene.Lighting.prototype.setType = function(type) {
    this.type = type;
};