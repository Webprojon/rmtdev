"use strict";

// GLOBAL SELECTORS
const bookmarksBtnEl = document.querySelector(".bookmarks-btn");
const errorEl = document.querySelector(".error");
const errorTextEl = document.querySelector(".error__text");
const jobDetailsEl = document.querySelector(".job-details");
const jobDetailsContentEl = document.querySelector(".job-details__content");
const jobListBookmarksEl = document.querySelector(".job-list--bookmarks");
const jobListSearchEl = document.querySelector(".job-list--search");
const numberEl = document.querySelector(".count__number");
const paginationEl = document.querySelector(".pagination");
const paginationBtnNextEl = document.querySelector(".pagination__button--next");
const paginationBtnBackEl = document.querySelector(".pagination__button--back");
const paginationNumberNextEl = document.querySelector(
	".pagination__number--next",
);
const paginationNumberBackEl = document.querySelector(
	".pagination__number--back",
);
const searchFormEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search__input");
const sortingEl = document.querySelector(".sorting");
const sortingBtnRelevantEl = document.querySelector(
	".sorting__button--relevant",
);
const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
const spinnerSearchEl = document.querySelector(".spinner--search");
const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");

// EVENTS & FUNCTIONS

// *** SERACH COMPONENTS ***
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
			console.log(jobItems);

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
