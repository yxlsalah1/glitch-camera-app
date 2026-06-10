import { FrameBufferManager } from './FrameBuffer';
import { ShaderCompiler } from '../shader/ShaderCompiler';
import { GPURender } from './GPURender';
import type { GlitchEffect } from '../../types';

/**
 * Core frame processing pipeline
 * Orchestrates camera frames through GPU shader effects in real-time
 */
export class FrameProcessor {
  private gl: WebGLRenderingContext;
  private frameBufferManager: FrameBufferManager;
  private shaderCompiler: ShaderCompiler;
  private gpuRender: GPURender;
  private effects: GlitchEffect[] = [];
  private startTime = Date.now();
  private frameCount = 0;

  constructor(
    gl: WebGLRenderingContext,
    width: number,
    height: number
  ) {
    this.gl = gl;
    this.frameBufferManager = new FrameBufferManager(gl, width, height);
    this.shaderCompiler = new ShaderCompiler(gl);
    this.gpuRender = new GPURender(gl);
  }

  /**
   * Add a glitch effect to the pipeline
   */
  public addEffect(effect: GlitchEffect): void {
    if (effect.enabled) {
      this.effects.push(effect);
    }
  }

  /**
   * Remove an effect from the pipeline
   */
  public removeEffect(effectId: string): void {
    this.effects = this.effects.filter((e) => e.id !== effectId);
  }

  /**
   * Update effect in pipeline
   */
  public updateEffect(effectId: string, updates: Partial<GlitchEffect>): void {
    this.effects = this.effects.map((e) =>
      e.id === effectId ? { ...e, ...updates } : e
    );
  }

  /**
   * Process a single frame through the effect pipeline
   */
  public processFrame(inputTexture: WebGLTexture): WebGLTexture {
    let currentTexture = inputTexture;
    const elapsedTime = (Date.now() - this.startTime) / 1000;

    // Apply each effect in sequence
    for (const effect of this.effects) {
      if (!effect.enabled) continue;

      // Compile effect shader
      const program = this.shaderCompiler.compileProgram(
        this.getVertexShader(),
        effect.shader.fragmentSource
      );

      if (!program) continue;

      // Bind effect framebuffer
      this.frameBufferManager.bindCurrentBuffer();

      // Set uniforms
      this.gl.useProgram(program);
      const uIntensity = this.gl.getUniformLocation(program, 'uIntensity');
      const uTime = this.gl.getUniformLocation(program, 'uTime');

      if (uIntensity) this.gl.uniform1f(uIntensity, effect.intensity);
      if (uTime) this.gl.uniform1f(uTime, elapsedTime);

      // Apply any additional uniforms from effect config
      Object.entries(effect.uniforms || {}).forEach(([key, value]) => {\n        const location = this.gl.getUniformLocation(program, key);\n        if (location && typeof value === 'number') {\n          this.gl.uniform1f(location, value);\n        }\n      });\n\n      // Render quad with current texture\n      this.gpuRender.renderQuad(program, currentTexture);\n\n      // Get output texture\n      const outputBuffer = this.frameBufferManager.getCurrentBuffer();\n      currentTexture = outputBuffer.texture!;\n\n      // Rotate buffers for next effect\n      this.frameBufferManager.rotateBuffers();\n    }\n\n    // Render final result to screen\n    this.frameBufferManager.bindDefaultFramebuffer();\n    const finalProgram = this.shaderCompiler.compileProgram(\n      this.getVertexShader(),\n      this.getPassthroughFragmentShader()\n    );\n\n    if (finalProgram) {\n      this.gpuRender.renderQuad(finalProgram, currentTexture);\n    }\n\n    this.frameCount++;\n    return currentTexture;\n  }\n\n  /**\n   * Get standard vertex shader\n   */\n  private getVertexShader(): string {\n    return `\n      precision highp float;\n      attribute vec3 aPosition;\n      attribute vec2 aTexCoord;\n      varying vec2 vTexCoord;\n      void main() {\n        gl_Position = vec4(aPosition, 1.0);\n        vTexCoord = aTexCoord;\n      }\n    `;\n  }\n\n  /**\n   * Get passthrough fragment shader (no effect)\n   */\n  private getPassthroughFragmentShader(): string {\n    return `\n      precision highp float;\n      varying vec2 vTexCoord;\n      uniform sampler2D uTexture;\n      void main() {\n        gl_FragColor = texture2D(uTexture, vTexCoord);\n      }\n    `;\n  }\n\n  public getFrameCount(): number {\n    return this.frameCount;\n  }\n\n  public cleanup(): void {\n    this.frameBufferManager.cleanup();\n    this.shaderCompiler.cleanup();\n    this.gpuRender.cleanup();\n  }\n}
