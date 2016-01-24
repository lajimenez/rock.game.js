rock.namespace('rock.game.graphics.model');

/**
 * Model for using in some lighting that uses the phong reflection model.
 *
 * @constructor
 * @extends rock.game.graphics.model.Model
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.PhongTextureModel = function () {
    rock.super_(this, [rock.game.constants.PHONG_TEXTURE_MODEL_TYPE]);
};

rock.extends_(rock.game.graphics.model.PhongTextureModel, rock.game.graphics.model.Model);

/**
 * @see rock.game.graphics.model.Model#loadFromJSON
 * @override
 */
rock.game.graphics.model.PhongTextureModel.prototype.loadFromJSON = function (JSON, repository) {
    var mesh = new rock.game.graphics.model.mesh.TextureCoordNormalMesh();
    mesh.loadFromJSON(JSON.mesh);
    this.mesh = mesh;

    var material = new rock.game.graphics.model.material.PhongTextureMaterial();
    material.loadFromJSON(JSON.material, repository);
    this.material = material;
};
