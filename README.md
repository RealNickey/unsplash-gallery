# Unsplash Gallery with Motivational Quotes
#### Video Demo: [URL HERE]
#### Description:

A modern, interactive web application that combines beautiful imagery from Unsplash with time-based motivational quotes. The application creates shareable images perfect for social media, combining high-quality photographs with inspirational messages that change based on the time of day.

### Key Features

- **Dynamic Image Search**: Utilizes the Unsplash API to fetch and display high-quality images
- **Time-Based Quotes**: Automatically selects quotes based on the time of day (morning, afternoon, or night)
- **Modern Search Interface**: Features a minimalist, keyboard-shortcut-enabled search box (Ctrl+K)
- **Image Sharing**: Allows users to share images with overlaid quotes directly to social media
- **Responsive Design**: Adapts seamlessly to different screen sizes and orientations

### Technical Implementation

The project consists of several key components:

1. **App.js**: The main React component that:
   - Manages the application state
   - Handles API interactions with Unsplash
   - Implements the search functionality
   - Controls the quote selection logic
   - Manages keyboard shortcuts and user interactions

2. **style.css**: Contains all styling including:
   - Modern, minimalist search interface
   - Smooth animations and transitions
   - Responsive grid layout
   - Image overlay effects
   - Typography and spacing

3. **Quote Collections**: Three separate arrays of quotes for:
   - Morning motivation (before 12 PM)
   - Afternoon productivity (12 PM - 6 PM)
   - Evening relaxation (after 6 PM)

### Design Choices

1. **Search Interface**:
   - Chose a floating search bar for easy access
   - Implemented Ctrl+K shortcut for power users
   - Added blur overlay effect for better focus during search

2. **Image Processing**:
   - Uses HTML Canvas for image manipulation
   - Adds semi-transparent overlay for better text readability
   - Implements dynamic text sizing based on image dimensions

3. **Quote Selection**:
   - Time-based quote selection for contextual relevance
   - Random selection within time category for variety
   - Custom fonts for better aesthetic appeal

### Key Design Decisions and Trade-offs

1. **Web Share API vs WhatsApp API**
   - Initially considered using WhatsApp's direct API for sharing
   - Chose Web Share API instead because:
     - More universal solution that works across multiple platforms
     - Better future-proofing as it supports any available share target
     - More respectful of user choice for sharing method
     - Native integration with device sharing capabilities
     - No dependency on specific third-party platform
     - whatsapp api required whatsapp business account

2. **Dynamic Images vs Static Assets**
   - Considered bundling high-quality images with the application
   - Chose Unsplash API integration because:
     - Larger variety of images
     - Reduced application size
     - Always fresh content for users
     -faster loading times

3. **Image Processing Approach**
   - Debated between server-side vs client-side image processing
   - Chose client-side Canvas API because:
     - Lower latency for end users
     - Works offline after initial image load

4. **Search Interface Design**
   - Considered traditional header search bar
   - Chose floating command palette style because:
     - Modern developer-friendly interface
     - Doesn't take up permanent screen space
     - Follows popular design patterns (VS Code, GitHub)
     - Better accessibility with keyboard shortcuts

5. **Quote Management**
   - Considered using external API for quotes
   - Chose hardcoded time-based collections because:
     - Guaranteed content quality
     - No additional API dependencies
     - Better performance
     - Carefully curated for each time of day


### Technical Details

- Built with React.js for component-based architecture
- Uses Unsplash API for high-quality image sourcing
- Implements modern CSS features like:
  - Backdrop filters
  - CSS Grid
  - Flexbox
  - CSS Transitions
- Uses HTML5 Canvas for image manipulation
- Implements Web Share API for social sharing


### Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with your Unsplash API key:
   ```
   REACT_APP_ACCESS_KEY=your_api_key_here
   ```
4. Run the development server: `npm start`
