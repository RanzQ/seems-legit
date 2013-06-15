// shader code and compilers

var shaders = {

  'createShader': function( gl, src, type ) {
    var shader = gl.createShader( type );
    gl.shaderSource( shader, src );
    gl.compileShader( shader );
    if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {
      var error = gl.getShaderInfoLog( shader );
      console.error( error );
      return null;
    }
    return shader;
  },

  'textureFromPixelArray': function(ctx, dataArray, type, width, height) {
    var texture = ctx.createTexture();
    ctx.bindTexture(ctx.TEXTURE_2D, texture);
    ctx.texParameteri( ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.LINEAR );
    ctx.texParameteri( ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.LINEAR );
    ctx.texParameteri( ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE );
    ctx.texParameteri( ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE) ;
    ctx.texImage2D( ctx.TEXTURE_2D, 0, ctx.LUMINANCE, width, height, 0, ctx.LUMINANCE, ctx.UNSIGNED_BYTE, dataArray );
    return texture;
  },

  'cacheUniformLocation': function( gl, program, label ) {
    if ( program.uniformsCache === undefined ) {
      program.uniformsCache = {};
    }
    program.uniformsCache[ label ] = gl.getUniformLocation( program, label );
  },

  'fullScreenQuad': function(gl) {
    var buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( [ - 1.0, - 1.0, 1.0, - 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0 ] ), gl.STATIC_DRAW );
    return buffer;
  }

};