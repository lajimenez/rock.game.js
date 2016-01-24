rock.namespace('rock.game.graphics.model');

/**
 * A model is something that can be renderer. A model is composed by a {@link rock.game.graphics.model.mesh.Mesh},
 * that contains its geometry and a {@link rock.game.graphics.model.material.Material} that specifies how it has
 * to be colored (and shaded)
 *
 * Please, note that Mesh shouldn't has state as it's something 'static' that can be shared.
 * To add some state you should use a ModelRenderable (please, see {@link rock.game.graphics.engine.renderer.webgl.ModelRenderer},
 * {@link rock.game.graphics.engine.renderer.RendererContext}, and {@link rock.game.graphics.engine.renderer.ModelRenderable} class
 * for more info)
 *
 * A model should be agnostic about how its data must be interpreted. It's up to you assure that data
 * is coherent with Renderer expectations.
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.Model = function(type) {
    rock.super_(this, arguments);
    this.mesh = null;
    this.material = null;
};

rock.extends_(rock.game.graphics.model.Model, rock.game.graphics.model.BaseModel);

/**
 * Load the model from JSON
 *
 * @param JSON
 *      the JSON
 * @param {rock.game.Repository} [repository]
 *      the repository
 * @function
 */
rock.game.graphics.model.Model.prototype.loadFromJSON = rock.abstract_;

rock.game.graphics.model.Model.prototype.getBBOX = function () {
    return this.mesh.getBBOX();
};

rock.game.graphics.model.Model.prototype.getCenter = function () {
   return this.getBBOX().getCenter();
};

rock.game.graphics.model.Model.prototype.getMeshCount = function () {
    return this.mesh.getIndexes().length;
};

/**
 * Get the mesh
 */
rock.game.graphics.model.Model.prototype.getMesh = function () {
    return this.mesh;
};

/**
 * Set the mesh
 *
 * @param mesh the value
 */
rock.game.graphics.model.Model.prototype.setMesh = function (mesh) {
    this.mesh = mesh;
};

/**
 * Get the material
 */
rock.game.graphics.model.Model.prototype.getMaterial = function () {
    return this.material;
};

/**
 * Set the material
 *
 * @param material the value
 */
rock.game.graphics.model.Model.prototype.setMaterial = function (material) {
    this.material = material;
};