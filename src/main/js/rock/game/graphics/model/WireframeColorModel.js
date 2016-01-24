rock.namespace('rock.game.graphics.model');

/**
 * Wireframe model.
 *
 * @constructor
 * @extends rock.game.graphics.model.Model
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.WireframeColorModel = function () {
    rock.super_(this, [rock.game.constants.COLOR_MODEL_TYPE]);
};

rock.extends_(rock.game.graphics.model.WireframeColorModel, rock.game.graphics.model.Model);

/**
 * @see rock.game.graphics.model.Model#loadFromJSON
 * @override
 */
rock.game.graphics.model.WireframeColorModel.prototype.loadFromJSON = function (JSON) {
    var mesh = new rock.game.graphics.model.mesh.Mesh();
    mesh.loadFromJSON(JSON.mesh);
    this.mesh = mesh;

    var material = rock.game.graphics.model.material.ColorMaterial();
    material.loadFromJSON(JSON.color);
    this.material = material;
};
