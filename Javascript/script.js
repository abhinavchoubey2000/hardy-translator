let mainBox = document.querySelector(".mainBox");

const goBack = (againButton, translatedPara) => {

    mainBox.removeChild(againButton);
    mainBox.removeChild(translatedPara);

    const textBoxDiv = document.createElement("div");
    textBoxDiv.classList.add("textBox");

    const newTextArea = document.createElement("textarea");
    newTextArea.classList.add("textArea");
    newTextArea.placeholder = "Your text goes here...";

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const newLeftSelect = document.createElement("select");
    newLeftSelect.classList.add("leftSelect");
    const newLeftSelectOption1 = document.createElement("option");
    newLeftSelectOption1.value = "en";
    newLeftSelectOption1.innerHTML = "English";
    const newLeftSelectOption2 = document.createElement("option");
    newLeftSelectOption2.value = "hi";
    newLeftSelectOption2.innerHTML = "Hindi";

    const newTranslateButton = document.createElement("button");
    newTranslateButton.classList.add("translateButton");
    newTranslateButton.addEventListener("click", translateText);
    newTranslateButton.innerHTML="Translate"

    const newRightSelect = document.createElement("select");
    newRightSelect.classList.add("rightSelect");
    const newRightSelectOption1 = document.createElement("option");
    newRightSelectOption1.value = "hi";
    newRightSelectOption1.innerHTML = "Hindi";
    const newRightSelectOption2 = document.createElement("option");
    newRightSelectOption2.value = "en";
    newRightSelectOption2.innerHTML = "English";

    textBoxDiv.appendChild(newTextArea);
    mainBox.appendChild(textBoxDiv);

    newLeftSelect.appendChild(newLeftSelectOption1);
    newLeftSelect.appendChild(newLeftSelectOption2);
    buttonsDiv.appendChild(newLeftSelect);

    buttonsDiv.appendChild(newTranslateButton);

    newRightSelect.appendChild(newRightSelectOption1);
    newRightSelect.appendChild(newRightSelectOption2);
    buttonsDiv.appendChild(newRightSelect);

    mainBox.appendChild(buttonsDiv);
}

const translateText = async () => {
    
    const fetchOptions =  {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'afb6248b2emsha0bd2b37eb0b30fp11cc43jsn22275faa8b12',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
        },
        body: JSON.stringify({
            q: document.querySelector(".textArea").value,
            source: document.querySelector(".leftSelect").value,
            target: document.querySelector(".rightSelect").value
        })
    };

    mainBox.removeChild(document.querySelector(".textBox"));
    mainBox.removeChild(document.querySelector(".buttons"));

    const waitingPara = document.createElement("p");
    waitingPara.classList.add("waitingPara")
    waitingPara.appendChild(document.createTextNode("Are Ruko Zara Sabar Karo Ho Raha Hai Translate..."));
    
    mainBox.appendChild(waitingPara);
    
    try{
        const response = await fetch('https://deep-translate1.p.rapidapi.com/language/translate/v2', fetchOptions)

        const data = await response.json();
        const translatedGivenText = data.data.translations.translatedText;
        
        const translatedTextNode = document.createTextNode(translatedGivenText);
        const translatedPara = document.createElement("p");
        translatedPara.classList.add("translatedPara");
        translatedPara.appendChild(translatedTextNode);

        const againButton = document.createElement("button");
        againButton.classList.add("againButton")
        againButton.innerHTML = "Again";
        againButton.addEventListener("click", ()=>{goBack(againButton, translatedPara)});

        mainBox.removeChild(waitingPara);

        mainBox.appendChild(translatedPara);
        mainBox.appendChild(againButton);

    }
    catch (err) {
        mainBox.innerHTML = `Bhai pata nahi yaar...Kuch toh galat hua hai yaha. Thodi der mai firse koshish karna. ${err}`;
    }
}