# Bingo Generator Project

## Project Overview

The Bingo Generator is a React-based web application built with TypeScript and Vite that allows users to create custom bingo boards. The application takes a list of words or phrases as input and randomly generates a 5x5 bingo board with a "FREE" space in the center. Users can customize the appearance of the board with various styling options.

### Key Features

- **Word Input**: Users can input at least 25 words/phrases separated by a customizable separator
- **Random Board Generation**: Creates a 5x5 bingo board with random selection from the input words
- **Customizable Styling**: Options to adjust:
  - Border thickness and color
  - Text color
  - Background colors (overall and cell-specific)
  - Custom heading text
- **Print Functionality**: Built-in print button to print the generated board
- **Responsive Design**: Automatically adjusts text size based on content length
- **Word Wrapping**: Handles long words by breaking them appropriately

### Architecture

The application follows a React component-based architecture:

- `App.tsx`: Main application component that manages state and contains the control panel and display area
- `Cell.tsx`: Individual cell component that handles text formatting and styling
- `types/settings.ts`: TypeScript interface defining the settings structure
- Various CSS files for styling

## Building and Running

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview the production build:
   ```bash
   npm run preview
   ```

5. Lint the code:
   ```bash
   npm run lint
   ```

### Development Conventions

- **Type Safety**: The project uses TypeScript with strict type checking
- **Code Formatting**: ESLint is configured with recommended React and TypeScript rules
- **Component Structure**: Functional components with hooks for state management
- **Styling**: CSS-in-JS with inline styles for dynamic theming and CSS files for layout

## How to Use

1. Enter at least 25 words/phrases in the text area, separated by the chosen separator (default is comma)
2. Adjust the separator if needed
3. Customize the appearance using the various input fields
4. Click "Generate Board" to create the bingo board
5. Use the "Print Board" button to print the generated board

## Sample Data

The project includes two sample data files:
- `words.txt`: Contains 40 sample words for testing
- `songs.txt`: Contains 30 song titles for testing

## Technical Details

### State Management

The application uses React's `useState` hook to manage:
- The generated bingo board (`board`)
- Input words (`words`)
- Separator character/string (`separator`)
- Board styling settings (`settings`)

### Board Generation Algorithm

1. Splits the input text by the separator
2. Randomly selects 25 unique words from the input
3. Arranges them in a 5x5 grid
4. Places "FREE" in the center cell (position [2][2])
5. Removes the extra sixth row

### Text Formatting

The application automatically formats text in cells:
- Adjusts font size based on word count (1-5+ words)
- Breaks long words (>10 characters) with hyphens
- Handles word wrapping and hyphenation for readability

### Styling System

The application uses a settings object that contains:
- `border_thickness`: Width of borders in pixels
- `border_color`: Hex color code for borders
- `text_color`: Hex color code for text
- `heading`: Text for the board title
- `background_color`: Hex color code for the board background
- `cell_color`: Hex color code for individual cell backgrounds