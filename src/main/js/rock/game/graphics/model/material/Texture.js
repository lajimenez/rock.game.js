rock.namespace('rock.game.graphics.model.material');

/**
 * Represents a texture.
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.material.Texture = function(image) {
    this.image = image;
};

/**
 * Get the image
 */
rock.game.graphics.model.material.Texture.prototype.getImage = function() {
    return this.image;
};

/**
 * Set the image
 *
 * @param image the value
 */
rock.game.graphics.model.material.Texture.prototype.setImage = function(image) {
    this.image = image;
};

/**
 * Clone the material
 *
 * @returns {rock.game.graphics.model.Texture}
 */
rock.game.graphics.model.material.Texture.prototype.clone = function () {
    var clone = new rock.game.graphics.model.Texture();
    clone.setImage(this.image);
    return clone;
};