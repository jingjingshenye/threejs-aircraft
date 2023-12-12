<script setup>
import * as THREE from "three";
import { onMounted, ref } from "vue";
import scene from "@/three/scene";
import camera from "@/three/camera";
import renderer from "@three/renderer";
import "@three/resize";
import { box } from "@three/mesh/Box";
import animate from "@three/animate";
import orbitControls from "@three/controls";
import { axesHelper } from "@three/helper";

import Plane from "@three/mesh/plane";
import Curve from "@three/mesh/addCurve";

const canvasContainer = ref(null);
const a = "a";
// scene.add(camera);
// scene.add(box);
scene.add(axesHelper);

let follower = new THREE.Object3D();
scene.add(follower);

const plane = new Plane(follower);
const curve = new Curve(scene);

follower.add(camera);
camera.position.set(
  follower.position.x,
  follower.position.y + 10,
  follower.position.z - 12,
);

console.log("plane.getPlane().position", plane);
function curveAnimation(time) {
  const point = curve.getCurvePoint(time * 0.1);
  follower.position.copy(point);

  const forwardPoint = curve.getCurvePoint(time * 0.1 + 0.1);
  follower.lookAt(forwardPoint);

  camera.lookAt(follower.position);
}
animate(curveAnimation);

onMounted(() => {
  canvasContainer.value.appendChild(renderer.domElement);
});
</script>

<template>
  <div ref="canvasContainer"></div>
</template>

<style scoped>
.canvasContainer {
  width: 100vw;
  height: 100vh;
}
</style>
