let selectedEvent = "";
let selectedimg = 1;
let msgShown = false;

function updateCounter() {
    let input = document.getElementById('message');
    let counter = document.getElementById('charCounter');
    counter.textContent = input.value.length + "/250";
}

document.querySelector("#message").addEventListener("focus", () => {
    let counter = document.querySelector(".counter");
    counter.style.bottom = "-16px";
    counter.style.right = "5px";
    counter.style.backgroundColor = "transparent"; // Remove background
    counter.style.border = "none"; // Remove border
    counter.style.boxShadow = "none"; // Remove shadow
});

document.querySelector("#message").addEventListener("blur", () => {
    let counter = document.querySelector(".counter");
    counter.style.bottom = "9px";
    counter.style.right = "5px";
    counter.style.backgroundColor = "#2B2A40"; // Restore background
    counter.style.border = "1px solid rgba(43, 42, 64, 0.5)"; // Restore border
    counter.style.boxShadow = "0 0 5px 10px rgba(43, 42, 64, 0.5)"; // Restore shadow
});


document.getElementById('bgColor1').addEventListener("click",(event)=>{
    if(!msgShown){
        // swal("This will be one of the color of your card's background, it is pink by default", "leave it if you have less experience with colors");
        Swal.fire({
            title: "This will be one of the colors of your card's background",
            html: "It is pink by default. <br> Leave it if you have less experience with colors.",
            icon: "info",
            confirmButtonText: "OK"
        });
        
        msgShown=true;
        event.preventDefault();
    }
});

document.querySelector('.dropdown-btn').addEventListener('click', function () {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.classList.toggle('show');
});

document.querySelectorAll('.dropdown-content a').forEach(option => {
    option.addEventListener('click', function (event) {
        event.preventDefault();
        selectedEvent = this.getAttribute('data-value');
        document.querySelector("#event").innerHTML = selectedEvent;
        console.log(`Selected Event: ${selectedEvent}`); 

        document.querySelector('.dropdown-content').classList.remove('show');
        if(selectedEvent=='Anniversary'){
            // swal("When wishing Anniversary, write both people's names with 'and' as separation  in the name input field","","info");  
            Swal.fire({
                title: "When wishing Anniversary, write both people's names with 'and' as separation in the name input field",
                icon: "info",
                confirmButtonText: "OK"
            });
        }else{
            if(selectedEvent=='Custom'){
                Swal.fire({
                    title: "Event Name",
                    icon: "question",
                    html: `<input type="text" id="eventInput" placeholder="Event/Festival Name">`,
                    confirmButtonText: "Done",
                    preConfirm: () => {
                        return document.getElementById("eventInput").value;
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        selectedEvent = result.value;
                        document.querySelector("#event").innerHTML = selectedEvent;
                    }
                });
                
            }
        }

        
    });
});

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
    }
};
document.querySelector("#submi").addEventListener("click", () => {
    Swal.fire({
        title: "Choose style",
        html: `
            <div style="display: flex; justify-content: center; gap: 10px;">
                <img src="./Videos/1.gif" onclick="selectStyle(1)" alt="Output" style="width: 165px; height: 114px; cursor: pointer;" loading="lazy">
                <img src="./Videos/2.gif" onclick="selectStyle(0)" alt="Fancy Output" style="width: 165px; height: 114px; cursor: pointer;" loading="lazy">
            </div>
        `,
        showConfirmButton: false
    });
});

let selected_style = 0;
function selectStyle(value) {
    Swal.close();
    selected_style=value;
    getFormValues();
}

function getFormValues() {
    const name = document.getElementById('name').value.replace(/ /g, "%20");;
    const message = document.getElementById('message').value.replace(/ /g, "%20");;
    const bgColor1 = document.getElementById('bgColor1').value.split("#")[1];
    const bgColor2 = document.getElementById('bgColor2').value.split("#")[1];
    const textColor = document.getElementById('textColor').value.split("#")[1];
    const senderName = document.getElementById("senderName").value.replace(/ /g, "%20");
    const l = window.location.href.split("/");
    const li = l.slice(0, -1).join("/");
    let out = selected_style?'fancy_output':'output';
    const link = `${li}/${out}/${out}.html?event=${selectedEvent}&name=${name}&senderName=${senderName}&message=${message}&bgColor=%23${bgColor1},%23${bgColor2}&textColor=%23${textColor}&img=${selectedimg}`;
    
    console.log(link);
    showPopup(link);
}

function showPopup(link) {
    const popup = document.getElementById("share-popup");
    const linkInput = document.getElementById("share-link");
    linkInput.value = link;

    popup.classList.add("show");
}

document.querySelector("#copy-btn").addEventListener("click", () => {
    const linkInput = document.getElementById("share-link");
    linkInput.select();
    document.execCommand("copy");
    // swal("Link copied to clipboard!","","success");
    Swal.fire({
        title: "Link copied to clipboard!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
    });
    
});

document.querySelector("#close-popup").addEventListener("click", () => {
    document.getElementById("share-popup").classList.remove("show");
});


document.querySelector('.advanced-btn').addEventListener('click', function () {
    const advancedContent = document.getElementById('advanced-options');
    advancedContent.classList.toggle('show');
});

// Function to handle image selection
function selectImage(value) {
    Swal.close();
    selectedimg=value;
}

document.querySelector("#image_selector").addEventListener("click",()=>{
    Swal.fire({
        title: "Choose an image",
        html: `
            <div style="display: flex; justify-content: center; gap: 10px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Emoji_u1f64f.svg/1200px-Emoji_u1f64f.svg.png" onclick="selectImage(0)" loading="lazy" style="width: 100px; cursor: pointer;">
                <img src="https://cdn-icons-png.flaticon.com/512/1791/1791342.png" onclick="selectImage(1)" style="width: 100px; cursor: pointer;" loading="lazy">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png" loading="lazy" onclick="selectImage(2)" style="width: 100px; cursor: pointer;">
            </div>
        `,
        showConfirmButton: false
    });
})

const style = document.createElement('style');
style.innerHTML = `
    .advanced-content {
        display: none;
    }
    .advanced-content.show {
        display: block;
    }
`;
document.head.appendChild(style);