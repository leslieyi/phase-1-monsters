let page = 21;
const monstrURL = 'http://localhost:3000/monsters';
const monstrPARAMS = `${monstrURL}/?_limit=50&_page=`;

document.addEventListener('DOMContentLoaded', () => {
    getMonsters(`${monstrPARAMS}${page}`);
    buttonsInit();
    document.getElementById('create-monster').append(buildForm())
});

function buildForm() {
    const form = document.createElement('form');
    form.id = 'monster-form'
    const name = document.createElement('input');
    name.id = 'name';
    name.placeholder = 'name...';
    const age = document.createElement('input');
    age.id = 'age';
    age.placeholder = 'age...';
    const description = document.createElement('input');
    description.id = 'description';
    description.placeholder = 'description...';
    const submit = document.createElement('button');
    submit.textContent = "Create";
    form.append(name, age, description, submit);
    form.addEventListener('submit', e => {
        e.preventDefault();
        submitMonster(e);
    })
    return form;
};

function submitMonster(e) {
    const { name, age, description } = e.target;
    fetch(monstrURL, {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, body: JSON.stringify({
            name: name.value,
            age: age.value,
            description: description.value
        })
    }).then(r => r.json()).then(newMon => {
        const container = document.getElementById('monster-container');
        container.append(buildMonster(newMon, newMonster()));
    });
};

function buttonsInit() {
    const back = document.getElementById('back');
    const forward = document.getElementById('forward');
    back.addEventListener('click', () => {
        if (page <= 1) {
            return undefined;
        } else {
            page -= 1;
            getMonsters(`${monstrPARAMS}${page}`);
        }
    });
    forward.addEventListener('click', () => {
        const container = document.getElementById('monster-container');
        if (container.textContent.length > 0) {
            page += 1;
            getMonsters(`${monstrPARAMS}${page}`);
        } else {
            return undefined;
        }
    });
};

function getMonsters(url) {
    let container = document.getElementById('monster-container');
    container.innerHTML = "";
    fetch(url).then(r => r.json()).then(monsters => {
        monsters.forEach(monster => {
            const newMon = buildMonster(monster, newMonster());
            container.append(newMon);
        })
    });
};

function buildMonster(monster, container) {
    container.id = monster.id;
    container.querySelector('h2').textContent = monster.name;
    container.querySelector('h4').textContent = monster.age;
    container.querySelector('p').textContent = monster.description;
    return container;
};

function newMonster() {
    div = document.createElement('div');
    const name = document.createElement('h2');
    const age = document.createElement('h4');
    const description = document.createElement('p');
    div.append(name, age, description);
    return div;
};
