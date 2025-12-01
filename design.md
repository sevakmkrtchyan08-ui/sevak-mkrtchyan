# Resume Website Design Style Guide

## Design Philosophy

### Visual Language
- **Editorial Sophistication**: Inspired by modern design publications like Kinfolk and The Gentlewoman
- **Professional Minimalism**: Clean, uncluttered layouts that let content breathe
- **Warm Accessibility**: Approachable yet professional tone throughout
- **Tech-Forward Aesthetic**: Subtle technological sophistication without being overly futuristic

### Color Palette
- **Primary**: Deep Charcoal (#2C2C2C) - Professional, readable text
- **Secondary**: Warm Gray (#6B6B6B) - Subtle accents and secondary text
- **Accent**: Soft Teal (#4A9B9B) - Interactive elements and highlights
- **Background**: Off-White (#FAFAFA) - Clean, paper-like foundation
- **Highlight**: Warm Beige (#F5F1EB) - Section backgrounds and cards

### Typography
- **Display Font**: "Tiempos Headline" - Bold, editorial serif for headings
- **Body Font**: "Suisse Int'l" - Clean, readable sans-serif for content
- **Accent Font**: "JetBrains Mono" - Technical elements and code snippets
- **Hierarchy**: Large display headings (48px+), medium section headers (24px), readable body text (16px)

## Visual Effects & Styling

### Core Libraries Implementation
- **Anime.js**: Smooth page transitions and element animations
- **ECharts.js**: Interactive skills radar chart and data visualizations
- **Splide.js**: Professional image carousels and testimonial sliders
- **p5.js**: Subtle background particle effects and creative coding elements
- **Matter.js**: Physics-based interactions for portfolio items

### Animation Strategy
- **Scroll Reveals**: Elements fade in as they enter viewport (opacity 0.9 to 1.0)
- **Hover States**: Subtle 3D tilt effects on cards and interactive elements
- **Page Transitions**: Smooth slide animations between sections
- **Loading States**: Elegant skeleton screens and progress indicators

### Header & Hero Effects
- **Background**: Subtle particle system using p5.js with floating geometric shapes
- **Typography**: Gradient text animation on main heading with color cycling
- **Image Treatment**: Professional portrait with soft shadow and subtle parallax
- **Call-to-Action**: Animated button with expanding border on hover

### Interactive Components Styling
- **Timeline**: Horizontal timeline with animated progress indicators
- **Skills Chart**: Radar chart with smooth transitions and hover details
- **Portfolio Grid**: Masonry layout with category filtering and modal overlays
- **Contact Form**: Floating labels with validation animations

### Layout & Spacing
- **Grid System**: 12-column responsive grid with consistent gutters
- **Vertical Rhythm**: 24px baseline grid for consistent spacing
- **Content Width**: Maximum 1200px with responsive breakpoints
- **Padding**: Generous whitespace (80px sections, 40px containers)

### Background & Atmosphere
- **Primary Background**: Consistent off-white throughout all sections
- **Decorative Elements**: Subtle geometric shapes and gradient overlays
- **Texture**: Paper-like grain effect for editorial feel
- **Depth**: Layered shadows and subtle elevation changes

### Mobile Responsiveness
- **Breakpoints**: Mobile (320px), Tablet (768px), Desktop (1024px+)
- **Typography Scaling**: Fluid typography using clamp() functions
- **Touch Interactions**: Larger tap targets and swipe gestures
- **Performance**: Optimized animations and reduced motion preferences

### Accessibility Considerations
- **Color Contrast**: Minimum 4.5:1 ratio for all text elements
- **Focus States**: Clear keyboard navigation indicators
- **Screen Readers**: Semantic HTML and proper ARIA labels
- **Motion**: Respect prefers-reduced-motion settings