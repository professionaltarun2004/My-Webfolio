// Initialize Three.js background
function initBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('background-canvas'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load('path/to/your/texture.png');

    // Add particles
    const particles = new THREE.Points(
        new THREE.BufferGeometry(),
        new THREE.PointsMaterial({ size: 0.005, map: particleTexture, transparent: true })
    );
    const positions = [];
    for(let i = 0; i < 1000; i++) {
        positions.push(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
        );
    }
    particles.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    scene.add(particles);

    camera.position.z = 1;

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0001;
        renderer.render(scene, camera);
    }
    animate();
}

// Initialize additional canvas elements
function initAdditionalCanvases() {
    const canvas1 = document.getElementById('canvas1');
    const ctx1 = canvas1.getContext('2d');
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;

    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    function drawCanvas1() {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        ctx1.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx1.beginPath();
        ctx1.arc(Math.random() * canvas1.width, Math.random() * canvas1.height, Math.random() * 50, 0, Math.PI * 2);
        ctx1.fill();
        requestAnimationFrame(drawCanvas1);
    }

    function drawCanvas2() {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx2.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx2.beginPath();
        ctx2.arc(Math.random() * canvas2.width, Math.random() * canvas2.height, Math.random() * 50, 0, Math.PI * 2);
        ctx2.fill();
        requestAnimationFrame(drawCanvas2);
    }

    drawCanvas1();
    drawCanvas2();
}

// Handle section transitions
document.querySelectorAll('.section-card').forEach(card => {
    card.addEventListener('click', () => {
        const section = card.dataset.section;
        const content = document.getElementById(`${section}-content`);
        
        document.querySelectorAll('.content-section').forEach(el => {
            if (el !== content) {
                el.classList.remove('active');
                setTimeout(() => el.classList.add('hidden'), 500);
            }
        });

        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            setTimeout(() => content.classList.add('active'), 10);
        } else {
            content.classList.remove('active');
            setTimeout(() => content.classList.add('hidden'), 500);
        }
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    initAdditionalCanvases();
    
    // Animate cards on page load
    gsap.from('.section-card', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Add more animations
    gsap.from('.nav-item', {
        duration: 1,
        y: -20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });

    gsap.from('.hero-content', {
        duration: 1.5,
        x: -100,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.hero-animation', {
        duration: 1.5,
        x: 100,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.card-hover', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.card-hover',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.progress-fill', {
        duration: 1.5,
        width: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.progress-fill',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});