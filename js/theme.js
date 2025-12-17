/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/animations.js":
/*!******************************!*\
  !*** ./src/js/animations.js ***!
  \******************************/
/***/ (() => {

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
  duration: 2.5,
  // Main animation duration (seconds)
  ease: "power2.inOut",
  // Animation easing

  // CirclePath Animation
  circle: {
    startRadius: 15,
    // Starting circle radius (%) - bigger visible circle at start
    endRadius: 100,
    // Final circle radius (%) - 100% covers full viewport
    animationStart: 0.1,
    // When circle animation starts (0-1)
    animationEnd: 1 // When circle animation ends (0-1)
  },
  // Text Scaling Animation
  textScaling: {
    enabled: true,
    // Enable/disable text scaling
    startScale: 1,
    // Starting scale (1 = 100%)
    endScale: 0.75,
    // Final scale (0.75 = 75% of original size)
    animationStart: 0.6,
    // When text scaling starts (0-1) - starts earlier for longer duration
    animationEnd: 1,
    // When text scaling ends (0-1)
    ease: "power2.out" // Text scaling easing (can be different from main ease)
  },
  // Performance Settings
  performance: {
    refreshPriority: "auto",
    // ScrollTrigger refresh priority
    scrub: 1,
    // Enable scrub with 1 second delay for ultra-smooth scroll
    anticipatePin: 1,
    // Pin anticipation (for smoother performance)
    fastScrollEnd: true,
    // Better handling of fast scrolling
    preventOverlaps: true // Prevent animation overlaps
  },
  // Debug Mode
  debug: false // Set to true to show ScrollTrigger markers
};

/**
 * Initialize Hero Animation for any page
 *
 * @param {string} pageSelector - CSS selector for the page (e.g., ".accommodation-template")
 * @param {object} customConfig - Optional configuration to override defaults
 * @param {string} heroSectionSelector - Optional custom hero section selector (defaults to ".hero-section")
 */
function initHeroAnimation(pageSelector, customConfig = {}, heroSectionSelector = ".hero-section") {
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
      ...(customConfig.circle || {})
    },
    textScaling: {
      ...DEFAULT_HERO_ANIMATION_CONFIG.textScaling,
      ...(customConfig.textScaling || {})
    },
    performance: {
      ...DEFAULT_HERO_ANIMATION_CONFIG.performance,
      ...(customConfig.performance || {})
    }
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
  const heroDescriptionBlue = pageContainer.querySelector(".hero-description-blue");
  const heroDescriptionWhite = pageContainer.querySelector(".hero-description-white");

  // Check if all required elements exist
  if (!heroSection || !heroClippath || !heroContent) {
    console.warn(`Required hero animation elements not found in ${pageSelector}.`);
    return;
  }

  // Create main timeline with professional GSAP techniques
  const heroTimeline = gsap.timeline({
    scrollTrigger: isMobile ? null : {
      trigger: heroSection,
      start: "top top",
      end: "bottom top",
      // Animation ends when bottom of section reaches top of viewport
      scrub: config.performance.scrub,
      pin: true,
      pinSpacing: true,
      // Keep pin spacing for proper layout
      anticipatePin: 1,
      // PRO HACK: Anticipate pin early for fast-scroll sync
      refreshPriority: "high",
      // PRO HACK: High priority refresh
      markers: config.debug,
      // PRO HACK: Force recalculation on refresh to prevent desync
      invalidateOnRefresh: true,
      // Professional scrubbing improvements
      fastScrollEnd: true,
      // PRO HACK: Better handling of fast scrolls
      preventOverlaps: true,
      // Clean scroll trigger without problematic refresh logic
      start: "top top",
      end: "bottom top"
    }
  });

  // Set initial clippath size (0% - invisible circle)
  gsap.set([heroClippath, heroContent], {
    clipPath: `circle(0% at center)`
  });

  // Set initial text opacity (invisible)
  gsap.set([heroTitleBlue, heroTitleWhite].filter(Boolean), {
    opacity: 0,
    scale: 0.8
  });

  // Set initial description opacity (if descriptions exist)
  if (heroDescriptionBlue || heroDescriptionWhite) {
    gsap.set([heroDescriptionBlue, heroDescriptionWhite].filter(Boolean), {
      opacity: 0,
      scale: 0.9,
      y: 20
    });
  }

  // Entrance animation: smoothly scale from 0% to startRadius
  gsap.to([heroClippath, heroContent], {
    duration: 1.2,
    clipPath: isMobile ? `circle(100% at center)` : `circle(${config.circle.startRadius}% at center)`,
    ease: "power2.out",
    delay: 0.3 // Small delay for smooth page load
  });

  // Entrance animation for text: fade in and scale up
  gsap.to([heroTitleBlue, heroTitleWhite].filter(Boolean), {
    duration: 1.2,
    opacity: 1,
    scale: 1,
    ease: "power2.out",
    delay: 0.5 // Slightly after circle starts
  });

  // Entrance animation for descriptions (if they exist)
  if (heroDescriptionBlue || heroDescriptionWhite) {
    gsap.to([heroDescriptionBlue, heroDescriptionWhite].filter(Boolean), {
      duration: 1.4,
      opacity: 1,
      scale: 1,
      y: 0,
      ease: "power2.out",
      delay: 0.8 // After title animation starts
    });
  }

  // Mobile-only: Smooth circle expansion to full size after entrance
  if (isMobile) {
    gsap.to([heroClippath, heroContent], {
      duration: 2.5,
      clipPath: `circle(100% at center)`,
      ease: "power2.inOut",
      delay: 1.5 // Start after entrance animations complete
    });
  }

  // Animate both background image and white text clippath together with smooth interpolation
  // Only run scroll-triggered animations on non-mobile devices
  if (!isMobile) {
    heroTimeline.to(heroClippath, {
      duration: config.duration,
      clipPath: `circle(${config.circle.endRadius}% at center)`,
      ease: config.ease,
      // Professional animation properties
      overwrite: "auto",
      immediateRender: false
    }, config.circle.animationStart).to(heroContent, {
      duration: config.duration,
      clipPath: `circle(${config.circle.endRadius}% at center)`,
      ease: config.ease,
      // Professional animation properties
      overwrite: "auto",
      immediateRender: false
    }, config.circle.animationStart);
  }

  // Add text scaling animation if enabled with smooth momentum
  // Only run scroll-triggered text scaling on non-mobile devices
  if (config.textScaling.enabled && !isMobile) {
    // Create array of text elements that exist (titles)
    const textElements = [heroTitleBlue, heroTitleWhite].filter(Boolean);
    // Create array of description elements that exist
    const descriptionElements = [heroDescriptionBlue, heroDescriptionWhite].filter(Boolean);
    if (textElements.length > 0) {
      // Scale down both blue and white text simultaneously with professional properties
      heroTimeline.to(textElements, {
        duration: config.duration * (config.textScaling.animationEnd - config.textScaling.animationStart),
        scale: config.textScaling.endScale,
        ease: config.textScaling.ease,
        transformOrigin: "center center",
        // Scale from center
        // Professional animation properties for smooth scrubbing
        overwrite: "auto",
        immediateRender: false,
        // Add momentum to text scaling
        onUpdate: function () {
          // Ensure smooth interpolation during scrubbing
          gsap.set(textElements, {
            willChange: "transform"
          });
        }
      }, config.textScaling.animationStart);
    }

    // Scale down descriptions if they exist (slightly less scaling for better readability)
    if (descriptionElements.length > 0) {
      heroTimeline.to(descriptionElements, {
        duration: config.duration * (config.textScaling.animationEnd - config.textScaling.animationStart),
        scale: config.textScaling.endScale + 0.1,
        // Slightly less scaling than titles
        ease: config.textScaling.ease,
        transformOrigin: "center center",
        overwrite: "auto",
        immediateRender: false,
        onUpdate: function () {
          gsap.set(descriptionElements, {
            willChange: "transform"
          });
        }
      }, config.textScaling.animationStart + 0.1 // Start slightly after titles
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
      elements: {
        heroSection,
        heroClippath,
        heroContent
      }
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
  start: "top bottom+=50vh",
  // when serene section is 50vh below viewport
  middle: "center center",
  // when lines meet at center (exact screen middle)
  end: "bottom top",
  // when section leaves viewport
  scrub: true,
  // clamp precisely at center (no momentum)
  debug: false
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
    console.warn("GSAP/ScrollTrigger not available for Serene Title animation.");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  const sereneSection = page.querySelector(".serene-section");
  const sereneTitle = sereneSection ? sereneSection.querySelector(".serene-title") : null;
  const firstLine = sereneTitle ? sereneTitle.querySelector(".first_line") : null;
  const secondLine = sereneTitle ? sereneTitle.querySelector(".second_line") : null;
  if (!sereneSection || !sereneTitle || !firstLine || !secondLine) {
    return;
  }
  const cfg = {
    ...DEFAULT_SERENE_TITLE_CONFIG,
    ...customConfig
  };

  // Initial positions: first line from left, second line from right
  gsap.set(firstLine, {
    xPercent: -110
  });
  gsap.set(secondLine, {
    xPercent: 110
  });

  // Create timeline for continuous movement
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: sereneSection,
      start: cfg.start,
      end: cfg.end,
      scrub: cfg.scrub,
      markers: cfg.debug,
      invalidateOnRefresh: true,
      fastScrollEnd: true
    }
  });

  // Continuous movement: Lines enter from sides and continue to opposite sides
  timeline.to(firstLine, {
    xPercent: 110,
    ease: "none"
  }, 0) // Left to Right continuously
  .to(secondLine, {
    xPercent: -110,
    ease: "none"
  }, 0); // Right to Left continuously
}

// ========================================
// IMMUNITY SECTION ANIMATION SYSTEM
// ========================================

/**
 * Default Immunity Section Animation Configuration
 */
const DEFAULT_IMMUNITY_CONFIG = {
  start: "top center",
  // Start when section top reaches center
  end: "bottom center",
  // End when section bottom reaches center
  scrub: 1,
  // Smooth scrubbing
  debug: false,
  // Content transition timing
  firstContentEnd: 0.4,
  // First content disappears at 40% of scroll (earlier timing)
  // secondContentStart is calculated to start AFTER first content completely fades
  contentGap: 0.3,
  // Gap between first and second content (no overlap)
  // Image movement speed
  imageMoveSpeed: 0.8 // How fast side images move (0.5 = slower, 1.5 = faster)
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
    console.warn("GSAP/ScrollTrigger not available for Immunity Section animation.");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  const immunitySection = page.querySelector(".immunity_section");
  const contentWrapper = immunitySection ? immunitySection.querySelector(".content_wrapper") : null;
  const firstItem = contentWrapper ? contentWrapper.querySelector(".single_item.first") : null;
  const secondItem = contentWrapper ? contentWrapper.querySelector(".single_item.second") : null;
  const leftImages = immunitySection ? immunitySection.querySelectorAll(".img_wrapper.left") : null;
  const rightImages = immunitySection ? immunitySection.querySelectorAll(".img_wrapper.right") : null;
  if (!immunitySection || !contentWrapper || !firstItem || !secondItem) {
    console.warn("❌ Required immunity section elements not found:", {
      immunitySection: !!immunitySection,
      contentWrapper: !!contentWrapper,
      firstItem: !!firstItem,
      secondItem: !!secondItem
    });
    return;
  }
  console.log("✅ All required elements found:", {
    immunitySection,
    contentWrapper,
    firstItem,
    secondItem
  });
  const cfg = {
    ...DEFAULT_IMMUNITY_CONFIG,
    ...customConfig
  };

  // Set initial states - Keep content visible initially
  gsap.set(firstItem, {
    opacity: 1,
    y: 0
  });
  gsap.set(secondItem, {
    opacity: 0,
    y: 50
  });
  gsap.set(contentWrapper, {
    opacity: 1,
    y: 0
  }); // Ensure content wrapper is visible

  // Create main timeline for immunity section - NO PINNING
  const immunityTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: immunitySection,
      start: "top center",
      // Fixed start position
      end: "bottom center",
      // Fixed end position
      scrub: cfg.scrub,
      markers: cfg.debug,
      // REMOVED: pin: contentWrapper - No pinning to prevent hiding
      // REMOVED: pinSpacing: false - No pinning needed
      // REMOVED: anticipatePin: 1 - No pinning needed
      invalidateOnRefresh: false,
      // Prevent invalidation issues
      refreshPriority: "high",
      // High priority refresh
      fastScrollEnd: true,
      // Better fast scroll handling
      // Add more debugging
      onEnter: () => console.log("🚀 ScrollTrigger ENTERED immunity section"),
      onLeave: () => console.log("👋 ScrollTrigger LEFT immunity section"),
      onEnterBack: () => console.log("🔄 ScrollTrigger ENTERED BACK immunity section"),
      onLeaveBack: () => console.log("⬅️ ScrollTrigger LEFT BACK immunity section"),
      // Add refresh event handler
      onRefresh: () => console.log("🔄 ScrollTrigger REFRESHED immunity section")
    }
  });

  // Content always stays visible - no ScrollTrigger interference
  // Just ensure content wrapper is always visible
  gsap.set(contentWrapper, {
    opacity: 1,
    y: 0
  });

  // Hide content wrapper when reaching end of immunity section
  ScrollTrigger.create({
    trigger: immunitySection,
    start: "bottom center",
    // When section bottom reaches center of viewport
    end: "bottom top",
    // When section bottom reaches top of viewport
    markers: cfg.debug,
    onEnter: () => {
      console.log("🚀 ScrollTrigger ENTERED end of immunity section - HIDING CONTENT");
      // Hide content wrapper when reaching end of section
      gsap.to(contentWrapper, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power2.inOut"
      });
    },
    onLeaveBack: () => {
      console.log("🔄 ScrollTrigger LEFT BACK end of immunity section - SHOWING CONTENT");
      // Show content wrapper when scrolling back up
      gsap.to(contentWrapper, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  });

  // Content transition: First content completely hides, then second content appears (NO OVERLAP)
  immunityTimeline.to(firstItem, {
    opacity: 0,
    y: -30,
    ease: "power2.inOut",
    duration: 0.3 // Fast fade out for first item
  }, cfg.firstContentEnd).to(secondItem, {
    opacity: 1,
    y: 0,
    ease: "power2.out",
    duration: 0.4 // Quick but smooth fade in for second item
  }, cfg.firstContentEnd + cfg.contentGap // Start second content AFTER first content completely disappears
  );

  // Side images move normally (not pinned)
  if (leftImages && rightImages) {
    // Create separate timeline for images (no pinning)
    const imageTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: immunitySection,
        start: "top center",
        // Fixed start position
        end: "bottom center",
        // Fixed end position
        scrub: cfg.scrub,
        markers: false,
        // No markers for images
        invalidateOnRefresh: false,
        // Prevent invalidation issues
        refreshPriority: "high",
        // High priority refresh
        fastScrollEnd: true // Better fast scroll handling
      }
    });

    // Left images move up and fade slightly
    leftImages.forEach((img, index) => {
      const moveDistance = (index + 1) * 20; // Different distance for each image
      imageTimeline.to(img, {
        y: -moveDistance * cfg.imageMoveSpeed,
        opacity: 0.8,
        ease: "power1.out"
      }, 0);
    });

    // Right images move down and fade slightly
    rightImages.forEach((img, index) => {
      const moveDistance = (index + 1) * 20; // Different distance for each image
      imageTimeline.to(img, {
        y: moveDistance * cfg.imageMoveSpeed,
        opacity: 0.8,
        ease: "power1.out"
      }, 0);
    });
  }

  // Log animation initialization
  if (cfg.debug) {
    console.log("Immunity Section Animation Initialized", {
      config: cfg,
      elements: {
        immunitySection,
        contentWrapper,
        firstItem,
        secondItem
      }
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
    setTimeout(() => waitForGSAPAndInitImmunity(pageSelector, customConfig), 100);
  }
}

// Add this section to your animations.js file, after the IMMUNITY SECTION ANIMATION SYSTEM

// ========================================
// SERENE BOTTOM IMAGE ANIMATION SYSTEM
// ========================================

/**
 * Default Serene Bottom Image Animation Configuration
 */
const DEFAULT_SERENE_IMAGE_CONFIG = {
  start: "top bottom",
  // Start when section top enters viewport
  end: "bottom top",
  // End when section bottom leaves viewport

  // Upper Middle Image Settings
  upperMiddleImage: {
    enabled: true,
    // Enable/disable upper middle image animation
    moveDistance: 25,
    // Distance to move down (positive = down, negative = up)
    ease: "none" // Animation easing
  },
  // Upper Right Image Settings
  upperRightImage: {
    enabled: true,
    // Enable/disable upper right image animation
    moveDistance: -25,
    // Distance to move up (negative = up, positive = down)
    ease: "none" // Animation easing
  },
  // Bottom Middle Image Settings
  middleImage: {
    enabled: true,
    // Enable/disable middle image animation
    moveDistance: -80,
    // Distance to move up (negative = up, positive = down)
    ease: "none" // Animation easing
  },
  // Bottom Left Image Settings
  leftImage: {
    enabled: true,
    // Enable/disable left image animation
    moveDistance: -60,
    // Distance to move up (can be different from middle)
    ease: "none" // Animation easing
  },
  scrub: 1,
  // Smooth scrubbing
  debug: false
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
  const upperMiddleImage = sereneSection ? sereneSection.querySelector(".serene-upper-middle-img") : null;
  const upperRightImage = sereneSection ? sereneSection.querySelector(".serene-upper-right-img") : null;

  // Bottom section images
  const middleImage = sereneSection ? sereneSection.querySelector(".serene-bottom-middle-img") : null;
  const leftImage = sereneSection ? sereneSection.querySelector(".serene-bottom-left-img") : null;
  if (!sereneSection) {
    return;
  }

  // Deep merge custom config with defaults
  const cfg = {
    ...DEFAULT_SERENE_IMAGE_CONFIG,
    ...customConfig,
    upperMiddleImage: {
      ...DEFAULT_SERENE_IMAGE_CONFIG.upperMiddleImage,
      ...(customConfig.upperMiddleImage || {})
    },
    upperRightImage: {
      ...DEFAULT_SERENE_IMAGE_CONFIG.upperRightImage,
      ...(customConfig.upperRightImage || {})
    },
    middleImage: {
      ...DEFAULT_SERENE_IMAGE_CONFIG.middleImage,
      ...(customConfig.middleImage || {})
    },
    leftImage: {
      ...DEFAULT_SERENE_IMAGE_CONFIG.leftImage,
      ...(customConfig.leftImage || {})
    }
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
        id: "serene-upper-middle-img" // Unique ID for debugging
      }
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
        id: "serene-upper-right-img" // Unique ID for debugging
      }
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
        id: "serene-bottom-middle-img" // Unique ID for debugging
      }
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
        id: "serene-bottom-left-img" // Unique ID for debugging
      }
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
      }
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
    setTimeout(() => waitForGSAPAndInitSereneImage(pageSelector, customConfig), 100);
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
    setTimeout(() => waitForGSAPAndInit(pageSelector, customConfig, heroSectionSelector), 100);
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
      debug: false,
      // Disable debug for production
      duration: 2.5,
      textScaling: {
        enabled: true,
        endScale: 0.7,
        // Scale down to 70%
        animationStart: 0.5 // Start scaling when image is 50% expanded (longer duration)
      }
    });

    // Re-init Serene Title animation
    initSereneTitleAnimation(".accommodation-template");
  }

  // Re-init Ayurveda Template Animation
  if (document.querySelector(".ayurveda-template")) {
    initHeroAnimation(".ayurveda-template", {
      debug: false,
      // Disable debug for production
      duration: 3,
      // Slightly slower animation
      ease: "power2.out",
      textScaling: {
        enabled: true,
        endScale: 0.75,
        // Scale down to 75%
        animationStart: 0.4,
        // Start scaling when image is 40% expanded (much longer duration)
        ease: "power3.out" // Different easing for text
      }
    });
  }

  // Re-init About Us Template Animation
  if (document.querySelector(".aboutus-template")) {
    initHeroAnimation(".aboutus-template", {
      debug: false,
      // Disable debug for production
      duration: 2.8,
      // Medium animation speed
      ease: "power2.inOut",
      textScaling: {
        enabled: true,
        endScale: 0.8,
        // Scale down to 80% (less dramatic)
        animationStart: 0.55,
        // Start scaling when image is 55% expanded
        ease: "power2.out" // Smooth easing for text
      }
    });
  }

  // Re-init Rooms Template Animation
  if (document.querySelector(".rooms-template")) {
    initHeroAnimation(".rooms-template", {
      debug: false,
      // Disable debug for production
      duration: 2.5,
      ease: "power2.inOut",
      textScaling: {
        enabled: true,
        endScale: 0.7,
        // Scale down to 70%
        animationStart: 0.5 // Start scaling when image is 50% expanded
      }
    });
  }

  // Re-init Immunity Section Animation for Ayurveda page
  if (document.querySelector(".ayurveda-template")) {
    initImmunitySectionAnimation(".ayurveda-template", {
      debug: false // Disable debug for production
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/theme.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations.js */ "./src/js/animations.js");
/* harmony import */ var _animations_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animations_js__WEBPACK_IMPORTED_MODULE_0__);
/**
 * SOUL RESORT THEME - MAIN JAVASCRIPT
 *
 * This file contains the main theme functionality and imports animations.
 * All GSAP animations are now organized in sources/js/animations.js
 *
 * DEPENDENCIES:
 * - GSAP (loaded via CDN)
 * - ScrollTrigger plugin (loaded via CDN)
 * - animations.js (imported below)
 */

// Import animations

jQuery(function ($) {
  $(document).ready(function () {
    //  Header nav fixed function 🤗
    $(function () {
      const $navbar = $(".main-navigation"),
        $searchContainer = $(".search-container"),
        $body = $("body"),
        $searchBox = $("#search-box"),
        $searchForm = $(".search-form");
      let lastScrollTop = 0,
        navbarHeight = $navbar.outerHeight(),
        originalBodyPadRight = null;
      function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
      }
      function handleScroll() {
        const currentScroll = $(window).scrollTop();

        // Only handle search backdrop closing and scrolled class
        // Header animation is handled by the vanilla JS system in header.php
        $navbar.toggleClass("scrolled", currentScroll > navbarHeight);
        if (currentScroll > lastScrollTop && currentScroll > navbarHeight && $body.hasClass("search-backdrop")) {
          closeSearch();
        }
        lastScrollTop = currentScroll;
      }
      function toggleSearch(event) {
        event.preventDefault();
        $searchContainer.is(":visible") ? closeSearch() : openSearch();
      }
      function openSearch() {
        $(".main-navigation .offcanvas.show").offcanvas("hide");
        if (!$(".offcanvas.show").length) {
          originalBodyPadRight = $body.css("padding-right");
          const scrollbarWidth = getScrollbarWidth();
          if (scrollbarWidth) {
            $body.css("padding-right", scrollbarWidth + "px");
          }
        }
        $searchContainer.fadeIn(400);
        $body.addClass("search-backdrop").css("overflow", "hidden");
        $searchBox.focus();
        $(document).on("click.searchOutside", function (event) {
          if (!$(event.target).closest(".search-container, .search-box").length) {
            closeSearch();
          }
        });
      }
      function closeSearch() {
        $searchContainer.fadeOut(400, function () {
          if (!$(".offcanvas.show").length) {
            $body.removeClass("search-backdrop").css({
              overflow: "",
              "padding-right": originalBodyPadRight
            });
          }
        });
        $(document).off("click.searchOutside");
      }
      $(window).on("scroll", handleScroll);
      $(".search-box").on("click", toggleSearch);
      $("#close-search").on("click", closeSearch);
      $searchForm.on("submit", function (event) {
        if ($searchBox.val().trim() === "") {
          event.preventDefault();
          return false;
        }
        closeSearch();
      });
      $searchContainer.on("click", function (event) {
        event.stopPropagation();
      });

      // iOS video autoplay fix
      function enableIOSVideoAutoplay() {
        // iOS detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (!isIOS) return;

        // Find all videos on the page
        const videos = document.querySelectorAll("video[autoplay]");

        // Add event listener for page visibility change
        document.addEventListener("visibilitychange", function () {
          if (document.visibilityState === "visible") {
            // Restart all videos when page becomes visible
            videos.forEach(video => {
              video.play();
            });
          }
        });

        // Add event listeners for user interaction
        const userInteractionEvents = ["touchstart", "click"];
        userInteractionEvents.forEach(eventName => {
          document.addEventListener(eventName, initiateVideoPlayback, {
            once: true
          });
        });
        function initiateVideoPlayback() {
          videos.forEach(video => {
            // Unmute and play videos
            video.muted = true; // Must be muted for autoplay
            video.play().catch(e => console.log("Error playing video:", e));

            // Remove controls if they exist
            if (video.hasAttribute("controls")) {
              video.removeAttribute("controls");
            }
          });

          // Remove event listeners after first interaction
          userInteractionEvents.forEach(eventName => {
            document.removeEventListener(eventName, initiateVideoPlayback);
          });
        }

        // Try to play videos immediately
        videos.forEach(video => {
          video.play().catch(e => {
            console.log("Waiting for user interaction to play video");
          });
        });
      }

      // Call the function on page load
      enableIOSVideoAutoplay();
    });

    // <-- Modern Mobile Header with GSAP Animation -->
    (function () {
      // Wait for GSAP to be available
      if (typeof gsap === "undefined") {
        console.log("Waiting for GSAP to load for mobile header...");
        setTimeout(arguments.callee, 500);
        return;
      }

      // Device detection functions
      function getCurrentDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return "mobile";
        if (width < 1024) return "tablet";
        return "desktop";
      }
      function isMobileDevice() {
        return getCurrentDeviceType() === "mobile";
      }
      function isTabletDevice() {
        return getCurrentDeviceType() === "tablet";
      }
      function isLargeScreen() {
        return window.innerWidth >= 992;
      }

      // console.log("🎬 Initializing Modern Mobile Header");

      // Mobile header state management
      let mobileMenuState = {
        isOpen: false,
        isAnimating: false,
        timeline: null
      };

      // Disable Bootstrap offcanvas on mobile devices
      function disableBootstrapOffcanvas() {
        const hamburger = document.querySelector(".navbar-toggler");
        if (hamburger && window.innerWidth < 992) {
          // Remove Bootstrap attributes to prevent offcanvas activation
          hamburger.removeAttribute("data-bs-toggle");
          hamburger.removeAttribute("data-bs-target");
          hamburger.setAttribute("data-modern-menu", "true");

          // Hide any existing Bootstrap offcanvas
          const offcanvasElement = document.querySelector(".offcanvas");
          if (offcanvasElement) {
            offcanvasElement.style.display = "none";
          }

          // Remove any existing Bootstrap backdrop
          const existingBackdrop = document.querySelector(".offcanvas-backdrop");
          if (existingBackdrop) {
            existingBackdrop.remove();
          }

          // console.log("✅ Bootstrap offcanvas disabled for mobile");
        }
      }

      // Re-enable Bootstrap offcanvas on desktop
      function enableBootstrapOffcanvas() {
        const hamburger = document.querySelector(".navbar-toggler");
        if (hamburger && window.innerWidth >= 992) {
          // Restore Bootstrap attributes for desktop
          hamburger.setAttribute("data-bs-toggle", "offcanvas");
          hamburger.setAttribute("data-bs-target", "#mobileMenu");
          hamburger.removeAttribute("data-modern-menu");

          // Show Bootstrap offcanvas on desktop
          const offcanvasElement = document.querySelector(".offcanvas");
          if (offcanvasElement) {
            offcanvasElement.style.display = "";
          }

          // console.log("✅ Bootstrap offcanvas enabled for desktop");
        }
      }

      // Create mobile menu overlay if it doesn't exist
      function createMobileMenuOverlay() {
        if (document.getElementById("modern-mobile-menu")) {
          console.log("✅ Mobile menu overlay already exists");
          return;
        }
        console.log("🔨 Creating mobile menu overlay...");
        const overlay = document.createElement("div");
        overlay.id = "modern-mobile-menu";
        overlay.className = "modern-mobile-menu";

        // Get menu items from existing navigation
        const existingNav = document.querySelector(".offcanvas-body .navbar-nav");
        const secondaryNav = document.querySelector(".offcanvas-body .navbar-nav:last-child");
        let menuHTML = '<div class="modern-menu-content">';
        menuHTML += '<div class="modern-menu-header">';

        // Add logo
        const logoWrap = document.querySelector(".offcanvas-header .mb-logo-wrap");
        if (logoWrap) {
          menuHTML += logoWrap.outerHTML;
        }
        menuHTML += '<button class="modern-menu-close" aria-label="Close menu">';
        menuHTML += '<span class="close-line close-line-1"></span>';
        menuHTML += '<span class="close-line close-line-2"></span>';
        menuHTML += "</button>";
        menuHTML += "</div>";
        menuHTML += '<nav class="modern-menu-nav">';

        // Primary navigation
        if (existingNav) {
          const primaryItems = existingNav.children;
          if (primaryItems.length > 0) {
            menuHTML += '<ul class="modern-menu-primary">';
            Array.from(primaryItems).forEach((item, index) => {
              const link = item.querySelector(".nav-link");
              if (link) {
                const text = link.textContent.trim();
                const href = link.getAttribute("href");
                menuHTML += `<li class="modern-menu-item" data-index="${index}">`;
                menuHTML += `<a href="${href}" class="modern-menu-link">`;
                menuHTML += `<span class="menu-text">${text}</span>`;
                menuHTML += `<span class="menu-arrow">→</span>`;
                menuHTML += `</a></li>`;
              }
            });
            menuHTML += "</ul>";
          }
        }

        // Secondary navigation (if exists)
        if (secondaryNav && secondaryNav !== existingNav) {
          const secondaryItems = secondaryNav.children;
          if (secondaryItems.length > 0) {
            menuHTML += '<ul class="modern-menu-secondary">';
            Array.from(secondaryItems).forEach((item, index) => {
              const link = item.querySelector(".nav-link");
              if (link) {
                const text = link.textContent.trim();
                const href = link.getAttribute("href");
                menuHTML += `<li class="modern-menu-item secondary" data-index="${index}">`;
                menuHTML += `<a href="${href}" class="modern-menu-link">`;
                menuHTML += `<span class="menu-text">${text}</span>`;
                menuHTML += `<span class="menu-arrow">→</span>`;
                menuHTML += `</a></li>`;
              }
            });
            menuHTML += "</ul>";
          }
        }
        menuHTML += "</nav>";
        menuHTML += "</div>";
        overlay.innerHTML = menuHTML;
        document.body.appendChild(overlay);
        console.log("✅ Modern mobile menu overlay created:", overlay);
        console.log("📋 Menu HTML created with", overlay.querySelectorAll(".modern-menu-item").length, "menu items");
      }

      // Initialize hamburger animation
      function initHamburgerAnimation() {
        const hamburger = document.querySelector(".navbar-toggler");
        const hamburgerIcon = document.querySelector(".navbar-toggler-icon");
        if (!hamburger || !hamburgerIcon) return;

        // Create custom hamburger lines
        hamburgerIcon.innerHTML = "";
        hamburgerIcon.style.backgroundImage = "none";
        for (let i = 1; i <= 3; i++) {
          const line = document.createElement("span");
          line.className = `hamburger-line hamburger-line-${i}`;
          hamburgerIcon.appendChild(line);
        }

        // Set initial state
        gsap.set(".hamburger-line", {
          transformOrigin: "center center",
          scale: 1,
          rotation: 0,
          y: 0
        });

        // console.log("✅ Hamburger animation initialized");
      }

      // Create opening animation timeline
      function createOpenTimeline() {
        const tl = gsap.timeline({
          paused: true
        });
        const overlay = document.getElementById("modern-mobile-menu");
        const menuItems = overlay.querySelectorAll(".modern-menu-item");
        const menuHeader = overlay.querySelector(".modern-menu-header");
        const closeButton = overlay.querySelector(".modern-menu-close");

        // Set initial states
        gsap.set(overlay, {
          clipPath: "circle(0% at top right)",
          display: "flex"
        });
        gsap.set(menuItems, {
          y: 60,
          opacity: 0,
          scale: 0.8
        });
        gsap.set(menuHeader, {
          y: -30,
          opacity: 0
        });

        // Animation sequence
        tl.to(overlay, {
          clipPath: "circle(150% at top right)",
          duration: 0.8,
          ease: "power3.inOut"
        }).to(menuHeader, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.4").to(menuItems, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.2)"
        }, "-=0.3");

        // Hamburger to X animation
        const hamburgerLines = document.querySelectorAll(".hamburger-line");
        if (hamburgerLines.length >= 3) {
          tl.to(".hamburger-line-1", {
            rotation: 45,
            y: 8,
            duration: 0.3,
            ease: "power2.inOut"
          }, 0).to(".hamburger-line-2", {
            opacity: 0,
            scale: 0,
            duration: 0.2,
            ease: "power2.inOut"
          }, 0).to(".hamburger-line-3", {
            rotation: -45,
            y: -8,
            duration: 0.3,
            ease: "power2.inOut"
          }, 0);
        }
        return tl;
      }

      // Create closing animation timeline
      function createCloseTimeline() {
        const tl = gsap.timeline({
          paused: true
        });
        const overlay = document.getElementById("modern-mobile-menu");
        const menuItems = overlay.querySelectorAll(".modern-menu-item");
        const menuHeader = overlay.querySelector(".modern-menu-header");

        // Animation sequence (reverse of opening)
        tl.to(menuItems, {
          y: -40,
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in"
        }).to(menuHeader, {
          y: -30,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        }, "-=0.2").to(overlay, {
          clipPath: "circle(0% at top right)",
          duration: 0.6,
          ease: "power3.inOut"
        }, "-=0.2").set(overlay, {
          display: "none"
        });

        // X back to hamburger animation
        const hamburgerLines = document.querySelectorAll(".hamburger-line");
        if (hamburgerLines.length >= 3) {
          tl.to(".hamburger-line-1", {
            rotation: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.inOut"
          }, 0).to(".hamburger-line-2", {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            ease: "power2.inOut"
          }, 0.1).to(".hamburger-line-3", {
            rotation: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.inOut"
          }, 0);
        }
        return tl;
      }

      // Open mobile menu
      function openMobileMenu() {
        if (mobileMenuState.isAnimating || mobileMenuState.isOpen) return;
        mobileMenuState.isAnimating = true;
        mobileMenuState.isOpen = true;

        // Ensure no Bootstrap backdrop exists
        const existingBackdrop = document.querySelector(".offcanvas-backdrop");
        if (existingBackdrop) {
          existingBackdrop.remove();
        }

        // Disable body scroll
        document.body.style.overflow = "hidden";
        document.body.classList.add("mobile-menu-open");

        // Create and play opening animation
        const openTl = createOpenTimeline();
        openTl.play().then(() => {
          mobileMenuState.isAnimating = false;
        });
        console.log("📱 Mobile menu opened");
      }

      // Close mobile menu
      function closeMobileMenu() {
        if (mobileMenuState.isAnimating || !mobileMenuState.isOpen) return;
        mobileMenuState.isAnimating = true;
        mobileMenuState.isOpen = false;

        // Remove any Bootstrap backdrop that might have appeared
        const existingBackdrop = document.querySelector(".offcanvas-backdrop");
        if (existingBackdrop) {
          existingBackdrop.remove();
        }

        // Create and play closing animation
        const closeTl = createCloseTimeline();
        closeTl.play().then(() => {
          mobileMenuState.isAnimating = false;
          // Re-enable body scroll
          document.body.style.overflow = "";
          document.body.classList.remove("mobile-menu-open");

          // Final cleanup of any leftover backdrops
          setTimeout(() => {
            const leftoverBackdrop = document.querySelector(".offcanvas-backdrop");
            if (leftoverBackdrop) {
              leftoverBackdrop.remove();
            }
          }, 100);
        });
        console.log("📱 Mobile menu closed");
      }

      // Add event listeners
      function initEventListeners() {
        // Hamburger click
        const hamburger = document.querySelector(".navbar-toggler");
        if (hamburger) {
          console.log("🍔 Hamburger button found:", hamburger);

          // Remove any existing Bootstrap event listeners
          hamburger.addEventListener("click", function (e) {
            console.log("🍔 Hamburger clicked! Width:", window.innerWidth);

            // Only handle custom menu on mobile
            if (window.innerWidth < 992) {
              console.log("📱 Mobile device detected, using custom menu");
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              if (mobileMenuState.isOpen) {
                console.log("📱 Closing mobile menu");
                closeMobileMenu();
              } else {
                console.log("📱 Opening mobile menu");
                openMobileMenu();
              }
            } else {
              console.log("🖥️ Desktop device, letting Bootstrap handle");
            }
            // Let Bootstrap handle desktop
          });
        } else {
          console.log("❌ Hamburger button not found!");
        }

        // Close button click
        document.addEventListener("click", function (e) {
          const target = e.target;
          if (target && typeof target.closest === "function" && target.closest(".modern-menu-close")) {
            e.preventDefault();
            closeMobileMenu();
          }
        });

        // Menu item clicks
        document.addEventListener("click", function (e) {
          // Check if e.target is a valid DOM element and has the closest method
          if (e.target && typeof e.target.closest === "function") {
            const menuLink = e.target.closest(".modern-menu-link");
            if (menuLink && mobileMenuState.isOpen) {
              // Add a small delay to show the click feedback before navigation
              setTimeout(() => {
                closeMobileMenu();
              }, 150);
            }
          }
        });

        // Escape key to close
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && mobileMenuState.isOpen) {
            closeMobileMenu();
          }
        });

        // Handle window resize
        window.addEventListener("resize", function () {
          if (isLargeScreen()) {
            // Desktop: close custom menu and enable Bootstrap
            if (mobileMenuState.isOpen) {
              // Force close without animation on desktop
              mobileMenuState.isOpen = false;
              mobileMenuState.isAnimating = false;
              document.body.style.overflow = "";
              document.body.classList.remove("mobile-menu-open");
              const overlay = document.getElementById("modern-mobile-menu");
              if (overlay) {
                gsap.set(overlay, {
                  display: "none"
                });
              }

              // Reset hamburger
              gsap.set(".hamburger-line", {
                rotation: 0,
                y: 0,
                opacity: 1,
                scale: 1
              });
            }

            // Enable Bootstrap offcanvas for desktop
            enableBootstrapOffcanvas();
          } else {
            // Mobile: disable Bootstrap offcanvas
            disableBootstrapOffcanvas();
          }
        });

        // Handle video optimization on device type change (if optimizeVideoLoading exists)
        let lastDeviceType = getCurrentDeviceType();
        window.addEventListener("resize", function () {
          const currentDeviceType = getCurrentDeviceType();
          if (currentDeviceType !== lastDeviceType) {
            // Device type changed, re-optimize video loading if function exists
            if (typeof optimizeVideoLoading === "function") {
              setTimeout(() => {
                optimizeVideoLoading();
                lastDeviceType = currentDeviceType;
              }, 100);
            }
            lastDeviceType = currentDeviceType;
          }
        });

        // Prevent Bootstrap offcanvas from showing on mobile
        document.addEventListener("show.bs.offcanvas", function (e) {
          if (window.innerWidth < 992) {
            e.preventDefault();
            e.stopPropagation();
            console.log("🚫 Prevented Bootstrap offcanvas on mobile");
          }
        });

        // Clean up any Bootstrap backdrops that might appear
        const observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (mutation.type === "childList") {
              mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === 1 && node.classList && node.classList.contains("offcanvas-backdrop")) {
                  if (window.innerWidth < 992) {
                    node.remove();
                    console.log("🧹 Removed unwanted Bootstrap backdrop on mobile");
                  }
                }
              });
            }
          });
        });
        observer.observe(document.body, {
          childList: true,
          subtree: false
        });

        // console.log("✅ Event listeners initialized");
      }

      // Add hover effects
      function initHoverEffects() {
        // Menu item hover effects
        document.addEventListener("mouseenter", function (e) {
          // Check if e.target is a valid DOM element and has the closest method
          if (e.target && typeof e.target.closest === "function") {
            const menuItem = e.target.closest(".modern-menu-item");
            if (menuItem) {
              gsap.to(menuItem.querySelector(".menu-text"), {
                x: 10,
                duration: 0.3,
                ease: "power2.out"
              });
              gsap.to(menuItem.querySelector(".menu-arrow"), {
                x: 5,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          }
        }, true);
        document.addEventListener("mouseleave", function (e) {
          // Check if e.target is a valid DOM element and has the closest method
          if (e.target && typeof e.target.closest === "function") {
            const menuItem = e.target.closest(".modern-menu-item");
            if (menuItem) {
              gsap.to(menuItem.querySelector(".menu-text"), {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
              });
              gsap.to(menuItem.querySelector(".menu-arrow"), {
                x: 0,
                opacity: 0.7,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          }
        }, true);
      }

      // Initialize everything
      function initModernMobileHeader() {
        // Check if we're on mobile/tablet
        const isMobile = window.innerWidth < 992;
        console.log("📱 Device check:", {
          width: window.innerWidth,
          isMobile
        });
        if (isMobile) {
          disableBootstrapOffcanvas();
          console.log("✅ Bootstrap offcanvas disabled for mobile");
        } else {
          enableBootstrapOffcanvas();
          console.log("✅ Bootstrap offcanvas enabled for desktop");
        }
        createMobileMenuOverlay();
        initHamburgerAnimation();
        initEventListeners();
        initHoverEffects();
        console.log("✅ Modern mobile header system initialized");
      }

      // Start initialization with error handling
      try {
        initModernMobileHeader();
      } catch (error) {
        console.log("⚠️ Mobile header initialization failed:", error);
        // Continue with other functionality even if mobile header fails
      }
    })();
    // <-- Modern Mobile Header End -->

    //Hero Accordion Slider
    const panels = document.querySelectorAll(".panel");
    panels.forEach(panel => {
      panel.addEventListener("mouseenter", () => {
        removeActiveClasses();
        panel.classList.add("active");
      });
    });
    function removeActiveClasses() {
      panels.forEach(panel => {
        panel.classList.remove("active");
      });
    }
    //End Hero Accordion SLider

    // SECTION 3 BACKGROUND IMAGE HOVER EFFECTS
    function initSection3BackgroundEffects() {
      const cards = document.querySelectorAll(".section-3 .card");
      const backgroundImage = document.getElementById("section3Background");
      if (!cards.length || !backgroundImage) {
        console.log("🎨 Section 3 background effects not found");
        console.log("🎨 Cards found:", cards.length);
        console.log("🎨 Background image element:", backgroundImage);
        return;
      }
      console.log("🎨 Initializing Section 3 background effects with", cards.length, "cards");

      // Track the currently active card
      let activeCard = null;
      let lastHoveredCard = null;

      // Preload all background images for smoother transitions
      const imageUrls = [];
      cards.forEach((card, index) => {
        const imageUrl = card.getAttribute("data-background-image");
        if (imageUrl) {
          imageUrls.push(imageUrl);

          // Preload image
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => {
            console.log(`🎨 Preloaded image ${index}:`, imageUrl);
          };
        }
      });

      // Function to ensure arrows are always visible
      function ensureArrowsVisible() {
        cards.forEach(card => {
          const actionButton = card.querySelector(".action-button");
          if (actionButton) {
            const arrowIcon = actionButton.querySelector(".arrow-icon");
            if (arrowIcon) {
              arrowIcon.style.opacity = "1";
              arrowIcon.style.visibility = "visible";
              arrowIcon.style.display = "flex";
            }
          }
        });
      }

      // Debug: Log all card data
      cards.forEach((card, index) => {
        const imageUrl = card.getAttribute("data-background-image");
        console.log(`🎨 Card ${index}:`, {
          title: card.querySelector(".title")?.textContent,
          backgroundImage: imageUrl,
          mealIndex: card.getAttribute("data-meal-index")
        });
      });

      // Set initial background image from first card and activate first card
      const firstCard = cards[0];
      if (firstCard) {
        const firstImageUrl = firstCard.getAttribute("data-background-image");
        if (firstImageUrl) {
          backgroundImage.src = firstImageUrl;
          console.log("🎨 Set initial background image:", firstImageUrl);
        }

        // Set first card as active by default (show description only)
        firstCard.classList.add("active");
        activeCard = firstCard;

        // Show first card's description but hide button text
        const textWrap = firstCard.querySelector(".text-wrap");
        if (textWrap) {
          const description = textWrap.querySelector("p");
          const actionButton = textWrap.querySelector(".action-button");
          if (description) description.style.opacity = "1";
          if (actionButton) {
            actionButton.style.opacity = "1";
            actionButton.style.transform = "translateX(0)";

            // Keep button text hidden
            const buttonContent = actionButton.querySelector(".button-content");
            if (buttonContent) {
              buttonContent.style.maxWidth = "0";
              buttonContent.style.marginLeft = "0";
              const btnText = buttonContent.querySelector(".btn-text");
              if (btnText) btnText.style.opacity = "0";
            }

            // Always show arrow icon
            const arrowIcon = actionButton.querySelector(".arrow-icon");
            if (arrowIcon) {
              arrowIcon.style.opacity = "1";
              arrowIcon.style.visibility = "visible";
              arrowIcon.style.display = "flex";
            }
          }
        }
        console.log("🎨 First card activated by default (description only)");
      }

      // Add hover event listeners to each card
      cards.forEach((card, index) => {
        const imageUrl = card.getAttribute("data-background-image");
        if (!imageUrl) {
          console.log("⚠️ Card", index, "has no background image");
          return;
        }

        // Mouse enter - change background image and show only this card's details
        card.addEventListener("mouseenter", function () {
          console.log("🎨 Hovering card", index, "with image:", imageUrl);

          // Hide all cards' details first
          cards.forEach(c => {
            c.classList.remove("active");
            c.classList.remove("last-hovered");

            // Hide description and button text for all cards
            const textWrap = c.querySelector(".text-wrap");
            if (textWrap) {
              const description = textWrap.querySelector("p");
              const actionButton = textWrap.querySelector(".action-button");
              if (description) description.style.opacity = "0";
              if (actionButton) {
                actionButton.style.opacity = "0";
                actionButton.style.transform = "translateX(-20px)";

                // Hide button text
                const buttonContent = actionButton.querySelector(".button-content");
                if (buttonContent) {
                  buttonContent.style.maxWidth = "0";
                  buttonContent.style.marginLeft = "0";
                  const btnText = buttonContent.querySelector(".btn-text");
                  if (btnText) btnText.style.opacity = "0";
                }
              }
            }
          });

          // Add active class to current card
          card.classList.add("active");

          // Update active card reference
          activeCard = card;
          lastHoveredCard = card;

          // Show current card's details
          const textWrap = card.querySelector(".text-wrap");
          if (textWrap) {
            const description = textWrap.querySelector("p");
            const actionButton = textWrap.querySelector(".action-button");
            if (description) description.style.opacity = "1";
            if (actionButton) {
              actionButton.style.opacity = "1";
              actionButton.style.transform = "translateX(0)";

              // Show button text on hover
              const buttonContent = actionButton.querySelector(".button-content");
              if (buttonContent) {
                buttonContent.style.maxWidth = "200px";
                buttonContent.style.marginLeft = "8px";
                const btnText = buttonContent.querySelector(".btn-text");
                if (btnText) btnText.style.opacity = "1";
              }
            }
          }

          // Ensure all arrows remain visible
          ensureArrowsVisible();

          // Smooth transition to new image with enhanced effect
          backgroundImage.classList.add("transitioning");
          backgroundImage.style.opacity = "0";
          setTimeout(() => {
            backgroundImage.src = imageUrl;
            backgroundImage.style.opacity = "1";

            // Remove transition class and resume animation after fade-in
            setTimeout(() => {
              backgroundImage.classList.remove("transitioning");
            }, 400);
          }, 400); // Slightly longer for smoother effect
        });

        // Mouse leave - keep last hovered card active
        card.addEventListener("mouseleave", function () {
          // Remove active class from current card
          card.classList.remove("active");

          // If this was the last hovered card, keep it active
          if (lastHoveredCard === card) {
            // Keep this card's content visible
            const textWrap = card.querySelector(".text-wrap");
            if (textWrap) {
              const description = textWrap.querySelector("p");
              const actionButton = textWrap.querySelector(".action-button");
              if (description) description.style.opacity = "1";
              if (actionButton) {
                actionButton.style.opacity = "1";
                actionButton.style.transform = "translateX(0)";

                // Keep button text hidden (only show on hover)
                const buttonContent = actionButton.querySelector(".button-content");
                if (buttonContent) {
                  buttonContent.style.maxWidth = "0";
                  buttonContent.style.marginLeft = "0";
                  const btnText = buttonContent.querySelector(".btn-text");
                  if (btnText) btnText.style.opacity = "0";
                }
              }
            }
          } else {
            // Hide this card's details
            const textWrap = card.querySelector(".text-wrap");
            if (textWrap) {
              const description = textWrap.querySelector("p");
              const actionButton = textWrap.querySelector(".action-button");
              if (description) description.style.opacity = "0";
              if (actionButton) {
                actionButton.style.opacity = "0";
                actionButton.style.transform = "translateX(-20px)";

                // Hide button text
                const buttonContent = actionButton.querySelector(".button-content");
                if (buttonContent) {
                  buttonContent.style.maxWidth = "0";
                  buttonContent.style.marginLeft = "0";
                  const btnText = buttonContent.querySelector(".btn-text");
                  if (btnText) btnText.style.opacity = "0";
                }
              }
            }
          }
        });

        // Add click handler for action button
        const actionButton = card.querySelector(".action-button");
        if (actionButton) {
          actionButton.addEventListener("click", function (e) {
            e.preventDefault();
            const link = actionButton.querySelector("a").getAttribute("href");
            if (link) {
              window.open(link, "_blank");
            }
          });
        }
      });
      console.log("✅ Section 3 background effects initialized");
    }

    // Initialize section 3 background effects
    try {
      initSection3BackgroundEffects();
    } catch (error) {
      console.log("⚠️ Section 3 background effects initialization failed:", error);
      // Fallback: try to initialize after a short delay
      setTimeout(() => {
        try {
          initSection3BackgroundEffects();
        } catch (fallbackError) {
          console.log("⚠️ Section 3 background effects fallback also failed:", fallbackError);
        }
      }, 1000);
    }

    // HERO VIDEO CONTROLS
    function initHeroVideoControls() {
      const heroVideo = document.getElementById("heroVideo");
      const playPauseBtn = document.querySelector(".play-pause");
      const muteBtn = document.querySelector(".mute");
      const videoBanner = document.getElementById("videoBanner");
      if (!heroVideo || !playPauseBtn || !muteBtn) {
        console.log("🎬 Video controls not found");
        return;
      }
      console.log("🎬 Found video controls:", {
        heroVideo,
        playPauseBtn,
        muteBtn,
        videoBanner
      });

      // Banner-to-video transition management
      function handleBannerToVideoTransition() {
        if (!videoBanner) return;
        console.log("🎬 Managing banner-to-video transition");

        // Get video controls container
        const videoControls = document.querySelector(".video_controls");
        if (videoControls) {
          // Hide video controls initially while video loads
          videoControls.style.opacity = "0";
          videoControls.style.visibility = "hidden";
          console.log("🎬 Video controls hidden initially");
        }

        // Show banner initially while video loads
        videoBanner.style.display = "block";
        videoBanner.style.opacity = "1";

        // Hide banner and show video controls when video starts playing
        heroVideo.addEventListener("canplay", function () {
          console.log("🎬 Video can start playing, hiding banner and showing controls");

          // Hide banner
          videoBanner.style.transition = "opacity 1s ease-in-out";
          videoBanner.style.opacity = "0";

          // Show video controls smoothly
          if (videoControls) {
            videoControls.style.visibility = "visible";
            videoControls.style.opacity = "1";
            console.log("🎬 Video controls now visible");
          }

          // Remove banner from DOM after fade out
          setTimeout(() => {
            videoBanner.style.display = "none";
            console.log("🎬 Banner hidden, video is now visible");
          }, 1000);
        });

        // Fallback: Hide banner and show controls if video takes too long to load
        setTimeout(() => {
          if (videoBanner.style.display !== "none") {
            console.log("🎬 Fallback: Hiding banner and showing controls after timeout");

            // Hide banner
            videoBanner.style.transition = "opacity 0.5s ease-in-out";
            videoBanner.style.opacity = "0";

            // Show video controls
            if (videoControls) {
              videoControls.style.visibility = "visible";
              videoControls.style.opacity = "1";
            }
            setTimeout(() => {
              videoBanner.style.display = "none";
            }, 500);
          }
        }, 8000); // 8 second fallback
      }

      // Set initial state - video starts playing and muted
      let isPlaying = true;
      let isMuted = true;

      // Initialize video state
      function initVideoState() {
        // Ensure video is muted initially for autoplay
        heroVideo.muted = true;

        // Try to play video
        heroVideo.play().then(() => {
          console.log("🎬 Video autoplay successful");
          isPlaying = true;
          updatePlayPauseUI();
        }).catch(e => {
          console.log("🎬 Video autoplay failed:", e);
          isPlaying = false;
          updatePlayPauseUI();
        });

        // Update UI to reflect initial state
        updateMuteUI();

        // Force initial UI update
        setTimeout(() => {
          updatePlayPauseUI();
          updateMuteUI();
        }, 100);
      }

      // Update play/pause button UI
      function updatePlayPauseUI() {
        console.log("🎬 Updating play/pause UI, isPlaying:", isPlaying);
        if (isPlaying) {
          playPauseBtn.classList.add("playing");
        } else {
          playPauseBtn.classList.remove("playing");
        }
      }

      // Update mute button UI
      function updateMuteUI() {
        console.log("🎬 Updating mute UI, isMuted:", isMuted);
        if (isMuted) {
          muteBtn.classList.remove("unmuted");
        } else {
          muteBtn.classList.add("unmuted");
        }
      }

      // Play/Pause functionality
      function togglePlayPause() {
        console.log("🎬 Toggling play/pause, current state:", isPlaying);
        if (isPlaying) {
          heroVideo.pause();
          isPlaying = false;
        } else {
          heroVideo.play().then(() => {
            isPlaying = true;
          }).catch(e => {
            console.log("🎬 Failed to play video:", e);
            isPlaying = false;
          });
        }
        updatePlayPauseUI();
      }

      // Mute/Unmute functionality
      function toggleMute() {
        console.log("🎬 Toggling mute, current state:", isMuted);
        if (isMuted) {
          heroVideo.muted = false;
          isMuted = false;
        } else {
          heroVideo.muted = true;
          isMuted = true;
        }
        updateMuteUI();
      }

      // Add event listeners
      playPauseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("🎬 Play/pause button clicked");
        togglePlayPause();
      });
      muteBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("🎬 Mute button clicked");
        toggleMute();
      });

      // Video event listeners
      heroVideo.addEventListener("play", function () {
        console.log("🎬 Video play event");
        isPlaying = true;
        updatePlayPauseUI();
      });
      heroVideo.addEventListener("pause", function () {
        console.log("🎬 Video pause event");
        isPlaying = false;
        updatePlayPauseUI();
      });
      heroVideo.addEventListener("ended", function () {
        console.log("🎬 Video ended, restarting");
        // Restart video when it ends
        heroVideo.currentTime = 0;
        heroVideo.play();
      });

      // Initialize video controls
      initVideoState();

      // Initialize banner-to-video transition
      handleBannerToVideoTransition();
      console.log("🎬 Hero video controls initialized");
    }

    // Initialize hero video controls with error handling
    try {
      initHeroVideoControls();
    } catch (error) {
      console.log("⚠️ Video controls initialization failed:", error);
      // Fallback: Simple video controls without complex state management
      initSimpleVideoControls();
    }

    // Fallback video controls function
    function initSimpleVideoControls() {
      const heroVideo = document.getElementById("heroVideo");
      const playPauseBtn = document.querySelector(".play-pause");
      const muteBtn = document.querySelector(".mute");
      if (!heroVideo || !playPauseBtn || !muteBtn) {
        console.log("🎬 Simple video controls not found");
        return;
      }
      console.log("🎬 Initializing simple video controls");

      // Simple play/pause toggle
      playPauseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (heroVideo.paused) {
          heroVideo.play();
          playPauseBtn.classList.add("playing");
        } else {
          heroVideo.pause();
          playPauseBtn.classList.remove("playing");
        }
      });

      // Simple mute toggle
      muteBtn.addEventListener("click", function (e) {
        e.preventDefault();
        heroVideo.muted = !heroVideo.muted;
        if (heroVideo.muted) {
          muteBtn.classList.remove("unmuted");
        } else {
          muteBtn.classList.add("unmuted");
        }
      });

      // Set initial state
      heroVideo.muted = true;
      playPauseBtn.classList.add("playing");
      muteBtn.classList.remove("unmuted");
      console.log("🎬 Simple video controls initialized");
    }

    // Initialize Blog Slider with Custom Navigation
    if ($(".blog-slider").length > 0) {
      const blogSlider = $(".blog-slider").owlCarousel({
        loop: true,
        margin: 40,
        nav: false,
        // Disable default navigation
        dots: true,
        // Disable default dots
        center: true,
        stagePadding: 320,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 800,
        responsive: {
          0: {
            items: 1,
            stagePadding: 20,
            margin: 20
          },
          768: {
            items: 1,
            stagePadding: 100,
            margin: 30
          },
          1024: {
            items: 1,
            stagePadding: 320,
            margin: 40
          }
        }
      });

      // Custom Navigation Controls
      const prevBtn = $(".blog-nav-prev");
      const nextBtn = $(".blog-nav-next");

      // Previous button
      prevBtn.on("click", function () {
        blogSlider.trigger("prev.owl.carousel");
      });

      // Next button
      nextBtn.on("click", function () {
        blogSlider.trigger("next.owl.carousel");
      });

      // Custom Pagination Dots
      const dotsContainer = $(".blog-dots");

      // Create dots based on number of items
      blogSlider.on("initialized.owl.carousel", function (event) {
        const itemCount = event.item.count;
        dotsContainer.empty();
        for (let i = 0; i < itemCount; i++) {
          const dot = $('<span class="owl-dot"></span>');
          if (i === 0) dot.addClass("active");
          dotsContainer.append(dot);
        }
      });

      // Handle dot clicks
      dotsContainer.on("click", ".owl-dot", function () {
        const index = $(this).index();
        blogSlider.trigger("to.owl.carousel", [index, 300]);
      });

      // Update active dot on slide change
      blogSlider.on("changed.owl.carousel", function (event) {
        $(".owl-dot").removeClass("active");
        $(".owl-dot").eq(event.item.index).addClass("active");
      });

      // Pause autoplay on hover
      $(".blog-slider-container").hover(function () {
        blogSlider.trigger("stop.owl.autoplay");
      }, function () {
        blogSlider.trigger("play.owl.autoplay");
      });
      console.log("✅ Blog slider initialized with custom navigation");
    }
  });
});

// *****************************************
// **    ACCOMMODATION TAB CONTROLLER     **
// *****************************************

document.addEventListener("DOMContentLoaded", function () {
  // Tab switching functionality
  const tabButtons = document.querySelectorAll(".tab-button");
  const roomContents = document.querySelectorAll(".room-content");

  // Thumbnail image switching functionality with smooth transitions
  const thumbnails = document.querySelectorAll(".thumbnail");
  if (thumbnails.length > 0) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click", () => {
        const mainImageSrc = thumbnail.getAttribute("data-main");
        const roomContent = thumbnail.closest(".room-content");
        const mainImage = roomContent ? roomContent.querySelector(".main-image") : null;
        if (mainImage && mainImageSrc && mainImage.src !== mainImageSrc) {
          // Add fade out effect
          mainImage.style.opacity = "0.3";
          mainImage.style.transition = "opacity 0.3s ease-in-out";

          // Change image after fade out
          setTimeout(() => {
            mainImage.src = mainImageSrc;
            // Fade in new image
            mainImage.style.opacity = "1";
          }, 150);

          // Remove active class from all thumbnails in this room
          const roomThumbnails = roomContent.querySelectorAll(".thumbnail");
          roomThumbnails.forEach(thumb => thumb.classList.remove("active"));

          // Add active class to clicked thumbnail
          thumbnail.classList.add("active");
        }
      });
    });

    // Set first thumbnail as active for each room
    const roomContents = document.querySelectorAll(".room-content");
    roomContents.forEach(roomContent => {
      const firstThumbnail = roomContent.querySelector(".thumbnail");
      if (firstThumbnail) {
        firstThumbnail.classList.add("active");
      }
    });
  }

  // Auto-slideshow functionality for room images
  function initAutoSlideshow() {
    const activeRoomContent = document.querySelector(".room-content.active");
    if (!activeRoomContent) return;
    const thumbnails = activeRoomContent.querySelectorAll(".thumbnail");
    const mainImage = activeRoomContent.querySelector(".main-image");
    if (thumbnails.length <= 1 || !mainImage) return;
    let currentIndex = 0;
    const slideInterval = 4000; // 4 seconds

    const autoSlide = setInterval(() => {
      // Only auto-slide if the room is still active
      if (!activeRoomContent.classList.contains("active")) {
        clearInterval(autoSlide);
        return;
      }
      currentIndex = (currentIndex + 1) % thumbnails.length;
      const nextThumbnail = thumbnails[currentIndex];
      const nextImageSrc = nextThumbnail.getAttribute("data-main");
      if (nextImageSrc && mainImage.src !== nextImageSrc) {
        // Smooth transition
        mainImage.style.opacity = "0.7";
        mainImage.style.transition = "opacity 0.4s ease-in-out";
        setTimeout(() => {
          mainImage.src = nextImageSrc;
          mainImage.style.opacity = "1";
        }, 200);

        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove("active"));
        nextThumbnail.classList.add("active");
      }
    }, slideInterval);

    // Store interval ID to clear when tab changes
    activeRoomContent.setAttribute("data-slideshow-id", autoSlide);
  }

  // Start auto-slideshow for initially active room
  initAutoSlideshow();

  // Enhanced tab switching with slideshow management
  if (tabButtons.length > 0 && roomContents.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Clear existing slideshows
        roomContents.forEach(content => {
          const slideshowId = content.getAttribute("data-slideshow-id");
          if (slideshowId) {
            clearInterval(parseInt(slideshowId));
            content.removeAttribute("data-slideshow-id");
          }
        });

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove("active"));
        roomContents.forEach(content => content.classList.remove("active"));

        // Add active class to clicked button
        button.classList.add("active");

        // Show corresponding content
        const tabId = button.getAttribute("data-tab");
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
          targetContent.classList.add("active");

          // Start new slideshow for the active room
          setTimeout(() => {
            initAutoSlideshow();
          }, 500);
        }
      });
    });
  }
});

// *****************************************
// **    ACCOMMODATION MARQUEE SLIDERS     **
// *****************************************

// Infinite sliding gallery functionality for dining and yoga galleries
function initAccommodationMarqueeSliders() {
  // Dining slider - moves left
  const diningSlider = document.querySelector(".dining-slider");
  // Yoga slider - moves right
  const yogaSlider = document.querySelector(".yoga-slider");

  // Function to create infinite sliding effect
  function createInfiniteSlider(slider, direction = "left", speed = 30) {
    if (!slider) return;

    // Check if slider has content
    const sliderItems = slider.querySelectorAll("li");
    if (sliderItems.length === 0) {
      console.log("⚠️ No slider items found for infinite slider");
      return;
    }

    // Calculate item width based on screen size
    const screenWidth = window.innerWidth;
    let itemWidth = 340;
    let gap = 0; // No gap between items for seamless loop

    if (screenWidth <= 480) {
      itemWidth = 240;
    } else if (screenWidth <= 768) {
      itemWidth = 280;
    }

    // Create wrapper for infinite sliding
    const wrapper = document.createElement("div");
    wrapper.className = "infinite-slider-wrapper";

    // Clone the original content multiple times to ensure seamless loop
    const originalContent = slider.innerHTML;

    // Create THREE sets for truly seamless infinite scroll
    const numberOfSets = 3;
    let setsHTML = "";
    for (let setIndex = 0; setIndex < numberOfSets; setIndex++) {
      setsHTML += `<div class="slider-set" data-set="${setIndex}">${originalContent}</div>`;
    }
    wrapper.innerHTML = setsHTML;

    // Calculate total width of one set
    const itemsPerSet = sliderItems.length;
    const setWidth = itemsPerSet * itemWidth;

    // Style the wrapper for seamless infinite scroll
    wrapper.style.cssText = `
			display: flex;
			width: ${numberOfSets * 100}%;
			animation: infinite-slide-${direction} ${speed}s linear infinite;
			align-items: flex-start;
			gap: 0;
		`;

    // Apply proper spacing to all sets
    const allSets = wrapper.querySelectorAll(".slider-set");
    allSets.forEach((set, setIndex) => {
      set.style.cssText = `
				display: flex;
				width: ${100 / numberOfSets}%;
				align-items: flex-start;
				flex-shrink: 0;
				gap: 0;
			`;
      const listItems = set.querySelectorAll("li");
      listItems.forEach((item, index) => {
        // Apply width and ensure no spacing issues for seamless loop
        item.style.cssText = `
					width: ${itemWidth}px;
					flex-shrink: 0;
					box-sizing: border-box;
					display: inline-block;
					vertical-align: top;
					position: relative;
					margin: 0;
					padding: 0;
				`;
      });
    });

    // Clear slider and add wrapper
    slider.innerHTML = "";
    slider.appendChild(wrapper);

    // Set up slider container styles
    slider.style.cssText = `
			overflow: hidden;
			width: 100%;
			position: relative;
		`;

    // Enhanced hover pause functionality with smooth transitions
    slider.addEventListener("mouseenter", function () {
      wrapper.style.animationPlayState = "paused";
      slider.style.filter = "brightness(1.05)";
      slider.style.transition = "filter 0.3s ease";
    });
    slider.addEventListener("mouseleave", function () {
      wrapper.style.animationPlayState = "running";
      slider.style.filter = "brightness(1)";
    });

    // Add touch support for mobile
    let isTouching = false;
    slider.addEventListener("touchstart", function () {
      isTouching = true;
      wrapper.style.animationPlayState = "paused";
    });
    slider.addEventListener("touchend", function () {
      isTouching = false;
      setTimeout(() => {
        if (!isTouching) {
          wrapper.style.animationPlayState = "running";
        }
      }, 1000);
    });

    // Add resize handler to update width
    const updateSpacing = () => {
      const screenWidth = window.innerWidth;
      let newItemWidth = 340;
      if (screenWidth <= 480) {
        newItemWidth = 240;
      } else if (screenWidth <= 768) {
        newItemWidth = 280;
      }
      const allSets = wrapper.querySelectorAll(".slider-set");
      allSets.forEach(set => {
        const listItems = set.querySelectorAll("li");
        listItems.forEach(item => {
          item.style.width = `${newItemWidth}px`;
        });
      });
    };
    window.addEventListener("resize", updateSpacing);

    // Add individual image hover pause for better UX
    const images = wrapper.querySelectorAll(".image, img");
    images.forEach(image => {
      image.addEventListener("mouseenter", function () {
        wrapper.style.animationPlayState = "paused";
      });
      image.addEventListener("mouseleave", function () {
        // Only resume if not hovering over the main slider
        if (!slider.matches(":hover")) {
          wrapper.style.animationPlayState = "running";
        }
      });
    });
  }

  // Initialize dining slider (left direction)
  if (diningSlider) {
    createInfiniteSlider(diningSlider, "left", 25);
    console.log("✅ Dining infinite slider initialized (left direction)");
  }

  // Initialize yoga slider (right direction)
  if (yogaSlider) {
    createInfiniteSlider(yogaSlider, "right", 30);
    console.log("✅ Yoga infinite slider initialized (right direction)");
  }
}

// Initialize marquee sliders when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on accommodation page
  if (document.querySelector(".accommodation-template")) {
    initAccommodationMarqueeSliders();
  }
});

// *****************************************
// **    AYURVEDA THERAPIES OVERLAY SYSTEM    **
// *****************************************

// Therapy data for modal
const therapyData = [{
  title: "Panchakarma Detox",
  description: 'Panchakarma, meaning "five actions," is Ayurveda\'s most comprehensive detox treatment. It focuses on eliminating toxins from the body through five core purification methods for complete wellness and rejuvenation.',
  features: ["<strong>Process:</strong> Over several days, our Ayurvedic physicians guide you through personalized therapies, including herbal oil massages (Abhyanga), steam baths (Swedana), and medicated enemas.", "<strong>Benefits:</strong> Panchakarma removes deep-seated toxins, improves digestion, strengthens the immune system, and restores your body's natural balance.", "<strong>Inclusions:</strong> Daily doctor consultations, individual treatments based on your dosha, herbal supplements, and a personalized Ayurvedic meal plan."]
}, {
  title: "Rejuvenation Therapies",
  description: "Specialized rejuvenation therapies designed to restore vitality, enhance natural beauty, and promote long-lasting wellness through traditional Ayurvedic practices and modern therapeutic techniques.",
  features: ["<strong>Process:</strong> Customized treatment plans including abhyanga massages, herbal facials, specialized oils, and meditation practices.", "<strong>Benefits:</strong> Improves skin texture, reduces stress, enhances mental clarity, and promotes overall vitality and youthful energy.", "<strong>Inclusions:</strong> Daily treatments, herbal supplements, yoga sessions, and personalized lifestyle guidance for lasting results."]
}, {
  title: "Stress Relief Program",
  description: "Comprehensive stress relief program combining ancient Ayurvedic wisdom with modern therapeutic approaches to restore mental peace, emotional balance, and inner tranquility for lasting wellness.",
  features: ["<strong>Process:</strong> Meditation sessions, breathing techniques, therapeutic massages, stress-reducing herbal treatments, and mindfulness practices.", "<strong>Benefits:</strong> Reduces anxiety, improves sleep quality, enhances mental clarity, and builds resilience against daily stress factors.", "<strong>Inclusions:</strong> Daily meditation sessions, stress-relief treatments, herbal teas, and personal counseling for sustainable stress management."]
}];

// Initialize therapies overlay system
function initTherapiesOverlaySystem() {
  console.log("🎭 Initializing therapies overlay system");
  const slides = document.querySelectorAll(".therapies-slide");
  const overlays = document.querySelectorAll(".slide_active_overlay");
  if (slides.length === 0) {
    console.log("⚠️ No therapies slides found");
    return;
  }
  let activeOverlay = null;
  let activeSlideIndex = null;

  // Add click handlers for discover buttons
  slides.forEach((slide, index) => {
    const discoverBtn = slide.querySelector(".see-more-btn");
    const overlay = slide.querySelector(".slide_active_overlay");
    const closeBtn = overlay ? overlay.querySelector(".close-btn") : null;
    if (discoverBtn) {
      // Discover button click handler
      discoverBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`🎭 Opening therapy details for slide ${index + 1}`);

        // Check if mobile - use Bootstrap modal
        if (window.innerWidth <= 768) {
          openMobileModal(index);
        } else {
          // Desktop - use overlay system
          // Close any currently active overlay (including the same one)
          if (activeOverlay) {
            closeOverlay(activeOverlay);
            // If clicking the same overlay that's already open, just close it
            if (activeOverlay === overlay) {
              activeOverlay = null;
              activeSlideIndex = null;
              return;
            }
          }

          // Close all other overlays to ensure clean state
          const allOverlays = document.querySelectorAll(".slide_active_overlay");
          allOverlays.forEach(otherOverlay => {
            if (otherOverlay !== overlay && otherOverlay.classList.contains("active")) {
              closeOverlay(otherOverlay);
            }
          });

          // Open this overlay
          openOverlay(overlay, index);
          activeOverlay = overlay;
          activeSlideIndex = index;
        }
      });
    }
    if (closeBtn && overlay) {
      // Close button click handler
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`🎭 Closing overlay for slide ${index + 1}`);
        closeOverlay(overlay);
        if (activeOverlay === overlay) {
          activeOverlay = null;
          activeSlideIndex = null;
        }
      });
    }

    // Add hover handler for auto-close (desktop only)
    if (window.innerWidth > 768) {
      slide.addEventListener("mouseenter", function () {
        // If another overlay is active and we're hovering a different slide
        if (activeOverlay && activeSlideIndex !== null && activeSlideIndex !== index) {
          console.log(`🎭 Auto-closing overlay due to hover on slide ${index + 1}`);
          closeOverlay(activeOverlay);
          activeOverlay = null;
          activeSlideIndex = null;
        }
      });

      // Add additional cleanup when slide loses focus
      slide.addEventListener("mouseleave", function () {
        // Small delay to prevent flickering when moving between slides
        setTimeout(() => {
          // Check if we're still within the slider container
          const sliderContainer = document.querySelector(".therapies-slider");
          if (sliderContainer && !sliderContainer.matches(":hover")) {
            if (activeOverlay && activeSlideIndex === index) {
              console.log(`🎭 Auto-closing overlay due to leaving slide ${index + 1}`);
              closeOverlay(activeOverlay);
              activeOverlay = null;
              activeSlideIndex = null;
            }
          }
        }, 100);
      });
    }
  });

  // Add escape key handler
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && activeOverlay) {
      console.log("🎭 Closing overlay with Escape key");
      closeOverlay(activeOverlay);
      activeOverlay = null;
      activeSlideIndex = null;
    }
  });

  // Add slider container leave handler to close overlays when leaving slider area
  const sliderContainer = document.querySelector(".therapies-slider");
  if (sliderContainer && window.innerWidth > 768) {
    sliderContainer.addEventListener("mouseleave", function () {
      if (activeOverlay) {
        console.log("🎭 Auto-closing overlay due to leaving slider area");
        closeOverlay(activeOverlay);
        activeOverlay = null;
        activeSlideIndex = null;
      }
    });
  }

  // Function to close all overlays (utility function)
  function closeAllOverlays() {
    const allOverlays = document.querySelectorAll(".slide_active_overlay");
    allOverlays.forEach(overlay => {
      if (overlay.classList.contains("active")) {
        closeOverlay(overlay);
      }
    });
    activeOverlay = null;
    activeSlideIndex = null;
    console.log("🎭 All overlays closed");
  }

  // Make closeAllOverlays available globally for debugging
  window.closeAllTherapyOverlays = closeAllOverlays;
  console.log("✅ Therapies overlay system initialized");
}

// Open mobile modal with therapy content
function openMobileModal(therapyIndex) {
  const modal = document.getElementById("therapiesModal");
  const modalTitle = document.getElementById("therapiesModalLabel");
  const modalBody = document.getElementById("therapiesModalBody");
  if (!modal || !modalTitle || !modalBody) {
    console.log("⚠️ Modal elements not found");
    return;
  }
  const therapy = therapyData[therapyIndex];
  if (!therapy) {
    console.log("⚠️ Therapy data not found for index:", therapyIndex);
    return;
  }

  // Set modal content
  modalTitle.textContent = therapy.title;

  // Build modal body content
  let modalContent = `
		<div class="therapy-modal-content">
			<p class="therapy-description mb-4">${therapy.description}</p>
			<div class="therapy-features">
				<ul class="list-unstyled">
	`;
  therapy.features.forEach(feature => {
    modalContent += `<li class="mb-3">${feature}</li>`;
  });
  modalContent += `
				</ul>
			</div>
		</div>
	`;
  modalBody.innerHTML = modalContent;

  // Show modal using Bootstrap
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
  console.log(`📱 Opened mobile modal for therapy: ${therapy.title}`);
}

// Open overlay with smooth animation
function openOverlay(overlay, slideIndex) {
  if (!overlay) return;

  // Remove any existing closing class
  overlay.classList.remove("closing");

  // Add active class for smooth slide-up animation
  overlay.classList.add("active");

  // Optional: Add body scroll lock for better UX
  document.body.style.overflow = "hidden";
  console.log(`🎭 Overlay opened for slide ${slideIndex + 1}`);
}

// Close overlay with smooth animation
function closeOverlay(overlay) {
  if (!overlay) return;

  // Add closing class for smooth slide-down animation
  overlay.classList.add("closing");
  overlay.classList.remove("active");

  // Re-enable body scroll after animation completes
  setTimeout(() => {
    document.body.style.overflow = "";
    // Remove closing class after animation
    overlay.classList.remove("closing");
  }, 500); // Match CSS transition duration

  console.log("🎭 Overlay closed with smooth animation");
}

// Legacy functions for backward compatibility (can be removed later)
function showMoreContent(button) {
  const slide = button.closest(".therapies-slide");
  if (!slide) return;
  const overlay = slide.querySelector(".slide_active_overlay");
  if (overlay) {
    openOverlay(overlay);
  }
}
function hideMoreContent(button) {
  const slide = button.closest(".therapies-slide");
  if (!slide) return;
  const overlay = slide.querySelector(".slide_active_overlay");
  if (overlay) {
    closeOverlay(overlay);
  }
}

// *****************************************
// **       ANIMATIONS IMPORTED           **
// *****************************************
// All GSAP animations are now in sources/js/animations.js
// This file is automatically included by gulp build process

// *****************************************
// **    ROOMS TEMPLATE ACCORDION         **
// *****************************************

// Initialize Bootstrap accordion for rooms template
function initRoomsAccordion() {
  const accordionElement = document.getElementById("amenitiesAccordion");
  if (!accordionElement) {
    console.log("🏠 Rooms accordion not found");
    return;
  }
  console.log("🏠 Initializing rooms accordion");

  // Get all accordion buttons
  const accordionButtons = accordionElement.querySelectorAll(".accordion-button");

  // Add click event listeners for custom behavior
  accordionButtons.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      console.log(`🏠 Accordion item ${index + 1} clicked`);

      // Bootstrap will handle the collapse/expand automatically
      // We can add custom logic here if needed
    });
  });

  // Listen for Bootstrap accordion events
  accordionElement.addEventListener("show.bs.collapse", function (event) {
    console.log("🏠 Accordion item opening:", event.target.id);
  });
  accordionElement.addEventListener("shown.bs.collapse", function (event) {
    console.log("🏠 Accordion item opened:", event.target.id);
  });
  accordionElement.addEventListener("hide.bs.collapse", function (event) {
    console.log("🏠 Accordion item closing:", event.target.id);
  });
  accordionElement.addEventListener("hidden.bs.collapse", function (event) {
    console.log("🏠 Accordion item closed:", event.target.id);
  });
  console.log("✅ Rooms accordion initialized");
}

// *****************************************
// **    MASONRY GALLERY SYSTEM          **
// *****************************************

// Advanced Masonry Gallery with Optimized Loading
function initMasonryGallery() {
  const galleryContainer = document.getElementById("masonry-gallery");
  const skeletonContainer = document.getElementById("gallery-skeleton");
  console.log("🖼️ Attempting to initialize masonry gallery");
  console.log("🖼️ Gallery container:", galleryContainer);
  console.log("🖼️ Skeleton container:", skeletonContainer);
  if (!galleryContainer) {
    console.log("🖼️ Masonry gallery not found");
    return;
  }
  console.log("🖼️ Initializing masonry gallery");

  // Gallery state management
  let galleryState = {
    isLoading: true,
    imagesLoaded: 0,
    totalImages: 0,
    images: []
  };

  // Show skeleton loading initially
  function showSkeletonLoading() {
    console.log("🖼️ Showing skeleton loading");
    if (skeletonContainer) {
      skeletonContainer.classList.add("loading");
      skeletonContainer.style.display = "block";
    }
    if (galleryContainer) {
      galleryContainer.style.opacity = "0";
      galleryContainer.style.pointerEvents = "none";
    }
  }

  // Hide skeleton and show gallery
  function hideSkeletonLoading() {
    console.log("🖼️ Hiding skeleton loading");
    if (skeletonContainer) {
      skeletonContainer.classList.remove("loading");
      skeletonContainer.style.display = "none";
    }
    if (galleryContainer) {
      galleryContainer.style.opacity = "1";
      galleryContainer.style.pointerEvents = "auto";
    }
  }

  // Optimized image loading with progressive enhancement
  function initOptimizedImageLoading() {
    const images = galleryContainer.querySelectorAll(".brick-image");
    galleryState.totalImages = images.length;
    galleryState.images = Array.from(images);
    if (galleryState.totalImages === 0) {
      console.log("🖼️ No images found in gallery");
      hideSkeletonLoading();
      return;
    }
    console.log(`🖼️ Found ${galleryState.totalImages} images in gallery`);

    // Debug: Log all image sources
    images.forEach((img, index) => {
      console.log(`🖼️ Image ${index + 1}:`, {
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        hasError: img.src === "" || img.src.includes("undefined")
      });
    });
    showSkeletonLoading();

    // Check if images are already loaded
    images.forEach((img, index) => {
      // Add loading class initially
      img.classList.add("loading");

      // Check if image is already loaded
      if (img.complete && img.naturalHeight !== 0) {
        // Image is already loaded
        setTimeout(() => loadImage(img), index * 100); // Stagger the animations
      } else {
        // Image is still loading
        img.addEventListener("load", () => {
          setTimeout(() => loadImage(img), index * 100); // Stagger the animations
        });
        img.addEventListener("error", () => {
          console.log("🖼️ Failed to load image:", img.src);
          img.classList.remove("loading");
          img.classList.add("error");
          galleryState.imagesLoaded++;
          updateLoadingProgress();
        });
      }
    });

    // Fallback: if no images load after 1 second, hide skeleton anyway
    setTimeout(() => {
      if (galleryState.isLoading) {
        console.log("🖼️ Fallback: Hiding skeleton after timeout");
        hideSkeletonLoading();
        galleryState.isLoading = false;

        // Force show all images and make them visible
        images.forEach(img => {
          img.classList.remove("loading");
          img.classList.add("loaded");
          img.style.opacity = "1";
          img.style.visibility = "visible";
        });

        // Force gallery to be visible
        galleryContainer.style.opacity = "1";
        galleryContainer.style.display = "block";
        galleryContainer.style.visibility = "visible";
      }
    }, 1000);
  }

  // Load individual image with error handling
  function loadImage(imgElement) {
    // Images already have src attribute, so we don't need lazy loading for them
    // Just mark them as loaded and add animation
    if (imgElement.dataset.loaded === "true") {
      return;
    }
    imgElement.dataset.loaded = "true";
    imgElement.classList.remove("loading");
    imgElement.classList.add("loaded");

    // Add entrance animation
    animateImageEntrance(imgElement);

    // Track loading progress
    galleryState.imagesLoaded++;
    updateLoadingProgress();
    console.log(`🖼️ Image ${galleryState.imagesLoaded} loaded successfully`);
  }

  // Update loading progress and hide skeleton when done
  function updateLoadingProgress() {
    const progress = galleryState.imagesLoaded / galleryState.totalImages * 100;
    console.log(`🖼️ Loading progress: ${Math.round(progress)}%`);

    // Hide skeleton when most images are loaded
    if (galleryState.imagesLoaded >= Math.ceil(galleryState.totalImages * 0.6)) {
      if (galleryState.isLoading) {
        galleryState.isLoading = false;
        hideSkeletonLoading();

        // Animate gallery appearance
        animateGalleryEntrance();
      }
    }
  }

  // Animate individual image entrance
  function animateImageEntrance(imgElement) {
    const brick = imgElement.closest(".brick");
    if (!brick) return;

    // Use GSAP if available, fallback to CSS
    if (typeof gsap !== "undefined") {
      gsap.fromTo(brick, {
        opacity: 0,
        y: 30,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: Math.random() * 0.3 // Stagger effect
      });
    } else {
      brick.style.animation = "fadeInUp 0.6s ease-out forwards";
    }
  }

  // Animate gallery entrance
  function animateGalleryEntrance() {
    const bricks = galleryContainer.querySelectorAll(".brick");
    if (typeof gsap !== "undefined") {
      gsap.from(bricks, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
    console.log("✅ Gallery fully loaded and animated");
  }

  // Initialize all gallery functionality
  function init() {
    initOptimizedImageLoading();

    // Add hover effects
    initHoverEffects();

    // Emergency fallback - ensure images are visible after 200ms
    setTimeout(() => {
      const images = galleryContainer.querySelectorAll(".brick-image");
      let fixedImages = 0;
      images.forEach(img => {
        if (img.classList.contains("loading") || img.style.opacity !== "1") {
          console.log("🖼️ Emergency: Making image visible", img.src);
          img.classList.remove("loading");
          img.classList.add("loaded");
          img.style.opacity = "1";
          img.style.visibility = "visible";
          img.style.display = "block";
          fixedImages++;
        }
      });
      if (fixedImages > 0) {
        console.log(`🖼️ Emergency fix applied to ${fixedImages} images`);
      }

      // Make sure gallery is visible
      galleryContainer.style.opacity = "1";
      galleryContainer.style.display = "block";
      galleryContainer.style.visibility = "visible";

      // Hide skeleton if still showing
      if (skeletonContainer && skeletonContainer.classList.contains("loading")) {
        hideSkeletonLoading();
        galleryState.isLoading = false;
      }
    }, 200);
    console.log("✅ Masonry gallery fully initialized");
  }

  // Initialize hover effects
  function initHoverEffects() {
    const bricks = galleryContainer.querySelectorAll(".brick");
    bricks.forEach(brick => {
      brick.addEventListener("mouseenter", () => {
        if (typeof gsap !== "undefined") {
          gsap.to(brick, {
            y: -8,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
      brick.addEventListener("mouseleave", () => {
        if (typeof gsap !== "undefined") {
          gsap.to(brick, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    });
  }

  // Start initialization
  init();
}

// *****************************************
// **    AYURVEDA IMMUNITY SECTION        **
// *****************************************

// Initialize immunity section animation
function initImmunitySectionAnimation() {
  // Skip initialization on mobile devices (768px and below)
  if (window.innerWidth <= 768) {
    console.log("🏥 Skipping immunity section animation on mobile");
    return;
  }
  const immunitySection = document.querySelector(".immunity_section");
  const firstItem = document.querySelector(".immunity_section .single_item.first");
  if (!immunitySection || !firstItem) {
    console.log("🏥 Immunity section or first item not found");
    return;
  }
  console.log("🏥 Initializing immunity section animation (desktop only)");

  // Create intersection observer
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -20% 0px",
    // Trigger when 20% of the section is visible
    threshold: 0.3 // Trigger when 30% of the element is visible
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("🏥 Immunity section is now visible, showing first item");
        // Add show class to trigger opacity animation
        firstItem.classList.add("show");

        // Optionally unobserve after first trigger (remove this if you want it to trigger every time)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Start observing the immunity section
  observer.observe(immunitySection);
  console.log("✅ Immunity section animation initialized (desktop only).");
}

// *****************************************
// **    PAGE-SPECIFIC IMPLEMENTATIONS    **
// *****************************************

// Prevent weird scroll restoration behavior
window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);

// Remove loading class after page loads
document.documentElement.classList.add("is-loading");
window.addEventListener("load", () => {
  document.documentElement.classList.remove("is-loading");
});

// Start the initialization process
document.addEventListener("DOMContentLoaded", function () {
  // Accommodation Template Animation
  waitForGSAPAndInit(".accommodation-template", {
    debug: false,
    // Disable debug for production
    duration: 2.5,
    textScaling: {
      enabled: true,
      endScale: 0.7,
      // Scale down to 70%
      animationStart: 0.5 // Start scaling when image is 50% expanded (longer duration)
    }
  });

  // Ayurveda Template Animation
  waitForGSAPAndInit(".ayurveda-template", {
    debug: false,
    // Disable debug for production
    duration: 3,
    // Slightly slower animation
    ease: "power2.out",
    textScaling: {
      enabled: true,
      endScale: 0.75,
      // Scale down to 75%
      animationStart: 0.4,
      // Start scaling when image is 40% expanded (much longer duration)
      ease: "power3.out" // Different easing for text
    }
  });

  // About Us Template Animation
  waitForGSAPAndInit(".aboutus-template", {
    debug: false,
    // Disable debug for production
    duration: 2.8,
    // Medium animation speed
    ease: "power2.inOut",
    textScaling: {
      enabled: true,
      endScale: 0.8,
      // Scale down to 80% (less dramatic)
      animationStart: 0.55,
      // Start scaling when image is 55% expanded
      ease: "power2.out" // Smooth easing for text
    }
  });

  // Serene Title Animation (Accommodation page)
  waitForGSAPAndInitSerene(".accommodation-template", {
    // debug: true,
  });

  // Immunity Section Animation (Ayurveda page)
  waitForGSAPAndInitImmunity(".ayurveda-template", {
    debug: false // Disable debug for production
  });

  // Rooms Template Animation
  waitForGSAPAndInit(".rooms-template", {
    debug: false,
    duration: 2.5,
    ease: "power2.inOut",
    textScaling: {
      enabled: true,
      endScale: 0.7,
      // Scale down to 70%
      animationStart: 0.5 // Start scaling when image is 50% expanded
    }
  });

  // Initialize rooms accordion
  initRoomsAccordion();

  // Initialize masonry gallery - only if on rooms template
  if (document.querySelector(".rooms-template")) {
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
      initMasonryGallery();
    }, 100);
  }

  // Initialize Ayurveda immunity section animation - only if on ayurveda template
  if (document.querySelector(".ayurveda-template")) {
    initImmunitySectionAnimation();
    // Initialize therapies overlay system
    initTherapiesOverlaySystem();
  }

  // ⭐ ADD THIS NEW LINE - Serene Bottom Image Animation
  waitForGSAPAndInitSereneImage(".accommodation-template", {
    debug: false,
    scrub: 1,
    upperMiddleImage: {
      moveDistance: -30,
      // Down 30px
      ease: "power2.out"
    },
    upperRightImage: {
      moveDistance: -30,
      // Up 30px
      ease: "power2.out"
    },
    middleImage: {
      moveDistance: -100,
      ease: "power2.out" // Up 100px
    },
    leftImage: {
      moveDistance: -70,
      ease: "power2.out" // Up 70px
    }
  });

  // Example: Home Template Animation (uncomment to use)
  // waitForGSAPAndInit(".home-template", {
  //     debug: false,
  //     duration: 2,
  //     circle: { endRadius: 120 } // Bigger circle for home page
  // });
});
document.addEventListener("DOMContentLoaded", function () {
  // Initialize dining slider (slides left)
  initializeSlider(".dining-slider", "left", 40);

  // Initialize yoga slider (slides right)
  initializeSlider(".yoga-slider", "right", 45);
});
function initializeSlider(sliderSelector, direction, duration) {
  const slider = document.querySelector(sliderSelector);
  if (!slider) return;
  const items = slider.querySelectorAll("li");
  if (items.length === 0) return;

  // Store original items before clearing
  const originalItems = Array.from(items);

  // Clear existing content
  slider.innerHTML = "";

  // Create wrapper for infinite scroll
  const wrapper = document.createElement("div");
  wrapper.classList.add("infinite-slider-wrapper");

  // Create first set
  const firstSet = document.createElement("div");
  firstSet.classList.add("slider-set");

  // Add all items to first set
  originalItems.forEach(item => {
    const clonedItem = item.cloneNode(true);
    firstSet.appendChild(clonedItem);
  });

  // Create second set (exact duplicate for seamless loop)
  const secondSet = document.createElement("div");
  secondSet.classList.add("slider-set");

  // Add all items to second set
  originalItems.forEach(item => {
    const clonedItem = item.cloneNode(true);
    secondSet.appendChild(clonedItem);
  });

  // Append both sets to wrapper
  wrapper.appendChild(firstSet);
  wrapper.appendChild(secondSet);

  // Append wrapper to slider
  slider.appendChild(wrapper);

  // Wait for images to load and DOM to be ready
  setTimeout(() => {
    // Set animation based on direction
    const animationName = direction === "left" ? "infinite-slide-left" : "infinite-slide-right";
    wrapper.style.animation = `${animationName} ${duration}s linear infinite`;

    // Pause animation on hover
    slider.addEventListener("mouseenter", () => {
      wrapper.style.animationPlayState = "paused";
    });
    slider.addEventListener("mouseleave", () => {
      wrapper.style.animationPlayState = "running";
    });
  }, 100);
}

// Optional: Add room tabs functionality if not already present
document.addEventListener("DOMContentLoaded", function () {
  // Room tabs functionality
  const tabButtons = document.querySelectorAll(".tab-button");
  const roomContents = document.querySelectorAll(".room-content");
  tabButtons.forEach(button => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove("active"));
      roomContents.forEach(content => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      const activeContent = document.getElementById(tabId);
      if (activeContent) {
        activeContent.classList.add("active");
      }
    });
  });

  // Thumbnail click functionality for room images
  document.querySelectorAll(".thumbnail").forEach(thumbnail => {
    thumbnail.addEventListener("click", function () {
      const mainImageSrc = this.getAttribute("data-main");
      const container = this.closest(".room-content");
      if (container) {
        const mainImage = container.querySelector(".main-image");
        if (mainImage && mainImageSrc) {
          // Fade out
          mainImage.style.opacity = "0";

          // Change image after fade
          setTimeout(() => {
            mainImage.src = mainImageSrc;
            // Fade in
            mainImage.style.opacity = "1";
          }, 400);

          // Update active thumbnail
          container.querySelectorAll(".thumbnail").forEach(thumb => {
            thumb.classList.remove("active");
          });
          this.classList.add("active");
        }
      }
    });
  });

  // Set first thumbnail as active for each room
  document.querySelectorAll(".room-content").forEach(room => {
    const firstThumbnail = room.querySelector(".thumbnail");
    if (firstThumbnail) {
      firstThumbnail.classList.add("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const brickImages = document.querySelectorAll(".brick-image");
  let currentImageIndex = 0;
  let imagesData = [];

  // Collect all images data
  brickImages.forEach((img, index) => {
    imagesData.push({
      fullSrc: img.dataset.fullSrc || img.src,
      alt: img.alt,
      caption: img.dataset.caption || ""
    });

    // Add click event to each image
    img.addEventListener("click", function () {
      openLightbox(index);
    });
  });
  function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }
  function closeLightbox() {
    lightboxModal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }
  function updateLightboxImage() {
    const imageData = imagesData[currentImageIndex];
    lightboxImage.src = imageData.fullSrc;
    lightboxImage.alt = imageData.alt;
    if (imageData.caption) {
      lightboxCaption.textContent = imageData.caption;
      lightboxCaption.style.display = "block";
    } else {
      lightboxCaption.style.display = "none";
    }

    // Show/hide navigation buttons based on position
    if (imagesData.length <= 1) {
      lightboxPrev.style.display = "none";
      lightboxNext.style.display = "none";
    } else {
      lightboxPrev.style.display = "flex";
      lightboxNext.style.display = "flex";
    }
  }
  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imagesData.length) % imagesData.length;
    updateLightboxImage();
  }
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesData.length;
    updateLightboxImage();
  }

  // Event Listeners
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", showPrevImage);
  lightboxNext.addEventListener("click", showNextImage);

  // Close lightbox when clicking outside the image
  lightboxModal.addEventListener("click", function (e) {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!lightboxModal.classList.contains("active")) return;
    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        showPrevImage();
        break;
      case "ArrowRight":
        showNextImage();
        break;
    }
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  lightboxModal.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  lightboxModal.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - show next
        showNextImage();
      } else {
        // Swiped right - show previous
        showPrevImage();
      }
    }
  }
});
})();

/******/ })()
;
//# sourceMappingURL=theme.js.map