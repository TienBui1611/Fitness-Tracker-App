# Fitness-Tracker-App

A cross-platform mobile fitness app using Ionic and Angular that allows users to log workouts, manage daily goals, and personalize their dashboard.

## 🚀 How to Run the Project

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- Ionic CLI:  

  ```bash
  npm install -g @ionic/cli
  ```

- For Android development: [Android Studio](https://developer.android.com/studio)

### 🛠️ Setup Steps

1. **Clone/Open the Project**

2. **Install Dependencies**  
   Run the following command in the terminal:

   ```bash
   npm install
   ```

3. **Run the App in the Browser**  

   ```bash
   ionic serve
   ```

## 📱 Running on Android Studio

### 🔧 Prerequisites for Android Development

- **Android Studio** installed with SDK
- **Virtual Device (AVD)** created and running, or physical Android device connected

### 🚀 Android Development Workflow

1. **Set Java Environment** (Required - Android build needs Java 11+):

   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
   ```

2. **Build the Ionic App**:

   ```bash
   ionic build
   ```

3. **Sync with Android Platform**:

   ```bash
   npx cap sync android
   ```

4. **Run on Android Device/Emulator**:

   ```bash
   npx cap run android
   ```