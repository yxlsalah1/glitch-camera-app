// Frame Blending / Ghosting Effect
precision highp float;

varying vec2 vTexCoord;

uniform sampler2D uCurrentFrame;
uniform sampler2D uFrameHistory[3];
uniform float uIntensity;

void main() {
  vec4 color = vec4(0.0);
  
  // Current frame (weight: 0.4)
  color += texture2D(uCurrentFrame, vTexCoord) * 0.4;
  
  // Previous frames with falloff
  color += texture2D(uFrameHistory[0], vTexCoord) * 0.3 * uIntensity;
  color += texture2D(uFrameHistory[1], vTexCoord) * 0.2 * uIntensity;
  color += texture2D(uFrameHistory[2], vTexCoord) * 0.1 * uIntensity;
  
  // Normalize
  color /= (0.4 + 0.3 * uIntensity + 0.2 * uIntensity + 0.1 * uIntensity);
  
  gl_FragColor = color;
}
