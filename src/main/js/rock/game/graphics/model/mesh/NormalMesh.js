rock.namespace('rock.game.graphics.model.mesh');

/**
 * Mesh with normals
 *
 * @constructor
 * @extends rock.game.graphics.model.mesh.Mesh
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.mesh.NormalMesh = function () {
    rock.super_(this);

    /**
     * List of normals
     *
     * @private
     */
    this.normals = [];
};

rock.extends_(rock.game.graphics.model.mesh.NormalMesh, rock.game.graphics.model.mesh.Mesh);

/**
 * Load a mesh from a JSON object
 *
 * @param JSON
 *            the JSON with the mesh info
 */
rock.game.graphics.model.mesh.NormalMesh.prototype.loadFromJSON = function (JSON) {
    rock.super_method(this, rock.game.graphics.model.mesh.NormalMesh, 'loadFromJSON', arguments);

    this.setNormals(JSON.normals);
};

/**
 * Get a mesh containing all normals
 *
 * @returns {rock.game.graphics.model.mesh.Mesh} mesh containing all normals
 */
rock.game.graphics.model.mesh.NormalMesh.prototype.getNormalsAsMesh = function () {
    // A more accurate implementation should get vertex and normals from 'indexes'
    // But then you get a lot of repeated elements (and there can not be more
    // normals than exists in array 'normals'... ). Well, you can save this with some
    // kind hash implementation but I don't think it's necessary...
    // The problem with this implementation is that if you have some vertex defined
    // but not used it will also appear... If you have used the rock.converter it could
    // happen if the mesh had wrong normals and the rock.converter has 'repaired' it
    // (but if the mesh was correct and you use rock.converter, the normal mesh will be ok :)
    var normalMesh = new rock.game.graphics.model.mesh.Mesh();

    var normals = this.normals;
    var length = normals.length;
    var vertices = this.vertices;
    var newVertices = [];
    var newIndexes = [];
    var i, newIndex = 0;

    for (i = 0; i < length; i = i + 3){
        newVertices.push(vertices[i], vertices[i +1], vertices[i + 2]);
        newVertices.push(vertices[i] + normals[i], vertices[i + 1] + normals[i + 1], vertices[i + 2] + normals[i + 2]);

        newIndexes.push(newIndex, newIndex + 1);
        newIndex += 2;
    }

    normalMesh.setVertices(newVertices);
    normalMesh.setIndexes(newIndexes);
    normalMesh.computeBBOX();
    return normalMesh;
};

/**
 * Get the normals
 *
 * @returns the value
 */
rock.game.graphics.model.mesh.NormalMesh.prototype.getNormals = function () {
    return this.normals;
};

/**
 * Set the normals
 *
 * @param normals
 *            the value to set
 */
rock.game.graphics.model.mesh.NormalMesh.prototype.setNormals = function (normals) {
    this.normals = normals;
};