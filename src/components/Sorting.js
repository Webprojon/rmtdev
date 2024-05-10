import {
	sortingEl,
	sortingBtnRelevantEl,
	sortingBtnRecentEl,
	state,
} from "../common.js";
import renderJobList from "./JobList.js";
import renderPaginationButton from "./Pagination.js";

const clickHandler = (event) => {
	// get clicked button element
	const clickedButtonEl = event.target.closest(".sorting__button");

	// stop function if no clicked button element
	if (!clickedButtonEl) return;

	// update state (reset to page 1)
	state.currentPage = 1;

	// check is intention is recent or relevent sorting
	const recent = clickedButtonEl.className.includes("--recent") ? true : false;

	// make sorting button active
	if (recent) {
		sortingBtnRecentEl.classList.add("sorting__button--active");
		sortingBtnRelevantEl.classList.remove("sorting__button--active");
	} else {
		sortingBtnRecentEl.classList.remove("sorting__button--active");
		sortingBtnRelevantEl.classList.add("sorting__button--active");
	}

	// sort job items
	if (recent) {
		state.searchJobItems.sort((a, b) => {
			return a.daysAgo - b.daysAgo;
		});
	} else {
		state.searchJobItems.sort((a, b) => {
			return b.relevanceScore - a.relevanceScore;
		});
	}

	// reset pagination buttons
	renderPaginationButton();

	// render job items in list
	renderJobList();
};

sortingEl.addEventListener("click", clickHandler);
