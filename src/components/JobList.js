import {
	jobListSearchEl,
	jobDetailsContentEl,
	BASE_API_URL,
	getData,
	state,
	RESULTS_PER_PAGE,
	jobListBookmarksEl,
} from "../common.js";
import renderError from "./Error.js";
import renderJobDetails from "./JobDetails.js";
import renderSpinner from "./Spinner.js";

const renderJobList = (whichJobList = "search") => {
	// determine correct selector for job list
	const jobListEl =
		whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;

	// remove previous job items
	jobListEl.innerHTML = "";

	// determine the job items that should be rendered
	let jobItems;
	if (whichJobList === "search") {
		jobItems = state.searchJobItems.slice(
			state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
			state.currentPage * RESULTS_PER_PAGE,
		);
	} else {
		jobItems = state.bookmarkJobItems;
	}

	// display job items

	jobItems.map((jobItem) => {
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
											<li class="job-item ${
												state.activeJobItem.id === jobItem.id
													? "job-item--active"
													: ""
											}">
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
		jobListEl.insertAdjacentHTML("beforeend", newJobItemHTML);
	});
};

const clickHandler = async (event) => {
	// prevent default behavior
	event.preventDefault();

	// get clicked job item element
	const jobItemEl = event.target.closest(".job-item");

	// remove active class from previously active job item
	document
		.querySelectorAll(".job-item--active")
		.forEach((jobItemWithActiveClass) =>
			jobItemWithActiveClass.classList.remove("job-item--active"),
		);

	// add active class
	jobItemEl.classList.add("job-item--active");

	// empty the job details section
	jobDetailsContentEl.innerHTML = "";

	// render spinner
	renderSpinner("job-details");

	// get the id
	const id = jobItemEl.children[0].getAttribute("href");

	// update state
	state.activeJobItem = state.searchJobItems.find(
		(jobItem) => jobItem.id === +id,
	);

	// add it to url
	history.pushState(null, "", `/#${id}`);

	// fetch job item data
	try {
		const data = await getData(`${BASE_API_URL}/jobs/${id}`);
		const { jobItem } = data;

		// remove spinner
		renderSpinner("job-details");

		// render job details
		renderJobDetails(jobItem);
	} catch (error) {
		renderError(error.message);
		renderSpinner("job-details");
	}
};

jobListSearchEl.addEventListener("click", clickHandler);

jobListBookmarksEl.addEventListener("click", clickHandler);

export default renderJobList;
