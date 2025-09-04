console.clear();

const displayJoke = document.getElementById("display-joke");
const category = document.getElementById("category");
let chosenCategory = `dev`;


category.addEventListener("change", () => {
	chosenCategory = category.value;
});


async function generateCategoryOptions() {
	let outPut = ``;

	try {
		const results = await fetch(`https://api.chucknorris.io/jokes/categories`);

		if (!results.ok) {
			throw new Error("Request failed.");
		}

		const data = await results.json();
		category.removeAttribute("disabled");

		data.forEach((cat) => {
			outPut += `<option value="${cat}">${cat}</option>`;
		});

		category.innerHTML = outPut;

		
		const devOption = Array.from(category.options).find(opt => opt.value === "dev");
		if (devOption) {
			devOption.selected = true;
			chosenCategory = "dev";
		} else {
		
			chosenCategory = category.value;
		}
	} catch (error) {
		console.error(error);
	}
}
generateCategoryOptions();


async function fetchJoke() {
	const errorMessage = `"DO NOT DISTURB!" Chuck Norris is currently entertaining guests in his hotel room.`;

	try {
		const results = await fetch(
			`https://api.chucknorris.io/jokes/random?category=${chosenCategory}`
		);

		if (!results.ok) {
			displayJoke.textContent = errorMessage;
			throw new Error("Request failed.");
		}

		const data = await results.json();
		displayJoke.textContent = data.value;
		console.log(data.value);
	} catch (error) {
		displayJoke.textContent = errorMessage;
		console.error(error);
	}
}


document.addEventListener('DOMContentLoaded', function () {
	const logoutBtn = document.getElementById('logout-btn');

	if (logoutBtn) {
		logoutBtn.addEventListener('click', function () {
			localStorage.clear();
			alert('You have been logged out.');
			window.location.href = '/login.html';
		});
	}

	
});
