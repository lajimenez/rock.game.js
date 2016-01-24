rock.namespace('rock.game.graphics.model');

/**
 * Model for using in some lighting that uses the phong reflection model.
 *
 * @constructor
 * @extends rock.game.graphics.model.Model
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.PhongModel = function () {
    rock.super_(this, [rock.game.constants.PHONG_MODEL_TYPE]);
};

rock.extends_(rock.game.graphics.model.PhongModel, rock.game.graphics.model.Model);

/**
 * @see rock.game.graphics.model.Model#loadFromJSON
 * @override
 */
rock.game.graphics.model.PhongModel.prototype.loadFromJSON = function (JSON, repository) {
    var mesh = new rock.game.graphics.model.mesh.NormalMesh();
    mesh.loadFromJSON(JSON.mesh);
    this.mesh = mesh;

    var material = new rock.game.graphics.model.material.PhongMaterial();
    material.loadFromJSON(JSON.material, repository);
    this.material = material;
};
