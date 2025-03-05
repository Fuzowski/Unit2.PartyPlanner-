
    let partypeople = []
async function fetchParties(){ console.log("1") 
  /*fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2411-ftb-et-web-pt/events`) // Fetching the list of parties from the API
    .then(response => response.json())
    .then(parties => {
         partypeople = parties.data
         console.log("here")
        

    }

    ) */
    const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2411-ftb-et-web-pt/events`)
    const { data } = await response.json();
    partypeople = data
    renderAllRecipes()
}
    const renderAllRecipes = () => {
        const partyContainer = document.getElementById("party-list");
        
        if(!partypeople || partypeople.length === 0) {
            partyContainer.innerHTML = "<h3>No parties Found </h3>";
            return;
        }
        partyContainer.innerHTML = "";
        
        partypeople.forEach((party) => {
         const partyElement = document.createElement("div");
         partyElement.classList.add("party-list");
         partyElement.innerHTML = `
         <h4> ${party.name}</h4>
         <p>Date: ${party.date}</p>
         <p>Time: ${party.time}</p>
         <p>Location: ${party.locaation}</p>
         <p>${party.description}</p>
         <button onclick="deleteParty('${party.id}')">Delete</button>
         `;
         partyContainer.appendChild(partyElement);
         
            
            
        }

        );
    };

    async function deleteParty(party) {
        try {
            await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2411-ftb-et-web-pt/events/${partyId}`, {
                method: "DELETE"
            });
            partypeople = partypeople.filter(party => party.id !== partyId);
            renderAllParties();
            
        } catch (error) {
            console.error("Error deleting party", error);
        }
        
    }
     async function addParty(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const locaation = document.getElementById("location").value;

        try {
            const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2411-ftb-et-web-pt/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, date, time, location, description })
            });
            const newParty = await response.json();
            partypeople.push(newParty.data);
            renderAllParties();
        } catch (error) {
            console.error("Error adding Party:", error);

        }
    }
    document.getElementById("party-form").addEventListener("submit", addParty);

    async function init() {
        await fetchParties();
        console.log(partypeople)
    }

    init();
