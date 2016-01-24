rock.namespace('rock.game.graphics.model.mesh');

/**
 * Mesh with texture coordinates
 *
 * @constructor
 * @extends rock.game.graphics.model.mesh.Mesh
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.mesh.TextureCoordMesh = function () {
    rock.super_(this);

    /**
     * List of texture coordinates
     *
     * @private
     */
    this.textureCoordinates = [];
};

rock.extends_(rock.game.graphics.model.mesh.TextureCoordMesh, rock.game.graphics.model.mesh.Mesh);

rock.game.graphics.model.mesh.TextureCoordMesh.prototype.loadFromJSON = function (JSON) {
    rock.super_method(this, rock.game.graphics.model.mesh.TextureCoordMesh, 'loadFromJSON', arguments);

    this.setTextureCoordinates(JSON.textureCoordinates);
};

/**
 * Get the textureCoordinates
 */
rock.game.graphics.model.mesh.TextureCoordMesh.prototype.getTextureCoordinates = function () {
    return this.textureCoordinates;
};

/**
 * Set the textureCoordinates
 *
 * @param textureCoordinates the value
 */
rock.game.graphics.model.mesh.TextureCoordMesh.prototype.setTextureCoordinates = function (textureCoordinates) {
    this.textureCoordinates = textureCoordinates;
};