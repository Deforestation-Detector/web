uniform vec3 uColor;
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform float uTime;
uniform float uLightmapIntensity;
uniform sampler2D uLightmap;

varying vec2 vUv;
varying vec3 vPos;
varying float vFogDist;
varying float vFogRim;

#define S smoothstep
#define FOG_START 10.0
#define FOG_END 40.0
#define FOG_RIM_START 45.0
#define FOG_RIM_END 74.0


#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

/*
author: Patricio Gonzalez Vivo
description: Fractal Brownian Motion
use: fbm(<vec2> pos)
options:
    FBM_OCTAVES: numbers of octaves. Default is 4.
    FBM_NOISE_FNC(POS_UV): noise function to use Default 'snoise(POS_UV)' (simplex noise)
    FBM_VALUE_INITIAL: initial value. Default is 0.
    FBM_SCALE_SCALAR: scalar. Defualt is 2.
    FBM_AMPLITUD_INITIAL: initial amplitud value. Default is 0.5
    FBM_AMPLITUD_SCALAR: amplitud scalar. Default is 0.5
license: |
    Copyright (c) 2021 Patricio Gonzalez Vivo.
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.    
*/

#ifndef FBM_OCTAVES
#define FBM_OCTAVES 4
#endif

#ifndef FBM_VALUE_INITIAL
#define FBM_VALUE_INITIAL 0.0
#endif

#ifndef FBM_SCALE_SCALAR
#define FBM_SCALE_SCALAR 2.0
#endif

#ifndef FBM_AMPLITUD_INITIAL
#define FBM_AMPLITUD_INITIAL 0.5
#endif

#ifndef FBM_AMPLITUD_SCALAR
#define FBM_AMPLITUD_SCALAR 0.5
#endif

#ifndef FNC_FBM
#define FNC_FBM

float fbm(in vec3 pos) {
    // Initial values
    float value = FBM_VALUE_INITIAL;
    float amplitud = FBM_AMPLITUD_INITIAL;

    // Loop of octaves
    for (int i = 0; i < FBM_OCTAVES; i++) {
        value += amplitud * snoise3(pos);
        pos *= FBM_SCALE_SCALAR;
        amplitud *= FBM_AMPLITUD_SCALAR;
    }
    return value;
}
#endif

void main() {
  vec3 color = uColor;
  vec4 shadows = texture2D(uLightmap, vUv);
  // float noise = clamp(fbm(vec3(vPos.xz / 20.0, uTime * 0.000025)), 0.0, 1.0);

  // float heightFactor = vPos.y / 0.025;

  // float heightFog = clamp(exp(-heightFactor * heightFactor * uFogDensity * uFogDensity), 0.0, 1.0);
  // float distanceFog = 1.0 - exp(-vFogDist * vFogDist * uFogDensity * uFogDensity);

  // float fogFactor = clamp((FOG_END - vFogDist) / (FOG_END - FOG_START), 0.0, 1.0);

  float fogRimFactor = 1.0 - clamp((FOG_RIM_END - vFogRim) / (FOG_RIM_END - FOG_RIM_START), 0.0, 1.0);

  color *= S(0.0, 1.0, shadows.rgb) * uLightmapIntensity;
  
  #if defined( TONE_MAPPING )
	  color = toneMapping( color );
  #endif

  // color = mix(color, uFogColor, heightFog);
  color = mix(color, uFogColor, fogRimFactor);
  // color = mix(color, uFogColor, distanceFog);

  gl_FragColor = vec4(color, 1.0);
}