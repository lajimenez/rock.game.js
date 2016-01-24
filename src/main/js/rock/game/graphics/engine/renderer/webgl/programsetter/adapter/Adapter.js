rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter');

/**
 * An adapter is a class that can store (cache) WebGL objects so you can use directly in a WebGL program.
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter = function (glContext) {
    this.glContext = glContext;
};

/**
 * Prepare adapter for being used
 *
 * @function
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter.prototype.build = rock.abstract_;

/**
 * Release any resource needed
 *
 * @function
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter.prototype.release = rock.abstract_;