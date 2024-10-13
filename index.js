document.addEventListener('DOMContentLoaded', () => {
    fetchWrestlers();
    document.querySelector('#sort-btn').addEventListener('click', () => {
    fetchWrestlers();
});
    document.querySelector('form').addEventListener('submit', handleNewWrestler);

});


//fetch the wrestlers from wrestlers db.json. This will automatically sort the list based on votes received.
function fetchWrestlers() {
    fetch('http://localhost:3000/wrestlers') 
    .then(res => res.json())
    .then(wrestlerData => {
       wrestlerData.sort((a, b) => b.votes - a.votes);
       document.querySelector('#wrestler-list2').innerHTML = "";
       wrestlerData.forEach(wrestler => renderOneWrestler(wrestler));
    })
}

//after fetching the wrestlers objects, it will then be rendered in the wrestlers list column.
function renderOneWrestler(wrestler) {
    let li = document.createElement('li');
    li.innerText = wrestler.name;
    li.addEventListener('click', () => mouseClick(wrestler));
    li.addEventListener('mouseover', () => mouseOver(wrestler));
    li.addEventListener('mouseout', () => mouseOut());

    //if the name of the wrestlers is clicked, the object information will be passed to the wrestler card.
    function mouseClick(wrestler) {
        document.querySelector('#wrestler-card').innerHTML = "";
            wrestlerCard(wrestler);
    }
    
    //if the name of the wrestlers is mouseovered, the object information will be passed to the wrestler container.
    function mouseOver(wrestler) {
        li.style.backgroundColor = "red";
        document.querySelector('#wrestler-container').innerHTML = "";
        wrestlerContainer(wrestler);
    }

    //if the name of the wrestler is mouse outed, the object information from the wrestler container will be deleted.
    function mouseOut() {
        li.style.backgroundColor = "black";
        document.querySelector('#wrestler-container').innerHTML = "";
    }
    document.querySelector('#wrestler-list2').appendChild(li);
}

//from the mouseover, the wrestler object information will be displayed to the wrestler container column.
function wrestlerContainer(wrestler) {
    let card = document.createElement('div');
    card.innerHTML = `
        <div class="column3">
        <img src="${wrestler.image}" width=100px>
        </div>
    ` 
    document.querySelector('#wrestler-container').appendChild(card);
}

//if the wrestler name is clicked from the wrestler list, the wrestler object info will be show in the wrestler card.
function wrestlerCard(wrestler) {
    let card = document.createElement('div');
    card.innerHTML = `
        <div class="column2">
        <img src="${wrestler.image}" width=250px>
        </div>
        <div class="column2" align="left">
        <h2>${wrestler.name}</h2>
        <h3>Hometown: ${wrestler.hometown}</h3>
        <h3>Finisher Move: ${wrestler.finisher}</h3>
        <h3>Catch Phrase: ${wrestler.catchphrase}</h3>
        <h3 id="votes">Votes: ${wrestler.votes}</h3>
        <button type="button" id='vote-btn' style="background:black; color:white"><b>VOTE!</b></button>
        <button type="button" id='eliminate-btn' style="background:black; color:white"><b>ELIMINATE WRESTLER!</b></button>
        </div>
        `
    //if the vote button is clicked within the wrestler card, it will add votes and will be added to the db.json.     
    card.querySelector('#vote-btn').addEventListener('click', () => {
        wrestler.votes += 1;
        card.querySelector('#votes').innerText = `Votes: ${wrestler.votes}`;
        updateLikes(wrestler);
    })

    //if the eliminated button is clicked within the wrestler card, it will delete the object in the db.json and re fetch the wrestler list.
    card.querySelector('#eliminate-btn').addEventListener('click', () => {
        deleteWrestler(wrestler);
    })

    document.querySelector('#wrestler-card').appendChild(card);
}

//function to update the likes in the db.json.
function updateLikes(wrestlerObj) {
    fetch(`http://localhost:3000/wrestlers/${wrestlerObj.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wrestlerObj)
      })
      .then(res => res.json())
    }

//once the eliminate wrestler button is clicked, it will delete the wrestler in the db.json and refetch the wrestler list.
function deleteWrestler(wrestlerObj) {
    fetch(`http://localhost:3000/wrestlers/${wrestlerObj.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wrestlerObj)
      })
      .then(res => res.json())
      .then(() => {
        fetchWrestlers();
        document.querySelector('#wrestler-card').innerHTML = `<img src=images/wrestlercollection.jpg width=500px>`
        })
}

    //when the add new wrestler submit button is clicked, it will gather all infromation and create an object, will then be passed to addNewWrestler.
    function handleNewWrestler(wrestler) {
        wrestler.preventDefault();
        let wrestlerObj = {
            name: wrestler.target.querySelector('#name').value,
            hometown: wrestler.target.querySelector('#hometown').value,
            finisher: wrestler.target.querySelector('#finisher').value,
            catchphrase: wrestler.target.querySelector('#catchphrase').value,
            image: wrestler.target.querySelector('#image').value,
            votes: 0
        };
        addNewWrestler(wrestlerObj);
        document.querySelector('form').reset();
    }

    //Once the form is submitted, the inforation will then be added to the db.json.
    function addNewWrestler(wrestlerObj) {
        fetch('http://localhost:3000/wrestlers/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body:JSON.stringify(wrestlerObj)
        })
        .then(res => res.json())
        .then(() => fetchWrestlers())
    }