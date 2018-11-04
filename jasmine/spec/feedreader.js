/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

	describe('RSS Feeds', function () {
		/* Test to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* Test that loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */
		it('has URL', function () {
			for (const feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			}

		});

		/* Test that loops through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */
		it('has name', function () {
			for (const feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			}

		});
	});

	describe('The menu', function () {

		/* Test that ensures the menu element is hidden by default.
         */
		it('should be hidden', function () {
			const isHidden = document.body.classList.contains('menu-hidden');
			expect(isHidden).toBe(true);
		});

	    /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
		it('should show and hide when 🍔 is clicked', function () {
			const $menuIcon = $('.menu-icon-link');
			$menuIcon.click();
			let isHidden = document.body.classList.contains('menu-hidden');
			expect(isHidden).toBe(false);
			$menuIcon.click();
			isHidden = document.body.classList.contains('menu-hidden');
			expect(isHidden).toBe(true);
		});
	});

	describe('Initial Entries', function () {

		/* Test that ensures when the loadFeed function is
         * called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

		it('should have stuff', function (done) {
			loadFeed(0, function () {
				const entries = document.querySelectorAll('.feed .entry');
				expect(entries.length).toBeGreaterThan(0);
				done();
			})
		});
	});

	describe('New Feed Selection', function () {

		/* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
		it('should load new feeds', function (done) {
			const feedContainer = document.querySelector('.feed');
			loadFeed(0, function () {
				const beforeHTML = feedContainer.innerHTML;
				loadFeed(1, function () {
					const afterHTML = feedContainer.innerHTML;
					expect(afterHTML).not.toBe(beforeHTML);
					done();
				});
			});
		});

	});
}());
