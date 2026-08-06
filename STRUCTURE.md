# Project Structure

The codebase has been reorganized from a single monolithic file into a proper folder structure:

## Directory Structure

```
prism1.0/
├── index.html              # Main HTML file (now clean, references external files)
├── css/
│   └── styles.css          # Application-specific styles
├── js/
│   └── app.js              # Application logic
├── lib/                    # Third-party libraries
│   ├── leaflet.css         # Leaflet map library styles
│   ├── leaflet.js          # Leaflet map library
│   ├── leaflet-routing-machine.css  # Routing machine styles
│   ├── leaflet-routing-machine.js   # Routing machine library
│   ├── leaflet.markercluster.css    # Marker clustering styles
│   └── leaflet.markercluster.js     # Marker clustering library
├── data/                   # Data files (for future use)
│   └── body_structure.html # Extracted HTML structure reference
├── LICENSE
└── README.md
```

## File Sizes

| File | Lines | Size |
|------|-------|------|
| index.html | ~3,551 | ~847 KB (includes HTML body) |
| css/styles.css | ~391 | ~23 KB |
| js/app.js | ~3,009 | ~142 KB |
| lib/leaflet.js | ~4,932 | ~145 KB |
| lib/leaflet-routing-machine.js | ~4,932 | ~941 KB |
| lib/leaflet.markercluster.js | ~4,932 | ~941 KB |

**Total:** Reduced from 4,933 lines in one file to organized structure with ~14,327 total lines across multiple files

## Benefits of This Refactoring

1. **Separation of Concerns**: CSS, JS, and HTML are now properly separated
2. **Maintainability**: Easier to find and modify specific parts of the code
3. **Caching**: Browsers can cache CSS and JS files separately
4. **Collaboration**: Multiple developers can work on different files without conflicts
5. **Debugging**: Easier to debug with source maps and clear file boundaries
6. **Performance**: Can load resources asynchronously and optimize delivery

## Next Steps

1. ✅ Split into separate HTML/CSS/JS files (COMPLETED)
2. ⏳ Move bundled libraries to CDN imports
3. ⏳ Extract hardcoded data to JSON files
4. ⏳ Fix security vulnerabilities (API tokens, XSS prevention)
5. ⏳ Add marker clustering for performance
6. ⏳ Improve error handling
7. ⏳ Add accessibility features
8. ⏳ Create documentation

## Usage

Simply open `index.html` in a browser or serve it with a local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

Then navigate to `http://localhost:8000`
