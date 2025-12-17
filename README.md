<<<<<<< HEAD
# TravelViby Theme

A modern WordPress theme for travel and lifestyle websites.

## Features

- Responsive design with Bootstrap 5
- Advanced video hero sections with GSAP animations
- Modern mobile header with clip-path animations
- Smooth scrolling testimonials
- Custom carousel components
- SEO optimized

## Modern Mobile Header

The theme includes a professional mobile header system that replaces the default Bootstrap offcanvas menu with:

### Features:

- **Full-screen overlay** with smooth clip-path reveal animation
- **Morphing hamburger** that transforms into an X with GSAP
- **Staggered menu animations** for each navigation item
- **Backdrop blur effects** for modern visual appeal
- **Touch-friendly interactions** with hover effects
- **Responsive design** that adapts to different screen sizes
- **Accessibility support** with keyboard navigation (ESC key to close)

### Animation Details:

- Uses CSS `clip-path: circle()` for the reveal effect
- GSAP timeline animations for smooth transitions
- Custom hamburger lines that morph smoothly
- Menu items animate with scale, opacity, and position transforms
- Background content gets slightly blurred when menu is open

### Technical Implementation:

- Automatically replaces Bootstrap offcanvas on mobile devices
- Preserves existing menu structure and links
- Works with both primary and secondary navigation menus
- Includes performance optimizations and reduced-motion support
- Z-index management to ensure proper layering

The mobile header automatically activates on devices with screen width less than 992px (Bootstrap's lg breakpoint) and gracefully falls back to the desktop navigation on larger screens.

## Development

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Watch for changes during development
npm run watch
```

## Browser Support

- Modern browsers with CSS `clip-path` support
- Graceful fallback for older browsers
- iOS Safari optimized video playback
- Touch device optimization

## Performance

- Lazy loading of animations
- GSAP timeline optimization
- Reduced motion support for accessibility
- Efficient event handling with proper cleanup
=======
# soulresort
soulresort wordpress theme
>>>>>>> b15f6d44aba1730f18fa617db173fab7983949fb
