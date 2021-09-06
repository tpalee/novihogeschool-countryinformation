//Opdracht 1

// global variables
const belgiumbutton = document.getElementById('belgiuminfo');
//variable that holds the country to search for
let countryName;
// textarea searchfield
const searchfield = document.getElementById('search');
const countryField = document.getElementById('countrycontainer');
const searchbutton = document.getElementById('submitbutton');
const errorMessageField = document.getElementById("errormessage");
// errrormessage is stored in this variable
let errorMessage = '';
// below are the variables linked to the DOM-elements
const flagElement = document.getElementById("flag");
const countryNameElement = document.getElementById("country");
const subAreaElement = document.getElementById("subarea")
const currencieElement = document.getElementById("currencies");
const languageElement = document.getElementById("languages");

//Eventlisteners for the Button that search info about Belgium
// It sets the countryname to Belgium and calls the fetchData function
belgiumbutton.addEventListener('click', () => {
    countryName = 'Belgium'
    fetchData();
});

//////////opdracht 8/9//////////
//when searchbutton is clicked, call function fetchsearchdata where the value of the texfield is linked to variable countryName
searchbutton.addEventListener('click', fetchSearchData);
//when Enter-key is pressed, call function fetchsearchdata where the value of the texfield is linked to variable countryName
searchfield.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        fetchSearchData();
    }
})

//This function fetches the data of the country Belgium or the country typed in the searchfield
async function fetchData(countyName) {
    try {
        //////////opdracht 13 //////////
        // if an errormessage occured in the previous search the content will be deleted
        errorMessageField.textContent = '';
        //get the result from the api where ${countryName} is the country to fetch.
        const result = await axios.get(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`);
        //When data is fetched make the countrycontainer visible and hide the errrormessagefield by changing the classNames
        if (result) {
            countryField.className = 'show';
            errorMessageField.className = 'hidden';
        }

        //////////opdracht 1//////////
        //log all data of the searched country
        console.log(result);
        //place all required data from the response in a variable with destructoring
        const {name, subregion, capital, currencies, languages, flag, population} = result.data[0];

        //////////opdracht 2//////////
        //log op basis van de response de naam en subregio in de console
        console.log(`${name} is situated in ${subregion}`);

        //////////opdracht 3//////////
        //log de Hoofdstad in de console
        console.log(`The capital is ${capital}`);

        //////////opdracht 4//////////
        //create a function that makes a string of the used currencies in a country
        function currency(array) {
            if (array.length > 1) {
                console.log(`and you can pay with ${array[0].name}'s and ${array[1].name}'s'`);
                return `and you can pay with ${array[0].name}'s and ${array[1].name}'s'`;
            } else {
                console.log(`and you can pay with ${array[0].name}'s`);
                return `and you can pay with ${array[0].name}'s`;
            }
        }

        //call the function currency
        currency(currencies);

        //////////opdracht 5//////////
        //check if everything works if you fetch the data about Aruba and Germany
        //WARNING//This works when you replace the countryName in the eventlistener BelgiumButton
        //countryName='Aruba';
        //countryName='Germany';

        //////////opdracht 6 Bonusopdracht//////////
        //create a function that returns a string of all spoken languages
        const spokenLanguages = languages.map(language => {
            if (language == languages[0]) {
                return `They speak ${language.name}`;
            } else {
                return `and ${language.name}`;
            }
        })

        //////////opdracht 7 //////////
        //log retrieved data in the dom
        //fill the HTML-elements with the retrieved data
        flagElement.src = flag;
        countryNameElement.textContent = name;
        subAreaElement.textContent = `${name} is situated in ${subregion}. It has a population of ${population} people`;
        currencieElement.textContent = `The capital is ${capital} ${currency(currencies)}`;
        languageElement.textContent = `${spokenLanguages}`;

    } catch (e) {
        //////////opdracht 12 //////////
        // log error in the console
        console.error(e);
        //set the errormessage in the variable
        errorMessage = e;
        //fill the HTML element with the errormessage
        //and set the clasNames of the countrycontainer to hidden and the errormessage to show
        errorMessageField.className = 'show';
        countryField.className = 'hidden';
        errorMessageField.textContent = errorMessage;
        document.getElementById("e").className = "show";
        //////////opdracht 10 //////////
        //remove all DOM-content in the DOM
        flagElement.src = '';
        countryNameElement.textContent = '';
        subAreaElement.textContent = '';
        currencieElement.textContent = '';
        languageElement.textContent = '';
    }
}

// this function sets the value of the searchField to the variable countryName(country to fetch the data for)
// and then call the fetchData function
function fetchSearchData() {
    countryName = searchfield.value;
    fetchData();
}






