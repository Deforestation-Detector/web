import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';
import { Color, ShaderMaterial } from 'three';

const RiverMaterial = new ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new Color(1, 0, 0) },
    uFogColor: { value: new Color('#d0f5df') },
    uFogDensity: { value: 0.01 },
  },
});

export default RiverMaterial;
