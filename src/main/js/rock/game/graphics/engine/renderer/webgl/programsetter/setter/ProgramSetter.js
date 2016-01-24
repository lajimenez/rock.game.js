rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter');

/**
 * A program setter is a class that knows how to set some kind of data to be consumed by a program.
 * This class use classes {@link rock.game.graphics.engine.renderer.webgl.programsetter.settable.Settable} that contains
 * the data to set.
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter = function (glContext) {
    this.glContext = glContext;
};

/**
 * This function must return the attributes that this setter is going to set
 *
 * @function
 */
rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter.prototype.getAttributeNames = rock.abstract_;

rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter.prototype.getUniformNameInPosition = function (uniform, position) {
    return uniform.replace('[X]', '[' + position + ']');
};

/**
 * This function must return the uniforms that this setter is going to set
 *
 * @function
 */
rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter.prototype.getUniformNames = rock.abstract_;

/**
 * This functions must return the textures that this setter is going to set
 *
 * @function
 */
rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter.prototype.getTextureNames = rock.abstract_;

/**
 * Set the values. After calling this function, all attributes, uniforms and textures should be set to the program.
 *
 * @param {rock.graphics.engine.renderer.webgl.program.CacheProgram} program
 *         the program
 * @param {rock.game.graphics.engine.renderer.webgl.programsetter.settable.Settable} settable
 *         object containing the values to set
 * @function
 */
rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter.prototype.setValues = rock.abstract_;