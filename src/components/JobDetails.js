import { jobDetailsContentEl } from "../common.js";

const renderJobDetails = (jobItem) => {
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
};

export default renderJobDetails;
