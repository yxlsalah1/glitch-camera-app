// Compression Artifact Simulation
precision highp float;

varying vec2 vTexCoord;

uniform sampler2D uTexture;
uniform float uIntensity;
uniform float uBlockSize;
uniform float uTime;

void main() {
  // Pixelate based on block size
  vec2 blockCoord = floor(vTexCoord * uBlockSize) / uBlockSize;
  blockCoord += mod(uTime * 0.1, 1.0 / uBlockSize) * uIntensity;
  
  vec4 color = texture2D(uTexture, blockCoord);
  
  // Add color banding (posterization)
  float bands = 8.0 * (1.0 - uIntensity) + 2.0 * uIntensity;
  color.rgb = floor(color.rgb * bands) / bands;
  
  gl_FragColor = color;
}
