# 🏋️ Fitness Tracker App

A **cross-platform mobile fitness application** built with **Ionic** and **Angular** that empowers users to log workouts, manage daily goals, and personalize their fitness dashboard.

## ✨ Features

- 📊 **Dashboard** - Personalized fitness overview
- 🏋️ **Workout Logging** - Track your exercise sessions
- 🎯 **Daily Goals** - Set and monitor fitness targets
- 📈 **Statistics** - View progress with interactive charts and maps
- 🌙 **Dark/Light Mode** - Automatic theme switching

---

## 🚀 Getting Started

### 📋 Prerequisites

Before running the project, ensure you have:

- **[Node.js](https://nodejs.org/)** (v16 or higher recommended)
- **Ionic CLI** globally installed:

  ```bash
  npm install -g @ionic/cli
  ```

- **[Android Studio](https://developer.android.com/studio)** (for mobile development)

### 🛠️ Installation & Setup

1. **Clone or open the project**

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run in browser:**

   ```bash
   ionic serve
   ```

---

## 📱 Android Development

### 🔧 Android Prerequisites

- ✅ **Android Studio** installed with Android SDK
- ✅ **Virtual Device (AVD)** created and running

### 🚀 Quick Android Workflow

**For first-time setup or after major changes:**

```powershell
# Set Java environment (Windows - required for build)
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"

# Build and deploy
ionic build
npx cap sync android
npx cap run android
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Java Version Error** | Ensure `JAVA_HOME` points to Android Studio's JBR (Java 11+) |
| **ADB Authorization Issues** | Use `--no-sync` flag or deploy directly from Android Studio |
| **Device Not Found** | Check emulator is running or USB debugging is enabled |
| **Build Failures** | Clean build with `ionic build --clean` |

---

## 🧑‍💻 Development

- **Framework:** Ionic + Angular
- **Styling:** SCSS with dark/light theme support
- **Mobile:** Capacitor for native functionality
- **Maps:** Google Maps integration
- **Charts:** Chart.js for statistics visualization

---

## 📁 Project Structure

```
Fitness-Tracker-App/
├── 📱 android/                          # Android native project
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── assets/public/            # Web assets (auto-generated)
│   │   │   ├── java/io/ionic/starter/    # Native Android code
│   │   │   └── res/                      # Android resources
│   │   └── build.gradle                  # Android build configuration
│   └── gradle/                           # Gradle wrapper
│
├── 🍎 ios/                              # iOS native project (if needed)
│   └── App/
│
├── 📱 src/                              # Main application source
│   ├── 🎛️ app/                          # Angular app modules
│   │   ├── 📊 dashboard/                 # Dashboard page
│   │   │   ├── dashboard.page.html       # Dashboard template
│   │   │   ├── dashboard.page.scss       # Dashboard styles
│   │   │   └── dashboard.page.ts         # Dashboard logic
│   │   │
│   │   ├── 🏋️ workout-log/              # Workout logging
│   │   │   ├── workout-log.page.html
│   │   │   ├── workout-log.page.scss
│   │   │   └── workout-log.page.ts
│   │   │
│   │   ├── 🎯 daily-goals/              # Daily goals management
│   │   │   ├── daily-goals.page.html
│   │   │   ├── daily-goals.page.scss
│   │   │   └── daily-goals.page.ts
│   │   │
│   │   ├── 📈 stats/                    # Statistics & maps
│   │   │   ├── stats.page.html
│   │   │   ├── stats.page.scss
│   │   │   └── stats.page.ts            # Google Maps integration
│   │   │
│   │   ├── 🔐 login/                    # Authentication
│   │   │   ├── login.page.html
│   │   │   ├── login.page.scss
│   │   │   └── login.page.ts
│   │   │
│   │   ├── 🎨 registration-modal/       # User registration
│   │   ├── 💫 splash-screen/            # App splash screen
│   │   ├── 📋 app-routing.module.ts     # Route configuration
│   │   ├── 🧩 app.module.ts             # Main app module
│   │   ├── 🔧 goal.service.ts           # Goals data service
│   │   └── 🔧 shared.service.ts         # Shared utilities
│   │
│   ├── 🖼️ assets/                       # Static assets
│   │   ├── avatar.jpg                   # User avatar image
│   │   ├── stats.jpg                    # Statistics background
│   │   └── icon/                        # App icons
│   │
│   ├── 🎨 theme/                        # App theming
│   │   └── variables.scss               # CSS custom properties
│   │
│   ├── 🌍 environments/                 # Environment configs
│   │   ├── environment.ts               # Development config
│   │   └── environment.prod.ts          # Production config
│   │
│   ├── 🎨 global.scss                   # Global styles
│   ├── 🏠 index.html                    # Main HTML file
│   └── 🚀 main.ts                       # App bootstrap
│
├── 📋 Configuration Files
│   ├── angular.json                     # Angular CLI config
│   ├── capacitor.config.ts              # Capacitor config
│   ├── ionic.config.json                # Ionic CLI config
│   ├── package.json                     # Dependencies
│   ├── tsconfig.json                    # TypeScript config
│   └── README.md                        # This file!
│
└── 📦 Generated/Build Files
    ├── www/                             # Built web assets (auto-generated)
    ├── node_modules/                    # Dependencies (auto-generated)
    └── *.lock                           # Lock files
```

### 🗂️ Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| **`src/app/`** | Core Angular application with all pages and services |
| **`src/assets/`** | Static files (images, icons) bundled with the app |
| **`src/theme/`** | SCSS theming and CSS custom properties |
| **`android/`** | Native Android project generated by Capacitor |
| **`www/`** | Built web assets ready for deployment (auto-generated) |
