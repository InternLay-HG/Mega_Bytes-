// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load cell texture
const loader = new THREE.TextureLoader();
const cellTexture = loader.load('cell.png'); // Replace with your cell image path

// Create particles (cells)
const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
  const geometry = new THREE.SphereGeometry(0.3, 32, 32); // Small spheres as cells
  const material = new THREE.MeshBasicMaterial({ map: cellTexture, transparent: true });
  const particle = new THREE.Mesh(geometry, material);

  // Random positions for particles
  particle.position.x = (Math.random() - 0.5) * 50;
  particle.position.y = (Math.random() - 0.5) * 50;
  particle.position.z = (Math.random() - 0.5) * 50;

  // Add particle to the scene and array
  scene.add(particle);
  particles.push(particle);
}

// Position the camera
camera.position.z = 20;

// Animate particles
function animate() {
  requestAnimationFrame(animate);

  // Move and rotate particles
  particles.forEach((particle) => {
    particle.position.z += 0.1;
    if (particle.position.z > 30) {
      particle.position.z = -30; // Reset particle to the back
    }
    particle.rotation.x += 0.01;
    particle.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Start animation
animate();
