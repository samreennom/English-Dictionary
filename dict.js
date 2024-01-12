const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {

    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "block";
        infoTextEl.innerText = `searching the meaning of "${word}"`

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result = await fetch(url).then((res) => res.json());


        if (result.title) {
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word
            meaningEl.innerText = "N/A";
            audioEl.style.display = "none";
        } else {
            infoTextEl.style.display = null;
            meaningContainerEl.style.display = "block";
            audioEl.style.display = "inline-flex";
            titleEl.innerText = result[0].word
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;
        }

    } catch (error) {
        console.log(error);
        infoTextEl.innerText = "an error happened, try again later";

        if (result.status == 200) {
            infoTextEl.style.display = null;
            meaningContainerEl.style.display = "block";
            audioEl.style.display = "inline-flex";
            titleEl.innerText = result[0].word
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;
        }
        else {
            infoTextEl.innerText = "An error happened, try again later";

            titleEl.innerText = "none";
            meaningEl.innerText = "N/A";
            audioEl.style.display = "none";
        }

    }
}



inputEl.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value);
    }
});

