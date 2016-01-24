rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.settable');

/**
 * Settable for {@link rock.game.graphics.model.mesh.Mesh}
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.settable.AdaptableSettable
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MeshSettable = function () {
    rock.super_(this);

    this.mesh = null;
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.settable.MeshSettable,
    rock.game.graphics.engine.renderer.webgl.programsetter.settable.AdaptableSettable);

/**
 * Get the mesh
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MeshSettable.prototype.getMesh = function() {
    return this.mesh;
};

/**
 * Set the mesh
 *
 * @param mesh the value
 */
rock.game.graphics.engine.renderer.webgl.programsetter.settable.MeshSettable.prototype.setMesh = function(mesh) {
    this.mesh = mesh;
};