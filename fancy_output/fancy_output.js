document.querySelector('.card').addEventListener('click', function() {
    this.classList.toggle('open');
    if(this.classList[1]=="open"){
        setTimeout(() => {
            document.querySelector('#title').style.opacity = 0;
            document.querySelector('#icon').style.display = 'block';
        }, 350);
    }else{
        setTimeout(() => {            
            document.querySelector('#title').style.opacity = 1;
            document.querySelector('#icon').style.display='none';
        }, 400);
        
    }
});

const l = window.location.href.split("fancy_output");
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
        senderName: params.get('senderName') || '[Your Name]',
        bgColor: params.get('bgColor'),
        textColor: params.get('textColor') || '#ff0000',
        img: params.get('img') || 1
    };
}

let images = {0:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Emoji_u1f64f.svg/1200px-Emoji_u1f64f.svg.png",
            1:"https://cdn-icons-png.flaticon.com/512/1791/1791342.png",
            2:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png"};

// Apply custom values to the page
function applyCustomizations() {
    const { ev, name, message, senderName, bgColor, textColor, img } = getUrlParams();
    document.title = `Happy ${ev}`;
    document.getElementById('title').innerHTML = `<br> Happy ${ev} <br><b><big>${name}</big></b>`;
    document.getElementById('msg').innerHTML = `${message} <br> ~${senderName}`;
    document.querySelector(".birthday-message").style.color=textColor;
    document.querySelector("#title").style.color=textColor;
    document.querySelector("#icon").src=images[img];
    document.title = `🎉 Happy ${ev} ${name} 🎉`;
    // Apply linear gradient if multiple colors are provided in bgColor
    if (bgColor) {
        const colors = bgColor.split(',');
        console.log(colors);
        console.log(`linear-gradient(135deg, ${colors[0]} 0%,${colors[1]} 5%,${colors[0]} 10%, ${colors[1]} 25%,${colors[0]} 30%, ${colors[1]} 50%,${colors[0]} 55%, ${colors[1]} 75%,${colors[0]} 80%, ${colors[1]} 95%, ${colors[0]} 100%);`);
        if (colors.length > 1) {
            // document.body.style.background = `linear-gradient(135deg, ${colors.join(', ')})`;
            document.querySelector(".card-front").style.background = `linear-gradient(135deg, ${colors.join(', ')})`;
            document.querySelector(".card-inside").style.background = `linear-gradient(135deg, ${colors.join(', ')})`;
            document.body.style.background = `linear-gradient(135deg, ${colors[0]} 0%,${colors[1]} 5%,${colors[0]} 10%, ${colors[1]} 25%,${colors[0]} 30%, ${colors[1]} 50%,${colors[0]} 55%, ${colors[1]} 75%,${colors[0]} 80%, ${colors[1]} 95%, ${colors[0]} 100%)`
        } else {
            // document.body.style.backgroundColor = colors[0];
            document.querySelector(".card-front").style.background = colors[0];
            document.querySelector(".card-inside").style.background = colors[0];
            document.body.style.background = `linear-gradient(135deg, brown 0%,#390f0f 5%,brown 10%, #390f0f 25%,brown 30%, #390f0f 50%,brown 55%, #390f0f 75%,brown 80%, #390f0f 95%, brown 100%);`
        }
    }
}

// Call functions to apply customizations when the page loads
applyCustomizations();
