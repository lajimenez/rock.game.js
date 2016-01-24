rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting');

/**
 * Setter for {@link rock.game.graphics.scene.Lighting}
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends {rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter}
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightingSetter = function (glContext) {
    rock.super_(this, arguments);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightingSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightingSetter.prototype.getAttributeNames = function () {
    return [];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightingSetter.prototype.getUniformNames = function () {
    return [];
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightingSetter.prototype.getTextureNames = function () {
    return [];
};

// This function adds logic here... I think it should go in another place (as a setter should be better not to have
// logic), the problem is I'm not sure where it should be :P
rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightingSetter.prototype.getPointInCorrectSpace = function (point, viewMatrix,
                                                                                                                   isInCameraSpace, pointRepresentsVector) {
    var correctPoint = point;
    var viewMatrixMat3 = null;

    if (!isInCameraSpace) {
        if (pointRepresentsVector) {
            viewMatrixMat3 = viewMatrix.getAsMatrix3();
            correctPoint = viewMatrixMat3.multiplyByPoint3(point);
        } else {
            correctPoint = viewMatrix.multiplyByPoint3(point);
        }
    }

    return correctPoint;
};