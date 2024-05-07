import {
	searchInputEl,
	searchFormEl,
	spinnerSearchEl,
	jobListSearchEl,
	numberEl,
} from "../common.js";

const submitHandler = (event) => {
	// prevent default behavior
	event.preventDefault();

	// get search text
	const serachText = searchInputEl.value;

	// validation (regular expression example)
	const forbiddenPattern = /[0-9]]/;
	const patternMatch = forbiddenPattern.test(serachText);
	if (patternMatch) {
		errorTextEl.textContent = "Your search may not contain numbers";
		errorEl.classList.add("error--visible");
		setTimeout(() => {
			errorEl.classList.remove("error--visible");
		}, 3500);
		return;
	}

	// blur input
	searchInputEl.blur();

	// empty
	jobListSearchEl.innerHTML = "";

	// render spinner
	spinnerSearchEl.classList.add("spinner--visible");

	// fetch search result
	const fetchingData = async () => {
		try {
			const response = await fetch(
				`https://bytegrad.com/course-assets/js/2/api/jobs?search=${serachText}`,
			);
			if (!response.ok) {
				console.log("Something went wrong");
				return;
			}

			const data = await response.json();
			// extact job items
			const { jobItems } = data;

			// remove spinner
			spinnerSearchEl.classList.remove("spinner--visible");

			// render number of results
			numberEl.textContent = jobItems.length;

			// render job items in search job list
			jobItems.slice(0, 7).map((jobItem) => {
				const {
					id,
					badgeLetters,
					title,
					company,
					duration,
					salary,
					location,
					daysAgo,
				} = jobItem;
				const newJobItemHTML = `
											<li class="job-item">
													<a class="job-item__link" href="${id}">
															<div class="job-item__badge">${badgeLetters}</div>
															<div class="job-item__middle">
																	<h3 class="third-heading">${title}</h3>
																	<p class="job-item__company">${company}</p>
																	<div class="job-item__extras">
																			<p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${duration}</p>
																			<p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${salary}</p>
																			<p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${location}</p>
																	</div>
															</div>
															<div class="job-item__right">
																	<i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
																	<time class="job-item__time">${daysAgo}d</time>
															</div>
													</a>
											</li>
									`;
				jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
			});
		} catch (error) {
			console.log(error.message);
		}
	};
	fetchingData();
};
searchFormEl.addEventListener("submit", submitHandler);
