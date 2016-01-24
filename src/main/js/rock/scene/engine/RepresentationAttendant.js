rock.namespace('rock.scene.engine');

/**
 * Representation attendant for scene.
 *
 * @param {rock.game.graphics.engine.RenderEngine} renderEngine
 *
 * @param {rock.game.Repository} repository
 *
 * @constructor
 * @extends rock.game.engine.RepresentationAttendant
 *
 * @author Luis Alberto Jiménez
 */
rock.scene.engine.RepresentationAttendant = function (renderEngine, repository) {
    rock.super_(this, arguments);
    this.representations_ma = new rock.js.Array();
};

rock.extends_(rock.scene.engine.RepresentationAttendant, rock.game.engine.RepresentationAttendant);

/**
 * @see rock.game.engine.RepresentationAttendant#createRepresentation
 * @override
 */
rock.scene.engine.RepresentationAttendant.prototype.createRepresentation = function (object) {
    // In this case, the switch could be avoided...
    var representation = null;
    var type = object.getType();
    switch (type) {
        case rock.scene.constants.MODEL_NODE_TYPE:
            representation = new rock.scene.graphics.scene.ModelNodeRepresentation(this, object);
            break;
        default:
            // Throw an exception???
    }

    return representation;
};

/**
 * @see rock.game.engine.RepresentationAttendant#getRepresentations
 * @override
 */
rock.scene.engine.RepresentationAttendant.prototype.getRepresentations = function (scene) {
    var modelNodes = scene.getModelNodes();
    var representations = this.representations_ma;
    var i, modelNode;

    representations.clear();
    for (i = 0; i < modelNodes.length; i++) {
        modelNode = modelNodes[i];
        representations.addValue(modelNode.getRepresentation())
    }

    return representations;
};