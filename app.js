const input = document.querySelector("#input");
const serachBtn = document.querySelector("#search");
const deffinations = document.querySelector(".def");
const notFound = document.querySelector(".not__found");
const soundBox = document.querySelector(".audio");
const apiKey = "ae973380-d372-4484-92db-3703f3cee10a";
serachBtn.addEventListener("click", function (e) {
    e.preventDefault();
    deffinations.innerText = '';
    notFound.innerHTML = '';
    soundBox.innerHTML = '';
    let word = input.value;

    if (word === "") {
        alert("word is required");

    } else {
        getData(word);
    }


    async function getData() {
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
        const data = await response.json();

        if (!data.length) {
            notFound.innerText = "No result found";
            return
        }

        if (typeof data[0] === "string") {
            let heading = document.createElement("h4");
            heading.innerText = "Did you mean ?";
            notFound.appendChild(heading);
            data.forEach(element => {
                let suggestions = document.createElement("h5");
                suggestions.classList.add('suggested');
                suggestions.innerText = element;
                notFound.appendChild(suggestions);
            })
            return;
        }

        let defination = data[0].shortdef[0];
        deffinations.innerText = defination;
        console.log(data);
   

    const soundName = data[0].hwi.prs[0].sound.audio;
    if (soundName) {
        renderSound(soundName);
    }

    function renderSound(soundNmae) {
        let subFolder = soundName.charAt(0);
        let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/
        ${soundName}.wav?key=${apiKey}`;

        let aud = document.createElement('audio');
        aud.src = soundSrc;
        aud.controls = true;
        soundBox.appendChild(aud);
    }
}}) 