/**
 * GPU Renderer - Handles drawing with effects
 * Manages rendering pipeline and effect application
 */
export class GPURender {
  private gl: WebGLRenderingContext;
  private quadVBO: WebGLBuffer | null = null;
  private quadEBO: WebGLBuffer | null = null;

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
    this.setupQuadMesh();
  }

  /**
   * Setup full-screen quad for rendering
   */
  private setupQuadMesh(): void {
    // Quad vertices (normalized device coords)
    const vertices = new Float32Array([
      -1.0, 1.0, 0.0,   // top-left
      1.0, 1.0, 0.0,    // top-right
      1.0, -1.0, 0.0,   // bottom-right
      -1.0, -1.0, 0.0,  // bottom-left
    ]);

    // Quad texture coordinates
    const texCoords = new Float32Array([
      0.0, 1.0,  // top-left
      1.0, 1.0,  // top-right
      1.0, 0.0,  // bottom-right
      0.0, 0.0,  // bottom-left
    ]);

    // Quad indices
    const indices = new Uint16Array([
      0, 1, 2,
      0, 2, 3,
    ]);

    this.quadVBO = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quadVBO);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    this.quadEBO = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.quadEBO);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);
  }

  /**
   * Render full-screen quad with texture
   */
  public renderQuad(
    program: WebGLProgram,
    sourceTexture: WebGLTexture | null
  ): void {
    this.gl.useProgram(program);

    // Bind source texture
    if (sourceTexture) {
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, sourceTexture);
      const uTexture = this.gl.getUniformLocation(program, 'uTexture');
      this.gl.uniform1i(uTexture, 0);
    }

    // Render quad
    if (this.quadVBO && this.quadEBO) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quadVBO);
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.quadEBO);

      const posAttrib = this.gl.getAttribLocation(program, 'aPosition');
      const texCoordAttrib = this.gl.getAttribLocation(program, 'aTexCoord');

      this.gl.enableVertexAttribArray(posAttrib);
      this.gl.vertexAttribPointer(posAttrib, 3, this.gl.FLOAT, false, 12, 0);

      this.gl.enableVertexAttribArray(texCoordAttrib);
      this.gl.vertexAttribPointer(texCoordAttrib, 2, this.gl.FLOAT, false, 8, 0);

      this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
    }
  }

  /**
   * Clear color buffer
   */
  public clear(r: number = 0, g: number = 0, b: number = 0, a: number = 1): void {
    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  public cleanup(): void {
    if (this.quadVBO) this.gl.deleteBuffer(this.quadVBO);
    if (this.quadEBO) this.gl.deleteBuffer(this.quadEBO);
  }
}
