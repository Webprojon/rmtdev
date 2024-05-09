import {
	searchInputEl,
	searchFormEl,
	jobListSearchEl,
	numberEl,
	BASE_API_URL,
	getData,
} from "../common.js";
import renderError from "./Error.js";
import renderJobList from "./JobList.js";
import renderSpinner from "./Spinner.js";

const submitHandler = async (event) => {
	// prevent default behavior
	event.preventDefault();

	// get search text
	const serachText = searchInputEl.value;

	// validation (regular expression example)
	const forbiddenPattern = /[0-9]/;
	const patternMatch = forbiddenPattern.test(serachText);
	if (patternMatch) {
		renderError("Your search may not contain numbers");
		return;
	}
	// blur input
	searchInputEl.blur();
	// empty
	jobListSearchEl.innerHTML = "";
	// render spinner
	renderSpinner("search");

	// fetch search result
	try {
		const data = await getData(`${BASE_API_URL}/jobs?search=${serachText}`);
		// extact job items
		const { jobItems } = data;
		// remove spinner
		renderSpinner("search");
		// render number of results
		numberEl.textContent = jobItems.length;
		// render job items in search job list
		renderJobList(jobItems);
	} catch (error) {
		renderError(error.message);
		renderSpinner("search");
	}
};
searchFormEl.addEventListener("submit", submitHandler);
