try {
  if (!navigator.gpu) {
    throw new Error(`WebGPU is not supported in your browser`);
  }

  const adapter = await navigator.gpu?.requestAdapter();
  if (!adapter) {
    throw new Error("WebGPU disabled");
  }

  import("./boids/webgpu.js");
} catch (error) {
  console.warn(`WebGPU error: ${error}`);
  console.warn(`WebGPU error: falling back to WASM`);

  import("./boids/wasm.js");
}
