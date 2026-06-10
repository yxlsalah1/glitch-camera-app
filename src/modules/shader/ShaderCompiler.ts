import type { ShaderUniform } from '../../types';

/**
 * Shader compilation and program management
 * Compiles GLSL shaders and manages shader programs with uniforms
 */
export class ShaderCompiler {
  private gl: WebGLRenderingContext;
  private programCache: Map<string, WebGLProgram> = new Map();

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
  }

  /**
   * Compile and link a shader program
   */
  public compileProgram(vertexSource: string, fragmentSource: string): WebGLProgram | null {
    const vertexShader = this.compileShader(vertexSource, this.gl.VERTEX_SHADER);
    const fragmentShader = this.compileShader(fragmentSource, this.gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      return null;
    }

    const program = this.gl.createProgram();
    if (!program) return null;

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('Program linking failed:', this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
      return null;
    }

    this.gl.deleteShader(vertexShader);
    this.gl.deleteShader(fragmentShader);

    return program;
  }

  /**
   * Compile individual shader
   */
  private compileShader(source: string, type: number): WebGLShader | null {
    const shader = this.gl.createShader(type);
    if (!shader) return null;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(
        `Shader compilation failed (${type === this.gl.VERTEX_SHADER ? 'vertex' : 'fragment'}):`,
        this.gl.getShaderInfoLog(shader)
      );
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  /**
   * Set uniform values on a shader program
   */
  public setUniform(
    program: WebGLProgram,
    uniform: ShaderUniform
  ): void {
    const location = this.gl.getUniformLocation(program, uniform.name);
    if (!location) return;

    switch (uniform.type) {
      case 'float':
        this.gl.uniform1f(location, uniform.value as number);
        break;
      case 'int':
        this.gl.uniform1i(location, uniform.value as number);
        break;
      case 'vec2':
        const v2 = uniform.value as number[];
        this.gl.uniform2f(location, v2[0], v2[1]);
        break;
      case 'vec3':
        const v3 = uniform.value as number[];
        this.gl.uniform3f(location, v3[0], v3[1], v3[2]);
        break;
      case 'vec4':
        const v4 = uniform.value as number[];
        this.gl.uniform4f(location, v4[0], v4[1], v4[2], v4[3]);
        break;
      case 'texture':
        this.gl.uniform1i(location, uniform.value as number);
        break;
    }
  }

  /**
   * Set attribute pointer
   */
  public setAttribute(
    program: WebGLProgram,
    name: string,
    buffer: WebGLBuffer,
    size: number
  ): void {
    const location = this.gl.getAttribLocation(program, name);
    if (location === -1) return;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.vertexAttribPointer(location, size, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(location);
  }

  public cleanup(): void {
    this.programCache.forEach((program) => {
      this.gl.deleteProgram(program);
    });
    this.programCache.clear();
  }
}
