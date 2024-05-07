import {
	jobListSearchEl,
	jobDetailsContentEl,
	spinnerJobDetailsEl,
} from "../common.js";

const clickHandler = (event) => {
	// prevent default behavior
	event.preventDefault();

	// get clicked job item element
	const jobItemEl = event.target.closest(".job-item");

	// remove active class from previously active job item
	const activeEl = document.querySelector(".job-item--active");
	activeEl?.classList.remove("job-item--active");

	// add active class
	jobItemEl.classList.add("job-item--active");

	// empty the job details section
	jobDetailsContentEl.innerHTML = "";

	// render spinner
	spinnerJobDetailsEl.classList.add("spinner--visible");

	// get the id
	const id = jobItemEl.children[0].getAttribute("href");

	// fetch job item data
	const fetchingData = async () => {
		try {
			const response = await fetch(
				`https://bytegrad.com/course-assets/js/2/api/jobs/${id}`,
			);
			if (!response.ok) {
				console.log("Something went wrong");
				return;
			}
			const data = await response.json();
			const { jobItem } = data;

			// remove spinner
			spinnerJobDetailsEl.classList.remove("spinner--visible");

			// render job details
			const {
				coverImgURL,
				companyURL,
				badgeLetters,
				daysAgo,
				title,
				company,
				description,
				duration,
				salary,
				location,
				qualifications,
				reviews,
			} = jobItem;
			const jobDetailsHTML = `
                <img src="${coverImgURL}" alt="#" class="job-details__cover-img">

                <a class="apply-btn" href="${companyURL}" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>

                <section class="job-info">
                    <div class="job-info__left">
                        <div class="job-info__badge">${badgeLetters}</div>
                        <div class="job-info__below-badge">
                            <time class="job-info__time">${daysAgo}d</time>
                            <button class="job-info__bookmark-btn">
                                <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
                            </button>
                        </div>
                    </div>
                    <div class="job-info__right">
                        <h2 class="second-heading">${title}</h2>
                        <p class="job-info__company">${company}</p>
                        <p class="job-info__description">${description}</p>
                        <div class="job-info__extras">
                            <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> ${duration}</p>
                            <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i> ${salary}</p>
                            <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i> ${location}</p>
                        </div>
                    </div>
                </section>

                <div class="job-details__other">
                    <section class="qualifications">
                        <div class="qualifications__left">
                            <h4 class="fourth-heading">Qualifications</h4>
                            <p class="qualifications__sub-text">Other qualifications may apply</p>
                        </div>
                        <ul class="qualifications__list">
                            ${qualifications
															.map(
																(qualificationText) =>
																	`<li class="qualifications__item">${qualificationText}</li>`,
															)
															.join("")}
                        </ul>
                    </section>
                    
                    <section class="reviews">
                        <div class="reviews__left">
                            <h4 class="fourth-heading">Company reviews</h4>
                            <p class="reviews__sub-text">Recent things people are saying</p>
                        </div>
                        <ul class="reviews__list">
                            ${reviews
															.map(
																(reviewText) =>
																	`<li class="reviews__item">${reviewText}</li>`,
															)
															.join("")}
                        </ul>
                    </section>
                </div>

                <footer class="job-details__footer">
                    <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
                </footer>
            `;
			jobDetailsContentEl.insertAdjacentHTML("beforeend", jobDetailsHTML);
		} catch (error) {
			console.log(error.message);
		}
	};
	fetchingData();
};

jobListSearchEl.addEventListener("click", clickHandler);
