rock.namespace('app.test');

/**
 * Geometry test
 *
 * @constructor
 * @extends rock.test.TestSuite
 *
 * @author Luis Alberto Jiménez
 */
app.test.GeometryTest = function () {
};

rock.extends_(app.test.GeometryTest, rock.test.TestSuite);

app.test.GeometryTest.prototype.testMatrices = function () {
    var expectedDeterminant = -226;
    var expectedAdjMatrix = new rock.geometry.Matrix4();
    expectedAdjMatrix.setValue(0, 0, -91);
    expectedAdjMatrix.setValue(0, 1, 4);
    expectedAdjMatrix.setValue(0, 2, -86);
    expectedAdjMatrix.setValue(0, 3, 97);

    expectedAdjMatrix.setValue(1, 0, 8);
    expectedAdjMatrix.setValue(1, 1, 22);
    expectedAdjMatrix.setValue(1, 2, 92);
    expectedAdjMatrix.setValue(1, 3, -88);

    expectedAdjMatrix.setValue(2, 0, 19);
    expectedAdjMatrix.setValue(2, 1, 24);
    expectedAdjMatrix.setValue(2, 2, -64);
    expectedAdjMatrix.setValue(2, 3, 17);

    expectedAdjMatrix.setValue(3, 0, 20);
    expectedAdjMatrix.setValue(3, 1, -58);
    expectedAdjMatrix.setValue(3, 2, 4);
    expectedAdjMatrix.setValue(3, 3, 6);

    var mat4 = new rock.geometry.Matrix4();

    mat4.setValue(0, 0, 4);
    mat4.setValue(0, 1, 5);
    mat4.setValue(0, 2, 2);
    mat4.setValue(0, 3, 3);

    mat4.setValue(1, 0, 2);
    mat4.setValue(1, 1, 3);
    mat4.setValue(1, 2, 2);
    mat4.setValue(1, 3, 6);

    mat4.setValue(2, 0, 3);
    mat4.setValue(2, 1, 5);
    mat4.setValue(2, 2, 7);
    mat4.setValue(2, 3, 5);

    mat4.setValue(3, 0, 4);
    mat4.setValue(3, 1, 9);
    mat4.setValue(3, 2, 8);
    mat4.setValue(3, 3, 7);

    var determinant = mat4.getDeterminant();
    this.assertEquals(expectedDeterminant, determinant);

    var adjMatrix = mat4.getAdjoint();
    this.assertEquals(expectedAdjMatrix.getValue(0, 0), adjMatrix.getValue(0, 0));
    this.assertEquals(expectedAdjMatrix.getValue(0, 1), adjMatrix.getValue(0, 1));
    this.assertEquals(expectedAdjMatrix.getValue(0, 2), adjMatrix.getValue(0, 2));
    this.assertEquals(expectedAdjMatrix.getValue(0, 3), adjMatrix.getValue(0, 3));

    this.assertEquals(expectedAdjMatrix.getValue(1, 0), adjMatrix.getValue(1, 0));
    this.assertEquals(expectedAdjMatrix.getValue(1, 1), adjMatrix.getValue(1, 1));
    this.assertEquals(expectedAdjMatrix.getValue(1, 2), adjMatrix.getValue(1, 2));
    this.assertEquals(expectedAdjMatrix.getValue(1, 3), adjMatrix.getValue(1, 3));

    this.assertEquals(expectedAdjMatrix.getValue(2, 0), adjMatrix.getValue(2, 0));
    this.assertEquals(expectedAdjMatrix.getValue(2, 1), adjMatrix.getValue(2, 1));
    this.assertEquals(expectedAdjMatrix.getValue(2, 2), adjMatrix.getValue(2, 2));
    this.assertEquals(expectedAdjMatrix.getValue(2, 3), adjMatrix.getValue(2, 3));

    this.assertEquals(expectedAdjMatrix.getValue(3, 0), adjMatrix.getValue(3, 0));
    this.assertEquals(expectedAdjMatrix.getValue(3, 1), adjMatrix.getValue(3, 1));
    this.assertEquals(expectedAdjMatrix.getValue(3, 2), adjMatrix.getValue(3, 2));
    this.assertEquals(expectedAdjMatrix.getValue(3, 3), adjMatrix.getValue(3, 3));

    mat4.invert();
    this.assertEquals(expectedAdjMatrix.getValue(0, 0) / expectedDeterminant, mat4.getValue(0, 0));
    this.assertEquals(expectedAdjMatrix.getValue(0, 1) / expectedDeterminant, mat4.getValue(0, 1));
    this.assertEquals(expectedAdjMatrix.getValue(0, 2) / expectedDeterminant, mat4.getValue(0, 2));
    this.assertEquals(expectedAdjMatrix.getValue(0, 3) / expectedDeterminant, mat4.getValue(0, 3));

    this.assertEquals(expectedAdjMatrix.getValue(1, 0) / expectedDeterminant, mat4.getValue(1, 0));
    this.assertEquals(expectedAdjMatrix.getValue(1, 1) / expectedDeterminant, mat4.getValue(1, 1));
    this.assertEquals(expectedAdjMatrix.getValue(1, 2) / expectedDeterminant, mat4.getValue(1, 2));
    this.assertEquals(expectedAdjMatrix.getValue(1, 3) / expectedDeterminant, mat4.getValue(1, 3));

    this.assertEquals(expectedAdjMatrix.getValue(2, 0) / expectedDeterminant, mat4.getValue(2, 0));
    this.assertEquals(expectedAdjMatrix.getValue(2, 1) / expectedDeterminant, mat4.getValue(2, 1));
    this.assertEquals(expectedAdjMatrix.getValue(2, 2) / expectedDeterminant, mat4.getValue(2, 2));
    this.assertEquals(expectedAdjMatrix.getValue(2, 3) / expectedDeterminant, mat4.getValue(2, 3));

    this.assertEquals(expectedAdjMatrix.getValue(3, 0) / expectedDeterminant, mat4.getValue(3, 0));
    this.assertEquals(expectedAdjMatrix.getValue(3, 1) / expectedDeterminant, mat4.getValue(3, 1));
    this.assertEquals(expectedAdjMatrix.getValue(3, 2) / expectedDeterminant, mat4.getValue(3, 2));
    this.assertEquals(expectedAdjMatrix.getValue(3, 3) / expectedDeterminant, mat4.getValue(3, 3));

};

