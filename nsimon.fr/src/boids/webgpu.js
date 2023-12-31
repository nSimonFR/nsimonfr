const iframe = document.createElement("iframe");
iframe.src = "https://nsimonfr.github.io/webgpu-boids/";
iframe.frameBorder = "0";
iframe.allowFullscreen = true;
document.body.insertBefore(iframe, document.body.firstChild);

const footer = document.querySelector("#footer-ref");
footer.href = "https://github.com/nSimonFR/webgpu-boids";
footer.textContent = "Boids in WebGPU !";
