let pageNumber = 1
const monsterURL = 'http://localhost:3000/monsters';
const monsterParams = `${monsterURL}/?_limit=50&_page=`;
const container = document.getElementById('monster-container')

document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters(`${monsterParams}${pageNumber}`)
    buttonsInit()
    document.getElementById('create-monster').append(monForm())


})

// 1- When the page loads, show the first 50 monsters. Each monster's name, age, and
//   description should be shown ==> fetch function and render function

// 2.1 - Above your list of monsters, you should have a form to create a new monster.
//   You should have fields for name, age, and description, and a 'Create Monster ==> form function to make a form Button'. 

// 2.2-When you click the button, the monster should be added to the list and saved in the API. ==> POST request, submit form function


// 3- At the end of the list of monsters, show a button. When clicked, the button
//   should load the next 50 monsters and show them. ==> button function with if else condition for each button.



//MAKE A FORM ----------------------------------------------------------------
// 2.1 Above your list of monsters, you should have a form to create a new monster.
function monForm() {
    //create elements
    const monsterForm = document.createElement('form')
    const nameInput = document.createElement('input')
    const ageInput = document.createElement('input')
    const desInput = document.createElement('input')
    const submitBtn = document.createElement('button')

    //add info
    // nameInput.type = "text"
    // ageInput.type = "text"
    // desInput.type = "text"
    // submitBtn.type = "submit"

    // add ID *to realte to the adding the new stuff ===> Apparently don't need it?
    monsterForm.setAttribute("id", "monster-form")
    nameInput.setAttribute("id", "name")
    ageInput.setAttribute("id", "age")
    desInput.setAttribute("id", "description")

    //extra CSS for fun!
    nameInput.placeholder = "Name..."
    ageInput.placeholder = "Age..."
    desInput.placeholder = "Description..."
    submitBtn.textContent = "CREATE MONSTER BUTTON"
    submitBtn.style.color = "blue"
    submitBtn.style.fontWeight = "bold"

    //append
    monsterForm.append(nameInput, ageInput, desInput, submitBtn)
    document.getElementById('create-monster').append(monsterForm)

    //make button behaviour part1
    monsterForm.addEventListener('submit', (e) => {
        e.preventDefault()
        submitMonsters(e)

    })
    return monsterForm
}


//make button behaviour part2
//2.2. When you click the button, the monster should be added to the list and saved in the API.
function submitMonsters(e) {
    // console.log("Hi")

    const { name, age, description } = e.target;
    fetch('http://localhost:3000/monsters', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, body: JSON.stringify({
            name: name.value,
            age: age.value,
            description: description.value
        })
    }).then(res => res.json())
        .then(newMonster => {
            const container = document.getElementById('monster-container')
            container.append(renderMonsters(newMonster, createNewMonsters()))
            
            //the new data we put into the form must appear, in order for that to happen we need to create element, and append to the container.
    

        })
}


//Making Buttons 
//When clicked, the button should load the next 50 monsters and show them.
function buttonsInit() {
    //create elements
    const back = document.getElementById('back');
    const forward = document.getElementById('forward');

    //add behaviours
    back.addEventListener('click', () => {
        if (pageNumber <= 1) {
            return alert("No more monsters avail! Sorry:(");
        } else {
            pageNumber -= 1;
            fetchMonsters(`${monsterParams}${pageNumber}`);
        }
    });

    //add behaviours
    forward.addEventListener('click', () => {
        const container = document.getElementById('monster-container')
        if (container.textContent.length > 0) {
            pageNumber += 1;
            fetchMonsters(`${monsterParams}${pageNumber}`);
        } else {
            return undefined;
        }
    });
};


//GET Request ------------------------------------------------------------------------------
// 1.When the page loads Show the first 50 monsters. 
function fetchMonsters(url) {
    let container = document.getElementById('monster-container')
    container.innerHTML = ""
    //Form should not append all the loaded data ===> we must "empty"/"clear"
    //need to interpolate the page number in order to change it with the buttons.
    //show 50 monsters on page1, and so on. There are thounds of them => 20 pages 
    fetch(url)
        .then(res => res.json())
        .then(monsterData => {
            monsterData.forEach(monster => {
                const newMonster = renderMonsters(monster, createNewMonsters())
                container.append(newMonster)
            })
        })

}




//2.Each monster's name, age, and description should be shown.
//RENDER ------------------------------------------------------------------------------------
function renderMonsters(monsters, container) {
    //I'm not quite sure about this format, but it works!
    container.id = monsters.id;
    container.querySelector('h2').textContent = monsters.name;
    container.querySelector('h4').textContent = monsters.age;
    container.querySelector('p').textContent = monsters.description;
    return container;



    //I have no idea why this one does not work?!
    // //create elements
    // const monsterSpan = document.createElement('span')
    // const monName = document.createElement('h2');
    // const monAge = document.createElement('h4');
    // const monDescription = document.createElement('p')

    // //add info
    // monName.textContent = monsters.name
    // monAge.textContent = monsters.age
    // monDescription.textContent = monsters.description
    // monsterSpan.setAttribute("data-id", monsters.id)

    // //append
    // monsterSpan.append(monName, monAge, monDescription)
    // container.append(monsterSpan)

}


//Make elements for the new monster data to go in
function createNewMonsters() {
    //create Elements
    const nmSpan = document.createElement('span')
    const nmName = document.createElement('h2')
    const nmAge = document.createElement('h4')
    const nmDescription = document.createElement('p')

    //append
    nmSpan.append(nmName, nmAge, nmDescription)
    return nmSpan

}

