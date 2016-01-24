rock.namespace('rock.game.graphics.lighting');

/**
 * Represents a light
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.lighting.Light = function () {
    // if it is not camera space then it is in world space
    this.isPositionInCameraSpace = true;
    this.isPositionAVector = false;
    this.position = new rock.geometry.Point3(0, 0, 0);

    this.ambient = new rock.graphics.Color(0, 0, 0);
    this.diffuse = new rock.graphics.Color(0, 0, 0);
    this.specular = new rock.graphics.Color(0, 0, 0);
};

/**
 * Get the isPositionInCameraSpace
 */
rock.game.graphics.lighting.Light.prototype.getIsPositionInCameraSpace = function() {
    return this.isPositionInCameraSpace;
};

/**
 * Set the isPositionInCameraSpace
 *
 * @param isPositionInCameraSpace the value
 */
rock.game.graphics.lighting.Light.prototype.setIsPositionInCameraSpace = function(isPositionInCameraSpace) {
    this.isPositionInCameraSpace = isPositionInCameraSpace;
};

/**
 * Get the isPositionAVector
 */
rock.game.graphics.lighting.Light.prototype.getIsPositionAVector = function() {
    return this.isPositionAVector;
};

/**
 * Set the isPositionAVector
 *
 * @param isPositionAVector the value
 */
rock.game.graphics.lighting.Light.prototype.setIsPositionAVector = function(isPositionAVector) {
    this.isPositionAVector = isPositionAVector;
};

rock.game.graphics.lighting.Light.prototype.setPosition = function(x, y, z) {
    var position = this.position;
    position.setX(x);
    position.setY(y);
    position.setZ(z);
};

rock.game.graphics.lighting.Light.prototype.getPosition = function() {
    return this.position;
};

rock.game.graphics.lighting.Light.prototype.setAmbient = function (r, g, b) {
    var ambient = this.ambient;
    ambient.setRed(r);
    ambient.setGreen(g);
    ambient.setBlue(b);
};

rock.game.graphics.lighting.Light.prototype.getAmbient = function () {
    return this.ambient;
};

rock.game.graphics.lighting.Light.prototype.setDiffuse = function (r, g, b) {
    var diffuse = this.diffuse;
    diffuse.setRed(r);
    diffuse.setGreen(g);
    diffuse.setBlue(b);
};

rock.game.graphics.lighting.Light.prototype.getDiffuse = function () {
    return this.diffuse;
};

rock.game.graphics.lighting.Light.prototype.setSpecular = function (r, g, b) {
    var specular = this.specular;
    specular.setRed(r);
    specular.setGreen(g);
    specular.setBlue(b);
};

rock.game.graphics.lighting.Light.prototype.getSpecular = function () {
    return this.specular;
};
