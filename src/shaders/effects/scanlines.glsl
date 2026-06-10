// Scanline VHS Effect
precision highp float;

varying vec2 vTexCoord;

uniform sampler2D uTexture;
uniform float uIntensity;
uniform float uScanlineFrequency;

void main() {
  vec4 color = texture2D(uTexture, vTexCoord);
  
  // Create scanline pattern
  float scanline = sin(vTexCoord.y * uScanlineFrequency) * 0.5 + 0.5;
  scanline = pow(scanline, 2.0);
  
  // Apply scanline darkening
  vec3 finalColor = color.rgb * mix(1.0, scanline * 0.6, uIntensity);
  
  // Add slight interlace effect
  float interlace = mod(vTexCoord.y * uScanlineFrequency, 2.0) < 1.0 ? 1.0 : 0.95;
  finalColor *= interlace;
  
  gl_FragColor = vec4(finalColor, color.a);
}
