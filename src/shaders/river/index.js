import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';
import { Color, ShaderMaterial } from 'three';

const RiverMaterial = new ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: { uTime: { value: 0 }, uColor: { value: new Color(1, 0, 0) } },
});

export default RiverMaterial;
