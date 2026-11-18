# Test Report

## Environment
- Browser: Chromium 144.0.7559.96 on Debian GNU/Linux
- Viewports: 1440 x 1000 desktop and 390 x 844 mobile
- Delivery modes: local HTTP server and direct file opening

## Automated browser checks passed
- 18+ age gate appears, accepts confirmation and persists with localStorage
- All five pages load: Home, Products, About, Trade Account and Contact
- No JavaScript page errors or console errors
- No horizontal overflow on desktop or mobile
- Mobile navigation opens and closes correctly
- Eight featured products render on the homepage
- Forty-one catalogue products render on the Products page
- Product search and category filtering work
- Category query links work, including receipt rolls
- Product detail modal opens and closes with the Escape key
- Product trade enquiry modal validates and shows a demo success message
- Contact form validates and shows a demo success message
- Trade account form validates and shows a demo success message
- FAQ accordion interaction works
- Direct opening of index.html works without a server

## Static checks passed
- JavaScript syntax validated with Node.js
- All local HTML image, CSS, JavaScript and page references exist
- Website contains no external runtime dependencies

## Important
Forms are intentionally front-end demonstrations. No submitted information is sent, saved or emailed.
