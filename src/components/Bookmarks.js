import {
	jobListBookmarksEl,
	state,
	jobDetailsEl,
	bookmarksBtnEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = (event) => {
	// dont continue if click was outside bookmark button
	if (!event.target.className.includes("bookmark")) return;

	// update state
	if (
		state.bookmarkJobItems.some(
			(bookmarkJobItem) => bookmarkJobItem.id === state.activeJobItem.id,
		)
	) {
		state.bookmarkJobItems = state.bookmarkJobItems.filter(
			(bookmarkJobItem) => bookmarkJobItem.id !== state.activeJobItem.id,
		);
	} else {
		state.bookmarkJobItems.push(state.activeJobItem);
	}

	// update bookmark icon
	document
		.querySelector(".job-info__bookmark-icon")
		.classList.toggle("job-info__bookmark-icon--bookmarked");
};

const mouseEnterHandler = () => {
	// make bookmark button look active
	bookmarksBtnEl.classList.add("bookmarks-btn--active");

	// make job list visible
	jobListBookmarksEl.classList.add("job-list--visible");

	// render bookmarks job list
	renderJobList("bookmark");
};

const mouseLeaveHandler = () => {
	// make bookmark button look inactive
	bookmarksBtnEl.classList.remove("bookmarks-btn--active");

	// make job list invisible
	jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);
