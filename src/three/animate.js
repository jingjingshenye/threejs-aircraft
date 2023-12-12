import * as THREE from "three";
import renderer from "./renderer";
import scene from "./scene";
import camera from "./camera";
import { stats } from "@three/stats";

const clock = new THREE.Clock();
export default function animate(call) {
  const time = clock.getElapsedTime();

  if (call instanceof Function) {
    call(time);
  }

  renderer.render(scene, camera);
  stats.update();
  requestAnimationFrame(() => {
    animate(call);
  });
}
