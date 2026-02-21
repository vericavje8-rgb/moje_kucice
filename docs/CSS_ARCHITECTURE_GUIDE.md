# CSS Architecture Guide: Apartment Website

## 📁 FOLDER STRUCTURE

```
assets/css/
├── 1-base/
│   ├── _reset.css          # CSS reset
│   ├── _variables.css      # CSS custom properties
│   └── _typography.css     # Font definitions & text styles
├── 2-layout/
│   ├── _grid.css          # Grid system utilities
│   ├── _containers.css    # Page containers
│   └── _navigation.css    # Nav & header layouts
├── 3-components/
│   ├── _buttons.css       # Button variations
│   ├── _cards.css         # Apartment cards
│   ├── _forms.css         # Contact & booking forms
│   ├── _gallery.css       # Image galleries
│   ├── _hero.css          # Hero sections
│   └── _modal.css         # Popup modals
├── 4-pages/
│   ├── _home.css          # Homepage specific
│   ├── _apartment.css     # Apartment detail pages
│   └── _contact.css       # Contact page specific
├── 5-utilities/
│   ├── _spacing.css       # Margin/padding utilities
│   ├── _text.css          # Text utilities
│   └── _visibility.css    # Show/hide utilities
└── main.css               # Imports all files
```

## 🏷️ NAMING METHODOLOGY: Modified BEM

### Component Naming Pattern:
```css
.block {}                    /* Component */
.block__element {}           /* Child element */
.block--modifier {}          /* Variation */
.block__element--modifier {} /* Element variation */
```

### Apartment Website Examples:
```css
/* Apartment Card Component */
.apartment-card {}
.apartment-card__image {}
.apartment-card__title {}
.apartment-card__price {}
.apartment-card--featured {}
.apartment-card__price--discount {}

/* Gallery Component */
.gallery {}
.gallery__main-image {}
.gallery__thumbnails {}
.gallery__thumbnail {}
.gallery__thumbnail--active {}

/* Booking Form */
.booking-form {}
.booking-form__field {}
.booking-form__button {}
.booking-form--compact {}
```

### Utility Classes Pattern:
```css
.u-margin-bottom-lg {}    /* Utility prefix */
.u-text-center {}
.u-hide-mobile {}
```

## 🎨 CSS APPROACH: Modern CSS with Design Tokens

### 1. CSS Custom Properties (Design Tokens)
```css
:root {
  /* Colors */
  --color-primary: #C9A96E;         /* Gold accent */
  --color-primary-dark: #8B7355;    /* Dark gold */
  --color-secondary: #2C3E50;       /* Navy */
  --color-neutral-100: #FFFFFF;
  --color-neutral-900: #2C3E50;
  
  /* Spacing System (8px grid) */
  --space-xs: 0.5rem;    /* 8px */
  --space-sm: 1rem;      /* 16px */
  --space-md: 1.5rem;    /* 24px */
  --space-lg: 2rem;      /* 32px */
  --space-xl: 3rem;      /* 48px */
  
  /* Typography Scale */
  --font-size-sm: clamp(0.8rem, 2vw, 0.9rem);
  --font-size-base: clamp(1rem, 2.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 3vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 4vw, 1.5rem);
  --font-size-2xl: clamp(1.5rem, 5vw, 2rem);
  
  /* Shadows for depth */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Breakpoints */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
}
```

### 2. Mobile-First Media Queries
```css
/* Mobile first approach */
.apartment-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

@media (min-width: 768px) {
  .apartment-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .apartment-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## 🏗️ COMPONENT ARCHITECTURE PATTERNS

### 1. Base Component Structure
```css
/* Component: Apartment Card */
.apartment-card {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Spacing */
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
  
  /* Visual */
  background: var(--color-neutral-100);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  
  /* Animation */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.apartment-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Elements */
.apartment-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: var(--space-sm);
}

.apartment-card__title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.apartment-card__price {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-primary);
}

/* Modifiers */
.apartment-card--featured {
  border: 2px solid var(--color-primary);
}

.apartment-card--compact {
  padding: var(--space-sm);
  margin-bottom: var(--space-md);
}
```

### 2. Layout Patterns
```css
/* Container System */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.container--narrow {
  max-width: 800px;
}

.container--wide {
  max-width: 1400px;
}

/* Grid System */
.grid {
  display: grid;
  gap: var(--space-md);
}

.grid--2-col {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid--3-col {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

## 📊 SCALABILITY FEATURES

### 1. Performance Optimization
```css
/* Critical CSS Strategy */
/* Inline critical styles for above-the-fold content */

/* Non-critical styles loaded async */
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

/* Optimize with CSS containment */
.apartment-card {
  contain: layout style;
}

/* Use will-change sparingly */
.gallery__thumbnail:hover {
  will-change: transform;
}
```

### 2. Code Splitting Strategy
```css
/* main.css - Critical styles only */
@import '1-base/_variables.css';
@import '1-base/_reset.css';
@import '1-base/_typography.css';
@import '2-layout/_navigation.css';

/* secondary.css - Non-critical styles */
@import '3-components/_gallery.css';
@import '3-components/_modal.css';
@import '4-pages/_apartment.css';
```

## 🛠️ BUILD PROCESS RECOMMENDATIONS

### 1. PostCSS Setup
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-custom-properties'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
```

### 2. Development Workflow
```json
{
  "scripts": {
    "css:build": "postcss assets/css/main.css -o dist/styles.css",
    "css:watch": "postcss assets/css/main.css -o dist/styles.css --watch",
    "css:critical": "critical --src dist/index.html --css dist/styles.css"
  }
}
```

## 📋 MAINTENANCE GUIDELINES

### 1. Code Organization Rules
- **One component per file** in the components folder
- **Group related modifiers** with their base component
- **Use consistent naming** across all components
- **Document complex calculations** with comments

### 2. Performance Budget
- **Max CSS file size**: 50KB compressed
- **Critical CSS**: Under 14KB
- **Animation duration**: Under 300ms
- **Specificity score**: Keep under 0,1,0,0

### 3. Documentation Standards
```css
/**
 * Apartment Card Component
 * 
 * A flexible card component for displaying apartment information.
 * Supports featured and compact variations.
 * 
 * Usage:
 * <div class="apartment-card apartment-card--featured">
 *   <img class="apartment-card__image" src="..." alt="...">
 *   <h3 class="apartment-card__title">Apartment Name</h3>
 *   <p class="apartment-card__price">$1200/month</p>
 * </div>
 */
```

## 🔄 MIGRATION STRATEGY

### Phase 1: Foundation (Week 1-2)
1. Extract design tokens from existing CSS
2. Create base files (_variables.css, _reset.css)
3. Set up build process

### Phase 2: Components (Week 3-4)
1. Identify existing components
2. Refactor into BEM methodology
3. Create component files

### Phase 3: Optimization (Week 5-6)
1. Implement critical CSS
2. Remove unused styles
3. Performance testing

### Phase 4: Documentation (Week 7)
1. Document all components
2. Create style guide
3. Set up maintenance workflow

## ✅ SUCCESS METRICS

- **Load time**: Under 3 seconds on 3G
- **CSS size**: 50% reduction from current
- **Maintainability**: New features in under 1 hour
- **Consistency**: Design system compliance 100%
- **Performance**: Lighthouse CSS score 90+

This architecture prioritizes your solo developer workflow while ensuring the codebase remains scalable and maintainable as your apartment website grows.