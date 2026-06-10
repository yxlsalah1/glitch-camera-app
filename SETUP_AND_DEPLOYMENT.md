# Glitch Camera App - Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
```bash
# Install Node.js and npm
# Install Expo CLI globally
npm install -g expo-cli
```

### Installation
```bash
# Clone or navigate to your project directory
cd glitch-camera-app

# Install dependencies
npm install

# Install Expo Go on your phone from App Store or Play Store
```

### Preview the App

#### Option 1: Expo Go (Easiest - Phone Preview)
```bash
# Start the development server
npm start

# Scan the QR code with Expo Go app on your phone
# Or press 'i' for iOS simulator / 'a' for Android emulator
```

#### Option 2: iOS Simulator
```bash
npm start
# Press 'i' to open iOS simulator
```

#### Option 3: Android Emulator
```bash
npm start
# Press 'a' to open Android emulator
```

### Build for Release

#### iOS (Mac Required)
```bash
# Build production iOS app
eas build --platform ios --auto-submit

# Or generate IPA for TestFlight
eas build --platform ios
```

#### Android
```bash
# Build production Android APK/AAB
eas build --platform android --auto-submit

# Or just APK
eas build --platform android
```

### Configure for Release

1. **Update app.json:**
```json
{
  "expo": {
    "name": "Glitch Camera",
    "slug": "glitch-camera-app",
    "version": "1.0.0",
    "assetBundlePatterns": ["**/*"],
    "platforms": ["ios", "android"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "versionCode": 1
    }
  }
}
```

2. **Create EAS Configuration (eas.json):**
```json
{
  "build": {
    "production": {
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

3. **Submit to App Stores:**
```bash
# iOS App Store
eas submit --platform ios

# Google Play
eas submit --platform android
```

## 📊 App Features

### Core Capabilities
✅ Real-time GPU shader effects (RGB split, motion smear, scanlines, etc.)
✅ Front/back camera switching
✅ Effect intensity control (0-100%)
✅ Video recording with timer
✅ Permission handling
✅ Responsive dark theme UI

### Technical Stack
- React Native with Expo
- TypeScript for type safety
- Zustand for state management
- WebGL for GPU processing
- GLSL shaders for effects
- expo-camera for video capture
- expo-gl for OpenGL rendering

## 🎨 Improvement Enhancements Made

### UI/UX Improvements
- Modern dark theme optimized for camera
- Smooth animations and transitions
- Real-time effect preview
- Intuitive gesture controls
- Clear recording indicator with timer

### Performance Optimizations
- Triple buffering for smooth rendering
- GPU acceleration for all effects
- Efficient shader compilation
- Memory management for long sessions
- Optimized texture handling

### Feature Additions
- Effect chaining (multiple effects simultaneously)
- Master intensity control
- Preset effects library
- Real-time frame counter
- Recording duration tracking

## 🔧 Development Tips

### Hot Reload
```bash
# Changes auto-reload when you save files
npm start
# Press 'r' to reload manually
```

### Debugging
```bash
# View console logs
npm start
# Check terminal for error messages
```

### Testing on Device
```bash
# Keep app running
npm start

# On your phone:
# 1. Open Expo Go app
# 2. Scan QR code
# 3. App loads on phone
```

## 📝 Next Steps for Production

1. **Add App Icons:**
   - Create 1024x1024 icon
   - Place in `assets/icon.png`

2. **Add Splash Screen:**
   - Create splash image
   - Place in `assets/splash.png`

3. **Create App Store Accounts:**
   - Apple Developer ($99/year)
   - Google Play Developer ($25 one-time)

4. **Test on Real Devices:**
   - iPhone and iPad (iOS)
   - Various Android phones

5. **Submit for Review:**
   - Follow app store guidelines
   - Prepare screenshots and descriptions
   - Fill out review questionnaire

## 🎯 Release Checklist

- [ ] App runs without errors
- [ ] All effects work smoothly
- [ ] Camera permissions handled
- [ ] Recording saves properly
- [ ] UI responsive on all screen sizes
- [ ] Performance tested (60 FPS target)
- [ ] Tested on real devices (both iOS & Android)
- [ ] App icons/splash screens added
- [ ] Privacy policy created
- [ ] App Store/Play Store accounts created
- [ ] Built for production
- [ ] Submitted for review

## 🚨 Troubleshooting

**Camera permission denied:**
```
→ Check Settings → Glitch Camera → Camera permission
```

**Effects not showing:**
```
→ Check GPU support: Most modern devices support WebGL
→ Restart app: Force close and reopen
```

**Slow performance:**
```
→ Reduce effect count
→ Lower camera resolution in CameraManager.ts
→ Close other apps
```

**Build fails:**
```
→ Clear cache: rm -rf node_modules && npm install
→ Update Expo: npm install -g expo-cli@latest
→ Check Node version: node --version (need 14+)
```

## 📞 Support

For issues:
1. Check Expo documentation: https://docs.expo.dev
2. Review React Native docs: https://reactnative.dev
3. Visit GitHub Issues for community help

---

**Happy creating! 🎬✨**
