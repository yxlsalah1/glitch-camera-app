import type { FrameBuffer } from '../../types';

/**
 * GPU-based frame buffer manager
 * Handles texture creation, framebuffer binding, and double/triple buffering
 */
export class FrameBufferManager {
  private gl: WebGLRenderingContext | null = null;
  private buffers: FrameBuffer[] = [];
  private currentBufferIndex = 0;
  private maxBuffers = 3; // Triple buffering

  constructor(gl: WebGLRenderingContext, width: number, height: number) {
    this.gl = gl;
    this.initializeBuffers(width, height);
  }

  private initializeBuffers(width: number, height: number): void {
    if (!this.gl) return;

    for (let i = 0; i < this.maxBuffers; i++) {
      const texture = this.gl.createTexture();
      const framebuffer = this.gl.createFramebuffer();

      if (!texture || !framebuffer) continue;

      // Configure texture
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        width,
        height,
        0,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        null
      );
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

      // Attach texture to framebuffer
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
      this.gl.framebufferTexture2D(
        this.gl.FRAMEBUFFER,
        this.gl.COLOR_ATTACHMENT0,
        this.gl.TEXTURE_2D,
        texture,
        0
      );

      this.buffers.push({
        id: `buffer-${i}`,
        texture,
        framebuffer,
        width,
        height,
      });
    }

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }

  public getCurrentBuffer(): FrameBuffer {
    return this.buffers[this.currentBufferIndex];
  }

  public getPreviousBuffer(offset: number = 1): FrameBuffer | null {
    const index = (this.currentBufferIndex - offset + this.maxBuffers) % this.maxBuffers;
    return this.buffers[index];
  }

  public rotateBuffers(): void {
    this.currentBufferIndex = (this.currentBufferIndex + 1) % this.maxBuffers;
  }

  public bindCurrentBuffer(): void {
    if (!this.gl) return;
    const buffer = this.getCurrentBuffer();
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, buffer.framebuffer);
    this.gl.viewport(0, 0, buffer.width, buffer.height);
  }

  public bindDefaultFramebuffer(): void {
    if (!this.gl) return;
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }

  public cleanup(): void {
    if (!this.gl) return;
    this.buffers.forEach((buffer) => {
      if (buffer.texture) this.gl?.deleteTexture(buffer.texture);
      if (buffer.framebuffer) this.gl?.deleteFramebuffer(buffer.framebuffer);
    });
    this.buffers = [];
  }
}
