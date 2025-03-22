const l = window.location.href.split("output");
const li = l[0]
console.log(li)
document.querySelector("#clik").href = li+"index.html"

// Parse URL parameters to get custom values
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        ev: params.get('event') || 'Birthday',
        name: params.get('name') || '[Name]',
        message: params.get('message') || 'Wishing you a day filled with love, laughter, and amazing surprises! 🎂🎈',
        senderName: params.get('senderName') || '',
        bgColor: params.get('bgColor'),
        textColor: params.get('textColor') || '#ffffff',
        img: params.get('img') || 1
    };
}
let images = {0:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Emoji_u1f64f.svg/1200px-Emoji_u1f64f.svg.png",
            1:"https://cdn-icons-png.flaticon.com/512/1791/1791342.png",
            2:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png"};
// Apply custom values to the page
function applyCustomizations() {
    const { ev, name, message, senderName, bgColor, textColor,img } = getUrlParams();
    document.title = `Happy ${ev}`;
    document.getElementById('birthdayGreeting').textContent = `🎉 Happy ${ev} ${name} 🎉`;
    document.getElementById('birthdayMessage').textContent = message;
    document.body.style.color = textColor;
    document.getElementById("surpriseButton").textContent = `Click Here To See Message From ${senderName}`
    document.querySelector("#icon").src=images[img];
    document.title = `🎉 Happy ${ev} ${name} 🎉`;
    // Apply linear gradient if multiple colors are provided in bgColor
    if (bgColor) {
        const colors = bgColor.split(',');
        if (colors.length > 1) {
            document.body.style.background = `linear-gradient(135deg, ${colors.join(', ')})`;
        } else {
            document.body.style.backgroundColor = colors[0];
        }
    }
}

// Other code for button click event, confetti, and animations remain the same

// Show the popup and start confetti animation on button click
document.getElementById('surpriseButton').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block';
    startConfetti();
});

// Close the popup
document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

// Simple confetti animation
function startConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b6b', '#ffe066', '#4ecdc4', '#ffb6b9', '#ff6b6b', '#ffe066', '#4ecdc4', '#ffb6b9'];
    
    confettiContainer.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}

// Confetti styles
const style = document.createElement('style');
style.innerHTML = `
    .confetti {
        position: absolute;
        top: 0;
        width: 10px;
        height: 10px;
        opacity: 0.8;
        border-radius: 50%;
        animation: fall linear forwards;
    }

    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Call functions to apply customizations when the page loads
applyCustomizations();
