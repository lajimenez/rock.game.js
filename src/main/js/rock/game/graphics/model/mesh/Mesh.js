rock.namespace('rock.game.graphics.model.mesh');

/**
 * Represents a mesh
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.mesh.Mesh = function () {

    /**
     * List of vertices
     *
     * @private
     */
    this.vertices = [];

    /**
     * List of indexes of vertices
     *
     * @private
     */
    this.indexes = [];

    /**
     * Bounding Box for the mesh
     *
     * @type {rock.geometry.BBOX}
     *
     * @private
     */
    this.BBOX = null;
};

/**
 * Load the mesh from JSON
 *
 * @param JSON
 *      the JSON
 * @param {rock.game.Repository} [repository]
 *      the repository
 * @function
 */
rock.game.graphics.model.mesh.Mesh.prototype.loadFromJSON = function (JSON, repository) {
    this.setVertices(JSON.vertices);
    this.setIndexes(JSON.indexes);
    var BBOXValues = JSON.BBOX;
    var BBOX = new rock.geometry.BBOX(BBOXValues[0], BBOXValues[1],
        BBOXValues[2], BBOXValues[3],
        BBOXValues[4], BBOXValues[5]);
    this.setBBOX(BBOX);
};

/**
 * Get the vertices
 *
 * @returns the value
 */
rock.game.graphics.model.mesh.Mesh.prototype.getVertices = function () {
    return this.vertices;
};

/**
 * Set the vertices
 *
 * @param vertices
 *            the value to set
 */
rock.game.graphics.model.mesh.Mesh.prototype.setVertices = function (vertices) {
    this.vertices = vertices;
};

/**
 * Get the indexes
 */
rock.game.graphics.model.mesh.Mesh.prototype.getIndexes = function () {
    return this.indexes;
};

/**
 * Set the indexes
 *
 * @param indexes the value
 */
rock.game.graphics.model.mesh.Mesh.prototype.setIndexes = function (indexes) {
    this.indexes = indexes;
};

/**
 * Get the BBOX
 *
 * @returns the value
 */
rock.game.graphics.model.mesh.Mesh.prototype.getBBOX = function () {
    return this.BBOX;
};

/**
 * Set the BBOX
 *
 * @param BBOX
 *            the value to set
 */
rock.game.graphics.model.mesh.Mesh.prototype.setBBOX = function (BBOX) {
    this.BBOX = BBOX;
};

/**
 * Get the center of the object
 *
 * @returns {rock.geometry.Point3} center
 */
rock.game.graphics.model.mesh.Mesh.prototype.getCenter = function () {
    return this.BBOX.getCenter();
};

/**
 * Convert the index to represent lines instead of faces (so it can be drawn with gl.LINES)
 */
rock.game.graphics.model.mesh.Mesh.prototype.getAsWireframeMesh = function () {
    var clone = this.clone();

    var indexes = this.indexes;
    var length = indexes.length;
    var newIndexes = [];
    var i, v1, v2, v3;

    for (i = 0; i < length; i = i + 3){
        v1 = indexes[i];
        v2 = indexes[i + 1];
        v3 = indexes[i + 2];

        newIndexes.push(v1);
        newIndexes.push(v2);

        newIndexes.push(v2);
        newIndexes.push(v3);

        newIndexes.push(v3);
        newIndexes.push(v1);
    }

    clone.setIndexes(newIndexes);
    return clone;
};

/**
 * Get a mesh representing the BBOX
 *
 * @returns {rock.game.graphics.model.mesh.Mesh}
 */
rock.game.graphics.model.mesh.Mesh.prototype.getBBOXAsMesh = function () {
   return rock.game.graphics.model.mesh.Mesh.createMeshFromBBOX(this.BBOX);
};

rock.game.graphics.model.mesh.Mesh.createMeshFromBBOX = function (BBOX) {
    var bboxMesh = new rock.game.graphics.model.mesh.Mesh();

    var xMin = BBOX.getXMin();
    var xMax = BBOX.getXMax();
    var yMin = BBOX.getYMin();
    var yMax = BBOX.getYMax();
    var zMin = BBOX.getZMin();
    var zMax = BBOX.getZMax();

    var vertices = [];
    vertices.push(xMin, yMin, zMin);
    vertices.push(xMin, yMin, zMax);
    vertices.push(xMax, yMin, zMax);
    vertices.push(xMax, yMin, zMin);

    vertices.push(xMin, yMax, zMin);
    vertices.push(xMin, yMax, zMax);
    vertices.push(xMax, yMax, zMax);
    vertices.push(xMax, yMax, zMin);

    var indexes = [];
    indexes.push(0, 1);
    indexes.push(1, 2);
    indexes.push(2, 3);
    indexes.push(3, 0);

    indexes.push(4, 5);
    indexes.push(5, 6);
    indexes.push(6, 7);
    indexes.push(7, 4);

    indexes.push(0, 4);
    indexes.push(1, 5);
    indexes.push(2, 6);
    indexes.push(3, 7);

    bboxMesh.setVertices(vertices);
    bboxMesh.setIndexes(indexes);

    bboxMesh.setBBOX(BBOX.clone());

    return bboxMesh;
};

/**
 * Compute the BBOX of the mesh
 */
rock.game.graphics.model.mesh.Mesh.prototype.computeBBOX = function () {
    var vertices = this.vertices;
    var length = vertices.length;

    if (length == 0) {
        return;
    }

    var xMin = vertices[0];
    var xMax = vertices[0];
    var yMin = vertices[1];
    var yMax = vertices[1];
    var zMin = vertices[2];
    var zMax = vertices[2];
    var i, x, y, z;

    for (i = 3; i < length; i = i + 3){
        x = vertices[i];
        y = vertices[i +1];
        z = vertices[i + 2];
        if (x < xMin) {
            xMin = x;
        }
        if (x > xMax) {
            xMax = x;
        }

        if (y < yMin) {
            yMin = y;
        }
        if (y > yMax) {
            yMax = y;
        }

        if (z < zMin) {
            zMin = z;
        }
        if (z > zMax) {
            zMax = z;
        }
    }

    this.BBOX = new rock.geometry.BBOX(xMin, xMax, yMin, yMax, zMin, zMax);
};

/**
 * Clone the mesh
 *
 * @returns {rock.game.graphics.model.mesh.Mesh}
 */
rock.game.graphics.model.mesh.Mesh.prototype.clone = function () {
    var clone = new rock.game.graphics.model.mesh.Mesh();

    clone.setVertices(rock.util.JsUtils.cloneArray(this.getVertices()));
    clone.setIndexes(rock.util.JsUtils.cloneArray(this.getIndexes()));
    clone.setBBOX(this.getBBOX().clone());

    return clone;
};