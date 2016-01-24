rock.namespace('rock.game.graphics.model');

/**
 * Model that uses a texture for color.
 *
 * @constructor
 * @extends rock.game.graphics.model.Model
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.TextureModel = function () {
    rock.super_(this, [rock.game.constants.TEXTURE_MODEL_TYPE]);
};

rock.extends_(rock.game.graphics.model.TextureModel, rock.game.graphics.model.Model);

/**
 * @see rock.game.graphics.model.Model#loadFromJSON
 * @override
 */
rock.game.graphics.model.TextureModel.prototype.loadFromJSON = function (JSON, repository) {
    var mesh = new rock.game.graphics.model.mesh.TextureCoordMesh();
    mesh.loadFromJSON(JSON.mesh);
    this.mesh = mesh;

    var material = new rock.game.graphics.model.material.TextureMaterial();
    material.loadFromJSON(JSON.material, repository);
    this.material = material;
};
