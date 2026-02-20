/**
 * SOUL RESORT ANIMATIONS
 *
 * This file contains all GSAP animations for the Soul Resort theme.
 * Organized by animation type and page-specific implementations.
 *
 * DEPENDENCIES:
 * - GSAP (loaded via CDN)
 * - ScrollTrigger plugin (loaded via CDN)
 *
 * USAGE:
 * - Import this file in your main theme.js
 * - Call specific animation functions as needed
 */

// ========================================
// HERO ANIMATION SYSTEM
// ========================================

/**
 * Default Hero Animation Configuration
 * Easy to modify animation parameters
 */
const DEFAULT_HERO_ANIMATION_CONFIG = {
	// Timing and Duration
	duration: 2.5, // Main animation duration (seconds)
	ease: "power2.inOut", // Animation easing

	// CirclePath Animation
	circle: {
		startRadius: 15, // Starting circle radius (%) - bigger visible circle at start
		endRadius: 100, // Final circle radius (%) - 100% covers full viewport
		animationStart: 0.1, // When circle animation starts (0-1)
		animationEnd: 1, // When circle animation ends (0-1)
	},

	// Text Scaling Animation
	textScaling: {
		enabled: true, // Enable/disable text scaling
		startScale: 1, // Starting scale (1 = 100%)
		endScale: 0.75, // Final scale (0.75 = 75% of original size)
		animationStart: 0.6, // When text scaling starts (0-1) - starts earlier for longer duration
		animationEnd: 1, // When text scaling ends (0-1)
		ease: "power2.out", // Text scaling easing (can be different from main ease)
	},

	// Performance Settings
	performance: {
		refreshPriority: "auto", // ScrollTrigger refresh priority
		scrub: 1, // Enable scrub with 1 second delay for ultra-smooth scroll
		anticipatePin: 1, // Pin anticipation (for smoother performance)
		fastScrollEnd: true, // Better handling of fast scrolling
		preventOverlaps: true, // Prevent animation overlaps
	},

	// Debug Mode
	debug: false, // Set to true to show ScrollTrigger markers
};

/**
 * Initialize Hero Animation for any page
 *
 * @param {string} pageSelector - CSS selector for the page (e.g., ".accommodation-template")
 * @param {object} customConfig - Optional configuration to override defaults
 * @param {string} heroSectionSelector - Optional custom hero section selector (defaults to ".hero-section")
 */
function initHeroAnimation(
	pageSelector,
	customConfig = {},
	heroSectionSelector = ".hero-section"
) {
	// Check if user is on the specified page
	if (!document.querySelector(pageSelector)) {
		return; // Exit if not on the specified page
	}

	// Check if GSAP and ScrollTrigger are available
	if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
		console.warn("GSAP or ScrollTrigger not loaded. Hero animation skipped.");
		return;
	}

	// Check if mobile device
	const isMobile = window.innerWidth <= 767;

	// Deep merge custom config with defaults
	const config = {
		...DEFAULT_HERO_ANIMATION_CONFIG,
		...customConfig,
		// Ensure nested objects are properly merged
		circle: {
			...DEFAULT_HERO_ANIMATION_CONFIG.circle,
			...(customConfig.circle || {}),
		},
		textScaling: {
			...DEFAULT_HERO_ANIMATION_CONFIG.textScaling,
			...(customConfig.textScaling || {}),
		},
		performance: {
			...DEFAULT_HERO_ANIMATION_CONFIG.performance,
			...(customConfig.performance || {}),
		},
	};

	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger);

	// Get elements with page-specific scope
	const pageContainer = document.querySelector(pageSelector);
	const heroSection = pageContainer.querySelector(heroSectionSelector);
	const heroClippath = pageContainer.querySelector("#hero-clippath");
	const heroContent = pageContainer.querySelector(".hero-content");
	const heroTextBack = pageContainer.querySelector(".hero-text-back");

	// Get text elements for scaling animation
	const heroTitleBlue = pageContainer.querySelector(".hero-title-blue");
	const heroTitleWhite = pageContainer.querySelector(".hero-title-white");

	// Get description elements (only for pages that have them)
	const heroDescriptionBlue = pageContainer.querySelector(
		".hero-description-blue"
	);
	const heroDescriptionWhite = pageContainer.querySelector(
		".hero-description-white"
	);

	// Check if all required elements exist
	if (!heroSection || !heroClippath || !heroContent) {
		console.warn(
			`Required hero animation elements not found in ${pageSelector}.`
		);
		return;
	}

	// Create main timeline with professional GSAP techniques
	const heroTimeline = gsap.timeline({
		scrollTrigger: isMobile
			? null
			: {
					trigger: heroSection,
					start: "top top",
					end: "bottom top", // Animation ends when bottom of section reaches top of viewport
					scrub: config.performance.scrub,
					pin: true,
					pinSpacing: true, // Keep pin spacing for proper layout
					anticipatePin: 1, // PRO HACK: Anticipate pin early for fast-scroll sync
					refreshPriority: "high", // PRO HACK: High priority refresh
					markers: config.debug,
					// PRO HACK: Force recalculation on refresh to prevent desync
					invalidateOnRefresh: true,
					// Professional scrubbing improvements
					fastScrollEnd: true, // PRO HACK: Better handling of fast scrolls
					preventOverlaps: true,
					// Clean scroll trigger without problematic refresh logic
					start: "top top",
					end: "bottom top",
			  },
	});

	// Set initial clippath size (0% - invisible circle)
	gsap.set([heroClippath, heroContent], {
		clipPath: `circle(0% at center)`,
	});

	// Set initial text opacity (invisible)
	gsap.set([heroTitleBlue, heroTitleWhite].filter(Boolean), {
		opacity: 0,
		scale: 0.8,
	});

	// Set initial description opacity (if descriptions exist)
	if (heroDescriptionBlue || heroDescriptionWhite) {
		gsap.set([heroDescriptionBlue, heroDescriptionWhite].filter(Boolean), {
			opacity: 0,
			scale: 0.9,
			y: 20,
		});
	}

	// Entrance animation: smoothly scale from 0% to startRadius
	gsap.to([heroClippath, heroContent], {
		duration: 1.2,
		clipPath: isMobile
			? `circle(100% at center)`
			: `circle(${config.circle.startRadius}% at center)`,
		ease: "power2.out",
		delay: 0.3, // Small delay for smooth page load
	});

	// Entrance animation for text: fade in and scale up
	gsap.to([heroTitleBlue, heroTitleWhite].filter(Boolean), {
		duration: 1.2,
		opacity: 1,
		scale: 1,
		ease: "power2.out",
		delay: 0.5, // Slightly after circle starts
	});

	// Entrance animation for descriptions (if they exist)
	if (heroDescriptionBlue || heroDescriptionWhite) {
		gsap.to([heroDescriptionBlue, heroDescriptionWhite].filter(Boolean), {
			duration: 1.4,
			opacity: 1,
			scale: 1,
			y: 0,
			ease: "power2.out",
			delay: 0.8, // After title animation starts
		});
	}

	// Mobile-only: Smooth circle expansion to full size after entrance
	if (isMobile) {
		gsap.to([heroClippath, heroContent], {
			duration: 2.5,
			clipPath: `circle(100% at center)`,
			ease: "power2.inOut",
			delay: 1.5, // Start after entrance animations complete
		});
	}

	// Animate both background image and white text clippath together with smooth interpolation
	// Only run scroll-triggered animations on non-mobile devices
	if (!isMobile) {
		heroTimeline
			.to(
				heroClippath,
				{
					duration: config.duration,
					clipPath: `circle(${config.circle.endRadius}% at center)`,
					ease: config.ease,
					// Professional animation properties
					overwrite: "auto",
					immediateRender: false,
				},
				config.circle.animationStart
			)
			.to(
				heroContent,
				{
					duration: config.duration,
					clipPath: `circle(${config.circle.endRadius}% at center)`,
					ease: config.ease,
					// Professional animation properties
					overwrite: "auto",
					immediateRender: false,
				},
				config.circle.animationStart
			);
	}

	// Add text scaling animation if enabled with smooth momentum
	// Only run scroll-triggered text scaling on non-mobile devices
	if (config.textScaling.enabled && !isMobile) {
		// Create array of text elements that exist (titles)
		const textElements = [heroTitleBlue, heroTitleWhite].filter(Boolean);
		// Create array of description elements that exist
		const descriptionElements = [
			heroDescriptionBlue,
			heroDescriptionWhite,
		].filter(Boolean);

		if (textElements.length > 0) {
			// Scale down both blue and white text simultaneously with professional properties
			heroTimeline.to(
				textElements,
				{
					duration:
						config.duration *
						(config.textScaling.animationEnd -
							config.textScaling.animationStart),
					scale: config.textScaling.endScale,
					ease: config.textScaling.ease,
					transformOrigin: "center center", // Scale from center
					// Professional animation properties for smooth scrubbing
					overwrite: "auto",
					immediateRender: false,
					// Add momentum to text scaling
					onUpdate: function () {
						// Ensure smooth interpolation during scrubbing
						gsap.set(textElements, {
							willChange: "transform",
						});
					},
				},
				config.textScaling.animationStart
			);
		}

		// Scale down descriptions if they exist (slightly less scaling for better readability)
		if (descriptionElements.length > 0) {
			heroTimeline.to(
				descriptionElements,
				{
					duration:
						config.duration *
						(config.textScaling.animationEnd -
							config.textScaling.animationStart),
					scale: config.textScaling.endScale + 0.1, // Slightly less scaling than titles
					ease: config.textScaling.ease,
					transformOrigin: "center center",
					overwrite: "auto",
					immediateRender: false,
					onUpdate: function () {
						gsap.set(descriptionElements, {
							willChange: "transform",
						});
					},
				},
				config.textScaling.animationStart + 0.1 // Start slightly after titles
			);
		}
	}

	// Only refresh on window resize (essential for responsive behavior)
	let resizeTimer;
	window.addEventListener("resize", function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			// Only refresh on actual resize, not on scroll
			if (typeof ScrollTrigger !== "undefined") {
				ScrollTrigger.refresh();
			}
		}, 250); // Longer delay to prevent frequent refreshes
	});

	// Log animation initialization (can be removed in production)
	if (config.debug) {
		console.log(`Hero Animation Initialized for ${pageSelector}`, {
			config: config,
			elements: { heroSection, heroClippath, heroContent },
		});
	}

	// Return cleanup function to prevent memory leaks
	return () => {
		// Cleanup resize timer
		clearTimeout(resizeTimer);
	};
}

// ========================================
// SERENE TITLE ANIMATION SYSTEM
// ========================================

/**
 * Default Serene Title Animation Configuration
 */
const DEFAULT_SERENE_TITLE_CONFIG = {
	start: "top bottom+=50vh", // when serene section is 50vh below viewport
	middle: "center center", // when lines meet at center (exact screen middle)
	end: "bottom top", // when section leaves viewport
	scrub: true, // clamp precisely at center (no momentum)
	debug: false,
};

/**
 * Initialize Serene Title Animation
 *
 * @param {string} pageSelector - CSS selector for the page
 * @param {object} customConfig - Optional configuration to override defaults
 */
function initSereneTitleAnimation(pageSelector, customConfig = {}) {
	// Ensure page exists
	const page = document.querySelector(pageSelector);
	if (!page) return;

	// Check if mobile device - skip animation on mobile
	const isMobile = window.innerWidth <= 767;
	if (isMobile) {
		return; // Exit early on mobile devices
	}

	if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
		console.warn(
			"GSAP/ScrollTrigger not available for Serene Title animation."
		);
		return;
	}

	gsap.registerPlugin(ScrollTrigger);

	const sereneSection = page.querySelector(".serene-section");
	const sereneTitle = sereneSection
		? sereneSection.querySelector(".serene-title")
		: null;
	const firstLine = sereneTitle
		? sereneTitle.querySelector(".first_line")
		: null;
	const secondLine = sereneTitle
		? sereneTitle.querySelector(".second_line")
		: null;

	if (!sereneSection || !sereneTitle || !firstLine || !secondLine) {
		return;
	}

	const cfg = { ...DEFAULT_SERENE_TITLE_CONFIG, ...customConfig };

	// Initial positions: first line from left, second line from right
	gsap.set(firstLine, { xPercent: -110 });
	gsap.set(secondLine, { xPercent: 110 });

	// Create timeline for continuous movement
	const timeline = gsap.timeline({
		scrollTrigger: {
			trigger: sereneSection,
			start: cfg.start,
			end: cfg.end,
			scrub: cfg.scrub,
			markers: cfg.debug,
			invalidateOnRefresh: true,
			fastScrollEnd: true,
		},
	});

	// Continuous movement: Lines enter from sides and continue to opposite sides
	timeline
		.to(firstLine, { xPercent: 110, ease: "none" }, 0) // Left to Right continuously
		.to(secondLine, { xPercent: -110, ease: "none" }, 0); // Right to Left continuously
}





// ========================================
// IMMUNITY SECTION ANIMATION SYSTEM
// ========================================

/**
 * Default Immunity Section Animation Configuration
 */
const DEFAULT_IMMUNITY_CONFIG = {
	start: "top center", // Start when section top reaches center
	end: "bottom center", // End when section bottom reaches center
	scrub: 1, // Smooth scrubbing
	debug: false,
	// Content transition timing
	firstContentStart: 0.25, // First content appears at 25% of scroll
	firstContentEnd: 0.5, // First content disappears at 50% of scroll
	secondContentStart: 0.5, // Second content appears at 50% of scroll
	secondContentEnd: 0.75, // Second content disappears at 75% of scroll
	contentHideEnd: 1, // Content wrapper hides at end of section
	// Image movement speed
	imageMoveSpeed: 0.8, // How fast side images move (0.5 = slower, 1.5 = faster)
};

/**
 * Initialize Immunity Section Animation
 *
 * @param {string} pageSelector - CSS selector for the page
 * @param {object} customConfig - Optional configuration to override defaults
 */
function initImmunitySectionAnimation(pageSelector, customConfig = {}) {
	console.log("🔍 initImmunitySectionAnimation called for:", pageSelector);

	// Ensure page exists
	const page = document.querySelector(pageSelector);
	if (!page) {
		console.warn("❌ Page not found:", pageSelector);
		return;
	}
	console.log("✅ Page found:", page);

	// Check if mobile device - skip animation on mobile
	const isMobile = window.innerWidth <= 767;
	if (isMobile) {
		return; // Exit early on mobile devices
	}

	if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
		console.warn(
			"GSAP/ScrollTrigger not available for Immunity Section animation."
		);
		return;
	}

	gsap.registerPlugin(ScrollTrigger);

	const immunitySection = page.querySelector(".immunity_section");
	const contentWrapper = immunitySection
		? immunitySection.querySelector(".content_wrapper")
		: null;
	const firstItem = contentWrapper
		? contentWrapper.querySelector(".single_item.first")
		: null;
	const secondItem = contentWrapper
		? contentWrapper.querySelector(".single_item.second")
		: null;
	const leftImages = immunitySection
		? immunitySection.querySelectorAll(".img_wrapper.left")
		: null;
	const rightImages = immunitySection
		? immunitySection.querySelectorAll(".img_wrapper.right")
		: null;

	if (!immunitySection || !contentWrapper || !firstItem || !secondItem) {
		console.warn("❌ Required immunity section elements not found:", {
			immunitySection: !!immunitySection,
			contentWrapper: !!contentWrapper,
			firstItem: !!firstItem,
			secondItem: !!secondItem,
		});
		return;
	}
	console.log("✅ All required elements found:", {
		immunitySection,
		contentWrapper,
		firstItem,
		secondItem,
	});

	const cfg = { ...DEFAULT_IMMUNITY_CONFIG, ...customConfig };

	// Set initial states - Keep content visible initially
	gsap.set(firstItem, { opacity: 0 });
	gsap.set(secondItem, { opacity: 0 });
	gsap.set(contentWrapper, { opacity: 1 }); // Ensure content wrapper is visible

	// Animate first item to appear at 25% scroll of immunity section
	ScrollTrigger.create({
		trigger: immunitySection,
		start: "top+=20% center", // Appears when user scrolls 25% into the section
		end: "top+=35% center", // Disappears when user scrolls 50% into the section
		markers: cfg.debug,
		onEnter: () => {
			console.log("🚀 First item APPEARING (at 25% scroll)");
			gsap.to(firstItem, {
				opacity: 1,
				//y: 0,
				duration: 0.2,
				//ease: "power2.out",
			});
		},
		onLeave: () => {
			console.log("👋 First item DISAPPEARING (at 50% scroll)");
			gsap.to(firstItem, {
				opacity: 0,
				//y: -30,
				duration: 0.2,
				//ease: "power2.in",
			});
		},
		onEnterBack: () => {
			console.log("🔄 First item REAPPEARING (scrolling back)");
			gsap.to(firstItem, {
				opacity: 1,
				//y: 0,
				duration: 0.2,
				//ease: "power2.out",
			});
		},
		onLeaveBack: () => {
			console.log("⬅️ First item HIDING (scrolling back past 25%)");
			gsap.to(firstItem, {
				opacity: 0,
				//y: 30,
				duration: 0.2,
				//ease: "power2.in",
			});
		},
	});

	// Animate second item to appear at 50% scroll of immunity section
	ScrollTrigger.create({
		trigger: immunitySection,
		start: "top+=70% center", // Appears when user scrolls 50% into the section
		end: "top+=80% center", // Disappears when user scrolls 75% into the section
		markers: cfg.debug,
		onEnter: () => {
			console.log("🚀 Second item APPEARING (at 50% scroll)");
			gsap.to(secondItem, {
				opacity: 1,
				//y: 0,
				duration: 0.8,
				//ease: "power2.out",
			});
		},
		onLeave: () => {
			console.log("👋 Second item DISAPPEARING (at 75% scroll)");
			gsap.to(secondItem, {
				opacity: 0,
				//y: -30,
				duration: 0.4,
				//ease: "power2.in",
			});
		},
		onEnterBack: () => {
			console.log("🔄 Second item REAPPEARING (scrolling back)");
			gsap.to(secondItem, {
				opacity: 1,
				//y: 0,
				duration: 0.4,
				//ease: "power2.out",
			});
		},
		onLeaveBack: () => {
			console.log("⬅️ Second item HIDING (scrolling back past 50%)");
			gsap.to(secondItem, {
				opacity: 0,
				//y: 30,
				duration: 0.4,
				//ease: "power2.in",
			});
		},
	});

	// Hide content wrapper when reaching end of immunity section
	ScrollTrigger.create({
		trigger: immunitySection,
		start: "bottom center", // When section bottom reaches center of viewport
		end: "bottom top", // When section bottom reaches top of viewport
		markers: cfg.debug,
		onEnter: () => {
			console.log(
				"🚀 ScrollTrigger ENTERED end of immunity section - HIDING CONTENT"
			);
			// Hide content wrapper when reaching end of section
			gsap.to(contentWrapper, {
				opacity: 0,
				//y: -50,
				duration: 0.8,
				//ease: "power2.inOut",
			});
		},
		onLeaveBack: () => {
			console.log(
				"🔄 ScrollTrigger LEFT BACK end of immunity section - SHOWING CONTENT"
			);
			// Show content wrapper when scrolling back up
			gsap.to(contentWrapper, {
				opacity: 1,
				//y: 0,
				duration: 0.4,
				//ease: "power2.out",
			});
		},
	});

	// Side images move normally (not pinned)
	if (leftImages && rightImages) {
		// Create separate timeline for images (no pinning)
		const imageTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: immunitySection,
				start: "top center", // Fixed start position
				end: "bottom center", // Fixed end position
				scrub: cfg.scrub,
				markers: false, // No markers for images
				invalidateOnRefresh: false, // Prevent invalidation issues
				refreshPriority: "high", // High priority refresh
				fastScrollEnd: true, // Better fast scroll handling
			},
		});

		// Left images move up and fade slightly
		leftImages.forEach((img, index) => {
			const moveDistance = (index + 1) * 20; // Different distance for each image
			imageTimeline.to(
				img,
				{
					y: -moveDistance * cfg.imageMoveSpeed,
					opacity: 0.8,
					ease: "power1.out",
				},
				0
			);
		});

		// Right images move down and fade slightly
		rightImages.forEach((img, index) => {
			const moveDistance = (index + 1) * 20; // Different distance for each image
			imageTimeline.to(
				img,
				{
					y: moveDistance * cfg.imageMoveSpeed,
					opacity: 0.8,
					ease: "power1.out",
				},
				0
			);
		});
	}

	// Log animation initialization
	if (cfg.debug) {
		console.log("Immunity Section Animation Initialized", {
			config: cfg,
			elements: { immunitySection, contentWrapper, firstItem, secondItem },
		});

		// Test if ScrollTrigger is working
		console.log("🔍 ScrollTrigger instances:", ScrollTrigger.getAll().length);
		console.log("🔍 Current ScrollTrigger instances:", ScrollTrigger.getAll());

		// Force refresh to keep markers visible
		setTimeout(() => {
			if (typeof ScrollTrigger !== "undefined") {
				ScrollTrigger.refresh();
				console.log("🔄 Forced ScrollTrigger refresh to keep markers visible");
			}
		}, 100);
	}
}

/**
 * Wait for GSAP to load before initializing immunity section animation
 */
function waitForGSAPAndInitImmunity(pageSelector, customConfig) {
	if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
		initImmunitySectionAnimation(pageSelector, customConfig);
	} else {
		setTimeout(
			() => waitForGSAPAndInitImmunity(pageSelector, customConfig),
			100
		);
	}
}






// ========================================
// WELLNESS SECTION ANIMATION SYSTEM
// ========================================

/**
 * Default Wellness Section Animation Configuration
 */
const DEFAULT_WELLNESS_CONFIG = {
	start: "top center",
	end: "bottom center",
	scrub: 1,
	debug: false,
	contentGap: 0.3,
	imageMoveSpeed: 0.8,
	// Text appearance/disappearance offsets
	textAppearOffset: 200, // Text appears 200px after section top
	textDisappearOffset: 100, // Text disappears 100px before section bottom
};

/**
 * Initialize Wellness Section Animation
 * Similar to immunity section animation but adapted for wellness section structure
 *
 * @param {string} pageSelector - CSS selector for the page
 * @param {object} customConfig - Optional configuration to override defaults
 */
function initWellnessSectionAnimation(pageSelector, customConfig = {}) {
	console.log("🌿 initWellnessSectionAnimation called for:", pageSelector);

	const page = document.querySelector(pageSelector);
	if (!page) {
		console.warn("❌ Page not found:", pageSelector);
		return;
	}
	console.log("✅ Page found:", page);

	// Skip animation on mobile devices
	const isMobile = window.innerWidth <= 767;
	if (isMobile) {
		console.log("📱 Skipping wellness animation on mobile");
		return;
	}

	if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
		console.warn("GSAP/ScrollTrigger not available for Wellness Section animation.");
		return;
	}

	gsap.registerPlugin(ScrollTrigger);

	// Get wellness section elements
	const wellnessSection = page.querySelector(".wellness-section");
	const wellnessContent = wellnessSection ? wellnessSection.querySelector(".wellness-content") : null;
	const wellnessTitle = wellnessContent ? wellnessContent.querySelector(".wellness-title") : null;
	const wellnessDescription = wellnessContent ? wellnessContent.querySelector(".wellness-description") : null;
	
	// Get image elements
	const topImage = wellnessSection ? wellnessSection.querySelector(".wellness-left") : null;
	const bottomImage = wellnessSection ? wellnessSection.querySelector(".wellness-right") : null;

	if (!wellnessSection || !wellnessContent || !wellnessTitle || !wellnessDescription) {
		console.warn("❌ Required wellness section elements not found:", {
			wellnessSection: !!wellnessSection,
			wellnessContent: !!wellnessContent,
			wellnessTitle: !!wellnessTitle,
			wellnessDescription: !!wellnessDescription,
		});
		return;
	}
	console.log("✅ All required wellness elements found");

	const cfg = { ...DEFAULT_WELLNESS_CONFIG, ...customConfig };

	// Set initial states - Content HIDDEN initially
	gsap.set(wellnessTitle, { opacity: 0 });
	gsap.set(wellnessDescription, { opacity: 0 });
	gsap.set(wellnessContent, { opacity: 0 });

	// Text appears 200px after section top enters viewport
	ScrollTrigger.create({
		trigger: wellnessSection,
		start: `top+=${cfg.textAppearOffset}px center`,
		end: `bottom-=${cfg.textDisappearOffset}px center`,
		markers: cfg.debug,
		onEnter: () => {
			console.log("🌿 Text APPEARING (200px after section top)");
			gsap.to(wellnessContent, {
				opacity: 1,
				duration: 0.8,
				ease: "power2.out",
			});
			gsap.to([wellnessTitle, wellnessDescription], {
				opacity: 1,
				//y: 0,
				duration: 1.2,
				ease: "power2.out",
				stagger: 0.15,
			});
		},
		onLeave: () => {
			console.log("🌿 Text DISAPPEARING (100px before section bottom)");
			gsap.to([wellnessTitle, wellnessDescription], {
				opacity: 0,
				//y: -30,
				duration: 0.6,
				ease: "power2.in",
				stagger: 0.1,
			});
		},
		onEnterBack: () => {
			console.log("🌿 Text REAPPEARING (scrolling back)");
			gsap.to(wellnessContent, {
				opacity: 1,
				duration: 1.2,
				ease: "power2.out",
			});
			gsap.to([wellnessTitle, wellnessDescription], {
				opacity: 1,
				//y: 0,
				duration: 0.8,
				ease: "power2.out",
				stagger: 0.15,
			});
		},
		onLeaveBack: () => {
			console.log("🌿 Text HIDING (scrolling back past start)");
			gsap.to([wellnessTitle, wellnessDescription], {
				opacity: 0,
				//y: 30,
				duration: 0.6,
				ease: "power2.in",
				stagger: 0.1,
			});
		},
	});

	// Animate images if they exist
	if (topImage || bottomImage) {
		const imageTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: wellnessSection,
				start: cfg.start,
				end: cfg.end,
				scrub: cfg.scrub,
				markers: false,
				invalidateOnRefresh: false,
				refreshPriority: "high",
				fastScrollEnd: true,
			},
		});

		// Top image moves up and fades slightly
		if (topImage) {
			imageTimeline.to(
				topImage,
				{
					y: -40 * cfg.imageMoveSpeed,
					opacity: 0.85,
					ease: "power1.out",
				},
				0
			);
		}

		// Bottom image moves down and fades slightly
		if (bottomImage) {
			imageTimeline.to(
				bottomImage,
				{
					y: 40 * cfg.imageMoveSpeed,
					opacity: 0.85,
					ease: "power1.out",
				},
				0
			);
		}
	}

	// Log animation initialization
	if (cfg.debug) {
		console.log("Wellness Section Animation Initialized", {
			config: cfg,
			elements: { wellnessSection, wellnessContent, wellnessTitle, wellnessDescription },
		});

		console.log("🔍 ScrollTrigger instances:", ScrollTrigger.getAll().length);
		console.log("🔍 Current ScrollTrigger instances:", ScrollTrigger.getAll());

		setTimeout(() => {
			if (typeof ScrollTrigger !== "undefined") {
				ScrollTrigger.refresh();
				console.log("🔄 Forced ScrollTrigger refresh to keep markers visible");
			}
		}, 100);
	}

	console.log("✅ Wellness section animation initialized");
}

/**
 * Wait for GSAP to load before initializing wellness section animation
 */
function waitForGSAPAndInitWellness(pageSelector, customConfig) {
	if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
		initWellnessSectionAnimation(pageSelector, customConfig);
	} else {
		setTimeout(() => waitForGSAPAndInitWellness(pageSelector, customConfig), 100);
	}
}

// Export functions for use in main theme.js
window.initWellnessSectionAnimation = initWellnessSectionAnimation;
window.waitForGSAPAndInitWellness = waitForGSAPAndInitWellness;









// Add this section to your animations.js file, after the IMMUNITY SECTION ANIMATION SYSTEM

// ========================================
// SERENE BOTTOM IMAGE ANIMATION SYSTEM
// ========================================

/**
 * Default Serene Bottom Image Animation Configuration
 */
const DEFAULT_SERENE_IMAGE_CONFIG = {
	start: "top bottom", // Start when section top enters viewport
	end: "bottom top", // End when section bottom leaves viewport
	
	// Upper Middle Image Settings
	upperMiddleImage: {
		enabled: true, // Enable/disable upper middle image animation
		moveDistance: 5, // Distance to move down (positive = down, negative = up)
		ease: "none", // Animation easing
	},
	
	// Upper Right Image Settings
	upperRightImage: {
		enabled: true, // Enable/disable upper right image animation
		moveDistance: -5, // Distance to move up (negative = up, positive = down)
		ease: "none", // Animation easing
	},
	
	// Bottom Middle Image Settings
	middleImage: {
		enabled: true, // Enable/disable middle image animation
		moveDistance: -100, // Distance to move up (negative = up, positive = down)
		ease: "none", // Animation easing
	},
	
	// Bottom Left Image Settings
	leftImage: {
		enabled: true, // Enable/disable left image animation
		moveDistance: -5, // Distance to move up (can be different from middle)
		ease: "none", // Animation easing
	},
	
	scrub: 1, // Smooth scrubbing
	debug: false,
};

/**
 * Initialize Serene Bottom Images Animation
 * Shifts both the middle and left images up smoothly as user scrolls through the section
 * Each image can have independent movement settings
 *
 * @param {string} pageSelector - CSS selector for the page
 * @param {object} customConfig - Optional configuration to override defaults
 */
function initSereneBottomImageAnimation(pageSelector, customConfig = {}) {
	// Ensure page exists
	const page = document.querySelector(pageSelector);
	if (!page) return;

	// Check if mobile device - skip animation on mobile
	const isMobile = window.innerWidth <= 767;
	if (isMobile) {
		return; // Exit early on mobile devices
	}

	if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
		console.warn("GSAP/ScrollTrigger not available for Serene Image animation.");
		return;
	}

	gsap.registerPlugin(ScrollTrigger);

	const sereneSection = page.querySelector(".serene-section");
	
	// Upper section images
	const upperMiddleImage = sereneSection
		? sereneSection.querySelector(".serene-upper-middle-img")
		: null;
	const upperRightImage = sereneSection
		? sereneSection.querySelector(".serene-upper-right-img")
		: null;
	
	// Bottom section images
	const middleImage = sereneSection
		? sereneSection.querySelector(".serene-bottom-middle-img")
		: null;
	const leftImage = sereneSection
		? sereneSection.querySelector(".serene-bottom-left-img")
		: null;

	if (!sereneSection) {
		return;
	}

	// Deep merge custom config with defaults
	const cfg = {
		...DEFAULT_SERENE_IMAGE_CONFIG,
		...customConfig,
		upperMiddleImage: {
			...DEFAULT_SERENE_IMAGE_CONFIG.upperMiddleImage,
			...(customConfig.upperMiddleImage || {}),
		},
		upperRightImage: {
			...DEFAULT_SERENE_IMAGE_CONFIG.upperRightImage,
			...(customConfig.upperRightImage || {}),
		},
		middleImage: {
			...DEFAULT_SERENE_IMAGE_CONFIG.middleImage,
			...(customConfig.middleImage || {}),
		},
		leftImage: {
			...DEFAULT_SERENE_IMAGE_CONFIG.leftImage,
			...(customConfig.leftImage || {}),
		},
	};

	// Animate upper middle image if it exists and is enabled (moves DOWN)
	if (upperMiddleImage && cfg.upperMiddleImage.enabled) {
		gsap.to(upperMiddleImage, {
			y: cfg.upperMiddleImage.moveDistance,
			ease: cfg.upperMiddleImage.ease,
			scrollTrigger: {
				trigger: sereneSection,
				start: cfg.start,
				end: cfg.end,
				scrub: cfg.scrub,
				markers: cfg.debug,
				invalidateOnRefresh: true,
				fastScrollEnd: true,
				id: "serene-upper-middle-img", // Unique ID for debugging
			},
		});
	}

	// Animate upper right image if it exists and is enabled (moves UP)
	if (upperRightImage && cfg.upperRightImage.enabled) {
		gsap.to(upperRightImage, {
			y: cfg.upperRightImage.moveDistance,
			ease: cfg.upperRightImage.ease,
			scrollTrigger: {
				trigger: sereneSection,
				start: cfg.start,
				end: cfg.end,
				scrub: cfg.scrub,
				markers: cfg.debug,
				invalidateOnRefresh: true,
				fastScrollEnd: true,
				id: "serene-upper-right-img", // Unique ID for debugging
			},
		});
	}

	// Animate bottom middle image if it exists and is enabled
	if (middleImage && cfg.middleImage.enabled) {
		gsap.to(middleImage, {
			y: cfg.middleImage.moveDistance,
			ease: cfg.middleImage.ease,
			scrollTrigger: {
				trigger: sereneSection,
				start: cfg.start,
				end: cfg.end,
				scrub: cfg.scrub,
				markers: cfg.debug,
				invalidateOnRefresh: true,
				fastScrollEnd: true,
				id: "serene-bottom-middle-img", // Unique ID for debugging
			},
		});
	}

	// Animate bottom left image if it exists and is enabled
	if (leftImage && cfg.leftImage.enabled) {
		gsap.to(leftImage, {
			y: cfg.leftImage.moveDistance,
			ease: cfg.leftImage.ease,
			scrollTrigger: {
				trigger: sereneSection,
				start: cfg.start,
				end: cfg.end,
				scrub: cfg.scrub,
				markers: cfg.debug,
				invalidateOnRefresh: true,
				fastScrollEnd: true,
				id: "serene-bottom-left-img", // Unique ID for debugging
			},
		});
	}

	// Log animation initialization
	if (cfg.debug) {
		console.log("Serene Images Animation Initialized", {
			config: cfg,
			elements: { 
				sereneSection,
				upperMiddleImage: upperMiddleImage ? "found" : "not found",
				upperRightImage: upperRightImage ? "found" : "not found",
				middleImage: middleImage ? "found" : "not found", 
				leftImage: leftImage ? "found" : "not found" 
			},
		});
	}
}

/**
 * Wait for GSAP to load before initializing serene image animation
 */
function waitForGSAPAndInitSereneImage(pageSelector, customConfig) {
	if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
		initSereneBottomImageAnimation(pageSelector, customConfig);
	} else {
		setTimeout(
			() => waitForGSAPAndInitSereneImage(pageSelector, customConfig),
			100
		);
	}
}

// ========================================
// UPDATE THE EXPORT SECTION AT THE BOTTOM
// ========================================
// Add these lines to the existing export section:

window.initSereneBottomImageAnimation = initSereneBottomImageAnimation;
window.waitForGSAPAndInitSereneImage = waitForGSAPAndInitSereneImage;



// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Wait for GSAP to load before initializing animations
 */
function waitForGSAPAndInit(pageSelector, customConfig, heroSectionSelector) {
	if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
		initHeroAnimation(pageSelector, customConfig, heroSectionSelector);
	} else {
		// Retry after a short delay if GSAP isn't loaded yet
		setTimeout(
			() => waitForGSAPAndInit(pageSelector, customConfig, heroSectionSelector),
			100
		);
	}
}

/**
 * Wait for GSAP to load before initializing serene title animation
 */
function waitForGSAPAndInitSerene(pageSelector, customConfig) {
	if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
		initSereneTitleAnimation(pageSelector, customConfig);
	} else {
		setTimeout(() => waitForGSAPAndInitSerene(pageSelector, customConfig), 100);
	}
}

/**
 * Initialize all hero animations (for re-init after ScrollTrigger kill)
 */
function initAllHeroAnimations() {
	// Re-init Accommodation Template Animation
	if (document.querySelector(".accommodation-template")) {
		initHeroAnimation(".accommodation-template", {
			debug: false, // Disable debug for production
			duration: 2.5,
			textScaling: {
				enabled: true,
				endScale: 0.7, // Scale down to 70%
				animationStart: 0.5, // Start scaling when image is 50% expanded (longer duration)
			},
		});

		// Re-init Serene Title animation
		initSereneTitleAnimation(".accommodation-template");
	}

	// Re-init Ayurveda Template Animation
	if (document.querySelector(".ayurveda-template")) {
		initHeroAnimation(".ayurveda-template", {
			debug: false, // Disable debug for production
			duration: 3, // Slightly slower animation
			ease: "power2.out",
			textScaling: {
				enabled: true,
				endScale: 0.75, // Scale down to 75%
				animationStart: 0.4, // Start scaling when image is 40% expanded (much longer duration)
				ease: "power3.out", // Different easing for text
			},
		});
	}

	// Re-init About Us Template Animation
	if (document.querySelector(".aboutus-template")) {
		initHeroAnimation(".aboutus-template", {
			debug: false, // Disable debug for production
			duration: 2.8, // Medium animation speed
			ease: "power2.inOut",
			textScaling: {
				enabled: true,
				endScale: 0.8, // Scale down to 80% (less dramatic)
				animationStart: 0.55, // Start scaling when image is 55% expanded
				ease: "power2.out", // Smooth easing for text
			},
		});
	}

	// Re-init Rooms Template Animation
	if (document.querySelector(".rooms-template")) {
		initHeroAnimation(".rooms-template", {
			debug: false, // Disable debug for production
			duration: 2.5,
			ease: "power2.inOut",
			textScaling: {
				enabled: true,
				endScale: 0.7, // Scale down to 70%
				animationStart: 0.5, // Start scaling when image is 50% expanded
			},
		});
	}

	// Re-init Immunity Section Animation for Ayurveda page
	if (document.querySelector(".ayurveda-template")) {
		initImmunitySectionAnimation(".ayurveda-template", {
			debug: false, // Disable debug for production
		});
	}
}

// ========================================
// EXPORT FUNCTIONS FOR USE IN MAIN THEME.JS
// ========================================

// Make functions available globally
window.initHeroAnimation = initHeroAnimation;
window.initSereneTitleAnimation = initSereneTitleAnimation;
window.initImmunitySectionAnimation = initImmunitySectionAnimation;
window.waitForGSAPAndInit = waitForGSAPAndInit;
window.waitForGSAPAndInitSerene = waitForGSAPAndInitSerene;
window.waitForGSAPAndInitImmunity = waitForGSAPAndInitImmunity;
window.initAllHeroAnimations = initAllHeroAnimations;
