// Bootstrapping App using Bootstrapper.js
window.postMessage({
  action: "bootstrapPixelo",
  data: { elementSelector: "root" }
}, "*")