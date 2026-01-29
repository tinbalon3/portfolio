---
title: Web Accessibility (A11y)
description: Web accessibility best practices for inclusive React applications.
date: '2025-01-27'
categories:
  - Accessibility
  - A11y
  - Best Practices
published: true
---

# Accessibility (a11y)

Web accessibility best practices for inclusive React applications.

---

## Semantic HTML

### Use Correct Elements

```typescript
// ❌ Bad - div with click handler
<div onClick={handleClick} className="button-style">
  Submit
</div>

// ✅ Good - button element
<button onClick={handleClick} className="button-style">
  Submit
</button>

// ❌ Bad - div for navigation
<div className="nav">
  <div onClick={() => navigate('/')}>Home</div>
</div>

// ✅ Good - nav with links
<nav aria-label="Main navigation">
  <a href="/">Home</a>
</nav>
```

### Landmark Regions

```typescript
// ✅ Structure your app with landmarks
const Layout = ({ children }) => (
  <div className="min-h-screen">
    <header role="banner">
      <nav aria-label="Global">...</nav>
    </header>
    
    <main role="main" id="main-content">
      {children}
    </main>
    
    <footer role="contentinfo">
      <p>© 2024 My App</p>
    </footer>
  </div>
);
```

---

## Keyboard Navigation

Ensure all interactive elements are focusable and usable with keyboard.

```typescript
// ✅ Custom interactive elements need tabindex and key handlers
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Custom Button
</div>
```
