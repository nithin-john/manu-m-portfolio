# FROM HUMAN TO HIDDEN AI IDENTITY — PORTFOLIO

A premium, interactive personal portfolio website for **Manu MA**, Automobile Engineer and certified Quality Assurance / Quality Control (QA/QC) Specialist.

Built around the core concept:
> **“A normal human creative identity on the surface. A futuristic AI-powered identity underneath, revealed through continuous cursor interaction.”**

---

## ⚡ Key Highlights & Architecture

- **The Signature Interactive AI Reveal Engine (`src/components/AIRevealPortrait.js`)**:
  - Dual-layer composited canvas system with clean original portrait as base layer.
  - Interactive organic reveal mask driven by cursor position.
  - Smooth inertia (lerp physics) preventing harsh snapping.
  - Chromatic separation (subtle cyan/violet RGB channel shift) and organic boundary wave distortion.
  - Floating micro data particles and matrix scanlines inside the reveal zone.
  - Contextual HUD reticle, biometric pulse waveform, and real-time cursor coordinate tracking.
  - Touch-supported drag interaction on mobile and tablet devices.
- **Custom Magnetic Scanner Cursor (`src/components/CustomCursor.js`)**:
  - Desktop-only custom circular indicator with lerp trailing.
  - Transforms dynamically into a rotating dashed scanner ring (`AI SCAN`) when hovering the hero portrait.
- **Strict Ground-Truth CV Alignment (`src/data/portfolio.js`)**:
  - Every job title, company, degree score, date, and project detail is derived strictly from Manu MA's verified CV:
    - **State Bank of India (2022–Present)**: Loan File Checking, Data Entry, and QC Verification.
    - **Concept Bikes (2016–2018)**: Automobile Engineer, Diagnostic Service Advisor, and Riding Coordinator.
    - **Tisat (2019)**: QA/QC Certified Specialist.
    - **Maria College of Engineering & Tech (2016)**: Automobile Engineering (80% Marks).
    - **Languages**: English, Malayalam, Tamil, Hindi.
    - **Location**: Trivandrum, Kerala, India.
- **Modular Component Hierarchy**:
  - `Navbar`: Monogram, navigation links, live telemetry status, and mobile drawer.
  - `Hero`: Oversized editorial typography, verified metrics, and interactive portrait.
  - `About`: "THE HUMAN BEHIND THE INTERFACE" editorial split layout with factual CV metadata blocks.
  - `SelectedWork`: Visual project cards with hover zoom and accessible case study modal.
  - `Experience`: "EXPERIENCE / SYSTEM LOG" interactive vertical timeline.
  - `Skills`: Filterable capabilities matrix (QA/QC, Automobile Eng, Data Systems, AI Workflows).
  - `AISection`: "HUMAN + MACHINE // DESIGNING WITH INTELLIGENCE" symbiosis pipeline.
  - `Process`: 5-step engineering & verification methodology (Discover, Define, Inspect, Isolate, Deliver).
  - `Services`: Ground-truth professional offerings based on CV credentials.
  - `CVSection`: Academic credentials and direct PDF view/download links.
  - `Contact`: Encrypted terminal form and direct communication channels.
  - `Footer`: Minimalist system status indicator and copyright.

---

## 🚀 How to Run Locally

### Option 1: Double-click Launcher (macOS)
Double-click `start-portfolio.command` in Finder. It will launch the local HTTP server and open the portfolio in your default browser.

### Option 2: Terminal Command
```bash
cd /Users/nithin/.gemini/antigravity/scratch/human-to-ai-portfolio
python3 serve.py 8080
```
Then visit `http://localhost:8080` in your web browser.

---

## 🛠 File Structure

```
human-to-ai-portfolio/
├── index.html                  # Semantic root document with OpenGraph & typography
├── serve.py                    # High-performance local HTTP server
├── start-portfolio.command     # One-click macOS browser launcher
├── public/
│   ├── images/
│   │   ├── profile.jpg         # Clean human portrait (source photo)
│   │   ├── profile-ai.jpg      # Cybernetic AI portrait layer
│   │   ├── project-01.jpg      # State Bank of India Banking QC interface
│   │   ├── project-02.jpg      # Concept Bikes automotive diagnostics interface
│   │   └── project-03.jpg      # Tisat QA/QC industrial metrology interface
│   └── cv/
│       └── MANU_MA_RESUME.pdf  # Verified original CV PDF
└── src/
    ├── app.js                  # Master application coordinator
    ├── data/
    │   └── portfolio.js        # Centralized source of truth data object
    ├── styles/
    │   └── main.css            # Dark graphite editorial design system
    └── components/
        ├── Navbar.js
        ├── CustomCursor.js
        ├── Hero.js
        ├── AIRevealPortrait.js
        ├── About.js
        ├── SelectedWork.js
        ├── ProjectModal.js
        ├── Experience.js
        ├── Skills.js
        ├── AISection.js
        ├── Process.js
        ├── Services.js
        ├── CVSection.js
        ├── Contact.js
        └── Footer.js
```

---

## 🎨 Modifying Content or Swapping Images

- **Edit Professional Information**: Update `src/data/portfolio.js`. All sections dynamically consume this centralized data store.
- **Replace Images**: Replace files in `public/images/` with your own images (maintaining identical filenames: `profile.jpg`, `profile-ai.jpg`, etc.).
- **Update CV Document**: Replace `public/cv/MANU_MA_RESUME.pdf`.
