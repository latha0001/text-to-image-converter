# Text-to-Image Converter

A modern web application that transforms user-inputted text into visually appealing images. Built with TypeScript, Tailwind CSS, and Vite, this tool offers a seamless and responsive user experience for generating images from text.

## Features

* **Real-Time Conversion**: Instantly convert text to images as you type.
* **Customizable Styles**: Modify font styles, sizes, and colors to suit your preferences.
* **Responsive Design**: Optimized for desktops, tablets, and mobile devices.
* **Downloadable Output**: Easily download the generated images in high-quality formats.
* **Performance Optimized**: Leveraging Vite for fast builds and hot module replacement during development.

## Tech Stack

* **Frontend**: TypeScript, Tailwind CSS
* **Build Tool**: Vite
* **Package Management**: npm

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/latha0001/text-to-image-converter.git
   cd text-to-image-converter
   ```

2. **Install Dependencies**:

   Ensure you have Node.jsinstalled. Then run:

   ```bash
   npm install
   ```

## Development

To start the development server with hot reloading:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to view the application.

## Build for Production

To build the application for production deployment:

```bash
npm run build
```

The optimized and minified files will be generated in the `dist/` directory.

## Project Structure

```
text-to-image-converter/
├── dist/                 # Production build output
├── src/                  # Source code
│   ├── assets/           # Images and static assets
│   ├── components/       # Reusable UI components
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Entry point of the application
├── index.html            # HTML template
├── package.json          # Project metadata and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Customization

You can customize the appearance and behavior of the text-to-image conversion by modifying the following:

* **Tailwind Styles**: Update `tailwind.config.js` and CSS classes in components to change styles.
* **Fonts**: Add or change fonts by importing them in your CSS or using Tailwind's font utilities.
* **Image Format**: Modify the image generation logic in the relevant component to change the output format (e.g., PNG, JPEG).

  ![Screenshot 2025-06-04 224054](https://github.com/user-attachments/assets/7e81c0b4-4be4-4571-a2a8-c243a204b521)


