rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.adapter');

/**
 * Adapter for store values in WebGL buffer.
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter = function (glContext, values, typeArray, bufferType) {
    rock.super_(this, [glContext]);
    this.values = values;
    this.typeArray = typeArray;
    this.bufferType = bufferType;

    this.buffer = null;
    this.array = null;

    // Handle context events
    var app = glContext.getApplication();
    app.addEventListener(rock.constants.ROCK_EVENT_CONTEXT_RESTORED, rock.createEventHandler(this, this.onContextRestored));
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter,
    rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter);


rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.ARRAY_BUFFER = 'ARRAY_BUFFER';

rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.ELEMENT_ARRAY_BUFFER = 'ELEMENT_ARRAY_BUFFER';

/**
 * Function for handling event context restore
 *
 * @private
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.prototype.onContextRestored = function () {
    this.restore();
};

/**
 * Restore the adapter
 *
 * @private
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.prototype.restore = function () {
    this.build();
};

/**
 * @private
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.prototype.getGlBufferType = function () {
    var gl = this.glContext.getHTMLContext();
    var bufferType = this.bufferType;
    var glBufferType = null;

    switch(bufferType) {
        case rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.ARRAY_BUFFER:
            glBufferType = gl.ARRAY_BUFFER;
            break;
        case rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.ELEMENT_ARRAY_BUFFER:
            glBufferType = gl.ELEMENT_ARRAY_BUFFER;
            break;
        default:
            ;
    }

    return glBufferType;
};

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#build
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.prototype.build = function () {
    var gl = this.glContext.getHTMLContext();
    var bufferType = this.getGlBufferType();
    var buffer = gl.createBuffer();
    var array =  new this.typeArray(this.values);
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, array, gl.STATIC_DRAW);

    this.buffer = buffer;
    this.array = array;

    gl.bindBuffer(bufferType, null);
};

/**
 * @see rock.game.graphics.engine.renderer.webgl.programsetter.adapter.Adapter#release
 * @override
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.prototype.release = function () {
    var gl = this.glContext.getHTMLContext();
    gl.deleteBuffer(this.buffer);
    this.array = null;
};

/**
 * Get the buffer
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.prototype.getBuffer = function() {
    return this.buffer;
};

/**
 * Get the array
 */
rock.game.graphics.engine.renderer.webgl.programsetter.adapter.BufferAdapter.prototype.getArray = function() {
    return this.array;
};
