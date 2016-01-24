rock.namespace('rock.game.graphics.model.material');

/**
 * Represents a material wich color comes from a texture.
 *
 * @constructor
 * @extends rock.game.graphics.model.material.Material
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.material.TextureMaterial = function (texture) {
    rock.super_(this);
    this.texture = texture;
};

rock.extends_(rock.game.graphics.model.material.TextureMaterial, rock.game.graphics.model.material.Material);

rock.game.graphics.model.material.TextureMaterial.prototype.loadFromJSON = function (JSON, repository) {
    var JSONTexture = JSON.texture;
    var image = repository.getTextureImage(JSONTexture.image);
    this.texture = new rock.game.graphics.model.material.Texture(image);
};

/**
 * Get the texture
 */
rock.game.graphics.model.material.TextureMaterial.prototype.getTexture = function() {
    return this.texture;
};

/**
 * Set the texture
 *
 * @param texture the value
 */
rock.game.graphics.model.material.TextureMaterial.prototype.setTexture = function(texture) {
    this.texture = texture;
};
