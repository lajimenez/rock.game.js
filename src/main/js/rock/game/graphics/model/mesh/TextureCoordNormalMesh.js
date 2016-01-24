rock.namespace('rock.game.graphics.model.mesh');

/**
 * Mesh with normals and texture coordinates
 *
 * @constructor
 * @extends rock.game.graphics.model.mesh.NormalMesh
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.mesh.TextureCoordNormalMesh = function () {
    rock.super_(this);

    /**
     * List of texture coordinates
     *
     * @private
     */
    this.textureCoordinates = [];
};

rock.extends_(rock.game.graphics.model.mesh.TextureCoordNormalMesh, rock.game.graphics.model.mesh.NormalMesh);

/**
 * Load a mesh from a JSON object
 *
 * @param JSON
 *            the JSON with the mesh info
 */
rock.game.graphics.model.mesh.TextureCoordNormalMesh.prototype.loadFromJSON = function (JSON) {
    rock.super_method(this, rock.game.graphics.model.mesh.TextureCoordNormalMesh, 'loadFromJSON', arguments);

    this.setTextureCoordinates(JSON.textureCoordinates);
};

/**
 * Get the textureCoordinates
 */
rock.game.graphics.model.mesh.TextureCoordNormalMesh.prototype.getTextureCoordinates = function() {
    return this.textureCoordinates;
};

/**
 * Set the textureCoordinates
 *
 * @param textureCoordinates the value
 */
rock.game.graphics.model.mesh.TextureCoordNormalMesh.prototype.setTextureCoordinates = function(textureCoordinates) {
    this.textureCoordinates = textureCoordinates;
};