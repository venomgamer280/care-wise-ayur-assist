# Health Companion Website

A simple HTML, CSS, and JavaScript version of the Health Companion app for elderly users.

## Features

- **Symptom Checker** - Input symptoms and get Ayurvedic remedies
- **Emergency Services** - Quick access to hospitals and emergency numbers
- **Voice Recognition** - Speak symptoms in multiple languages
- **Yoga Recommendations** - Age-appropriate exercises
- **Medicine Reminders** - Track and manage medications
- **Multi-language Support** - English, Hindi, Bengali, Tamil
- **Elderly-friendly Design** - Large fonts, clear buttons, accessible interface

## Files

- `index.html` - Main application structure
- `styles.css` - Complete styling with design system
- `script.js` - All functionality and interactions

## How to Use

1. **Download the files** to your computer
2. **Open `index.html`** in any modern web browser
3. **Start using the app** - no installation required!

## Deployment Options

### 1. Simple Web Hosting
- Upload all files to any web hosting service
- Works with GitHub Pages, Netlify, Vercel, etc.

### 2. Local Testing
- Double-click `index.html` to open in browser
- Or use a local server: `python -m http.server 8000`

### 3. Mobile App (Using Capacitor)
```bash
# Convert to mobile app
npm install -g @capacitor/cli
cap init "Health Companion" "app.health.companion"
cap add android
cap add ios
cap run android  # or cap run ios
```

## Browser Compatibility

- **Chrome/Edge** - Full features including voice recognition
- **Firefox** - All features except voice recognition
- **Safari** - All features except voice recognition
- **Mobile browsers** - Responsive design works on all devices

## Features by Language

The app automatically detects and supports:
- **English** 🇺🇸
- **Hindi** 🇮🇳 हिंदी  
- **Bengali** 🇧🇩 বাংলা
- **Tamil** 🇮🇳 தமிழ்

## Data Storage

- Medicine reminders are saved locally in the browser
- No server required - works completely offline
- Data persists between browser sessions

## Customization

### Adding More Languages
Edit the `translations` object in `script.js`

### Adding More Symptoms
Edit the `symptomsData` array in `script.js`

### Adding More Yoga Poses
Edit the `yogaPoses` array in `script.js`

### Styling Changes
Modify colors and fonts in `styles.css` using CSS variables

## Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks required
- **Responsive design** - Works on desktop, tablet, and mobile
- **Progressive Web App** ready - can be installed on mobile devices
- **Offline capable** - works without internet connection
- **Voice recognition** - Uses Web Speech API (Chrome/Edge only)

## License

Open source - feel free to modify and distribute.

## Support

For technical support or feature requests, please contact the developer.