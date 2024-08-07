document.addEventListener('DOMContentLoaded', function() {
    const days = [
        "Day 01 - Voyage Slider",
        "Day 02 - Dashing Blob Ball",
        "Day 03 - Resume",
        "Day 04 - Ghost and Ghouls",
        "Day 05 - Menu hover glow",
        "Day 06 - Inline CSS Form Design",
        "Day 07 - Diwali",
        "Day 08 - Sign Up:Login",
        "Day 09 - Neon Sign",
        "Day 10 - FAQ Page",
        "Day 11 - Dark Mode Toggle",
        "Day 12 - Blur",
        "Day 13 - Card Effort",
        "Day 14 - Augmented UI",
        "Day 15 - Interactive Particles",
        "Day 16 - Evervault Hover Effect",
        "Day 17 - Glowing dark card",
        "Day 18 - Upload Modal",
        "Day 19 - Fluid Cursor",
        "Day 20 - CSS gravity",
        "Day 21 - Playful",
        "Day 22 - Hover Effect",
        "Day 23 - Skeleton Loading",
        "Day 24 - Blur Overlay",
        "Day 25 - Galaxy",
        "Day 26 - Drop",
        "Day 27 - Gradient Typing",
        "Day 28 - Liquid Revel",
        "Day 29 - Blossoming Flowers",
        "Day 30 - Hologram Effect",
        "Day 31 - Nixie Tube Clock",
        "Day 32 - Sci-Fi Card Hover",
        "Day 33 - Star Trails",
        "Day 34 - Tilt Blur Effect",
        "Day 35 - Accessible Tabs",
        "Day 36 - Alphabet Rain",
        "Day 37 - Animated Number Bar",
        "Day 38 - Neumorphism-on-off",
        "Day 39 - PolarWarp-Truchet",
        "Day 40 - Product Card",
        "Day 41 - Neumorphic Loading Animation",
        "Day 42 - Reveal Menu animation",
        "Day 43 & 44 - Astral Maze",
        "Day 45 , 46 & 47 - Spell Caster",
        "Day 48 & 49 - Puzzle",
        "Day 50 - Chirstmas",
        "Day 51 - Whack A Mole",
        "Day 52 - Candy crush",
        "Day 53 - Tetris",
        "Day 54 - 2048",
        "Day 55 - Pacman Game",
        "Day 56 - Tic-Tac-Toe Game",
        "Day 57 - PopIt Game",
        "Day 58 - Direction-Aware Mickey Mouse",
        "Day 59 - Emoji Spinner",
        "Day 60 - Pongal Wishes",
        "Day 61 & 62 - 3D Little Bakery (Three.js)",
        "Day 63 & 64 - 034 Shape Grid",
        "Day 65 & 66 - 3D Office (Three.js)",
        "Day 67 & 68 - 3D Room (Three.js)",
        "Day 69, 70 & 71 - Diorama (Three.js)",
        "Day 72 & 73 Dystopia",
        "Day 74 & 75 Fishbowl Save-the-fish",
        "Day 76 & 77 - Little-restaurant threejs",
        "Day 78 , 79 & 80 - Mobile-vr-polar scene",
        "Day 81 & 82 - Portal-scene threejs-journey-xyz",
        "Day 83 & 84 - Spooky threejs",
        "Day 85 , 86 & 87 - three-js-mobile-vr-sonic",
        "Day 88 , 89 & 90 - Threejs-gradient",
        "Day 91 & 92 - Tiny Poly World Threejs",
        "Day 93 - Trophy-animation",
        "Day 94 - Rose Day",
        "Day 95 - Propose Day",
        "Day 96 - Chocolate Day",
        "Day 97 - Teddy Day",
        "Day 98 - Promise Day",
        "Day 99 - Hug Day",
        "Day 100 - Kiss Day"

    ];

    const dayList = document.getElementById('day-list');

    days.forEach(day => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `${day}/index.html`;
        link.textContent = day;
        listItem.appendChild(link);
        dayList.appendChild(listItem);
    });
});


// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    tsParticles.load("particles-js", {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00BFFF"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 4,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00BFFF",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 250,
                    "size": 0,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 400,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
});
