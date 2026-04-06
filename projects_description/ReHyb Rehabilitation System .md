# ReHyb Rehabilitation System — Project Description

---

## 1. Project Overview

**Full Name:** ReHyb Rehabilitation System (Rehabilitation Hybrid System)

**Context:** This is a Master's/PhD thesis project in the field of **biomedical engineering / human-robot interaction**, focused on **upper-limb stroke rehabilitation** using a robotic exoskeleton combined with immersive technology (VR/game-based therapy).

The project delivers a **complete, end-to-end digital rehabilitation platform** — from hardware sensor integration to cloud-based data management, AI-driven patient monitoring, and clinical dashboards.

---

## 2. Problem Statement

Stroke is one of the leading causes of long-term disability worldwide. A large proportion of stroke survivors suffer from **upper-limb motor impairment** (arm, elbow, wrist, and hand weakness or spasticity). Traditional rehabilitation:

- Is repetitive, tedious, and has low patient motivation/adherence
- Relies heavily on therapist availability and subjective assessment
- Lacks real-time adaptive feedback to the patient's fatigue or movement quality
- Produces no objective, structured data for therapists to track progress over time

The core **research problem** is:

> *How can we build a smart, data-driven, gamified rehabilitation system that integrates a robotic exoskeleton, detects patient fatigue and compensatory movements in real time, and provides clinicians with objective progress data — all while keeping the patient engaged?*

---

## 3. Solution

The **ReHyb System** is a multi-component, distributed software platform that connects:

- A **upper-limb robotic exoskeleton** (physical hardware) measuring joint angles in real-time
- A **gamified exercise environment** (VR/Badminton game on PC)
- **AI modules** for fatigue prediction and compensatory movement detection
- A **Patient-facing dashboard** (Next.js web app running in Electron) for exercise control and guidance
- A **Therapist-facing dashboard** (React/TypeScript) for patient management, goal setting, and progress review
- A **cloud-ready microservices backend** (Node.js + MongoDB + RabbitMQ) for storing digital twin profiles and session data

---

## 4. System Architecture

The system has three major layers:

### Layer 1 — Local Runtime (Electron Desktop App: `ReHybSystem`)

- Built with **Electron.js** + **Node.js**
- Acts as the **local orchestrator** running on the patient's therapy PC
- On startup, launches three Python AI modules in separate terminals
- Hosts two **WebSocket servers** (ports 3001, 3002) for real-time inter-process communication
- Receives sensor data from the exoskeleton over **UDP** and routes it to the correct AI module
- After each session, **merges all log data** (game performance, exoskeleton kinematics, fatigue, compensation) into a unified JSON payload and POSTs it to the backend server
- Manages the **game lifecycle**: launching Unity-based `.exe` games, receiving GameStart/GameEnd events, and orchestrating the full data pipeline

### Layer 2 — Python AI Modules (Real-Time Signal Processing)

Three Python scripts run as concurrent async services using `asyncio` + `websockets` + UDP sockets:

**`MessageHandler.py`** — The data router
- Receives raw joint angle data from the exoskeleton via **UDP port 44**
- Forwards data to the fatigue, compensation, and game modules on separate UDP ports (3101, 3102, 3104, 3106)
- Supports three modes: **Exercise**, **Assessment**, and **VR** (for immersive VR sessions)
- Logs all exoskeleton kinematics per session

**`FatiguePrediction.py`** — Real-time fatigue estimation
- Receives **Elbow Flexion/Extension (EFE)** angle data via UDP
- Implements a **repetition-counting algorithm** using angle threshold detection (CURL_ANGLE_THRESHOLD = 30°)
- Applies an **exponential fatigue decay model**: `fatigue = 1 - exp(-0.4 * (curl_count - 1))`
- Sends real-time fatigue level back to the exoskeleton controller (UDP port 3105) to adapt assistance torque
- Logs timestamped fatigue levels per session

**`CompensationDetection.py`** — Compensatory movement detection
- Monitors **Shoulder Forward/Extension (SFE)** angle via UDP
- Applies a threshold rule (SFE > 30°) to detect **shoulder compensatory rotation** — a common maladaptive pattern where patients use shoulder elevation to substitute for reduced elbow movement
- Sends real-time alerts to the game (UDP) to trigger visual feedback
- Logs compensation events as labeled time windows for clinical review

### Layer 3 — Microservices Backend (`ReHybSystemMicServer`)

Containerized with **Docker Compose**, consisting of 4 Node.js microservices + MongoDB + RabbitMQ:

| Service | Port | Technology | Function |
|---|---|---|---|
| `ReHybSystemServer` | 3000 | Node.js / Express / Mongoose | Core API — authentication, patient digital twin CRUD, session data upload, therapist management |
| `ChatHandSystemServer` | 3002 | Node.js / TypeScript | Real-time messaging between therapist and patient |
| `NoteHandSystemServer` | 3003 | Node.js | Clinical notes management |
| `DataHandSystemServer` | 3004 | Node.js / TypeScript | Session log data handling and analytics |
| **MongoDB** | 27017 | Database | Patient profiles, session records, messages, notes |
| **RabbitMQ** | 5672 / 15672 | Message broker | Async inter-service communication |

---

## 5. Digital Twin Patient Model

A key architectural feature is the **Patient Digital Twin** — a rich MongoDB data model (`userModel.mjs`) that stores a complete longitudinal profile for each patient:

- **Demographics:** age, gender, weight, height
- **Stroke-specific data:** type, time since stroke, paretic side, dominant side
- **Long-term and short-term therapy goals**, quantified by:
  - **Range of Motion (ROM)** targets for 7 joints (shoulder AA/FE/IE/HFE, elbow FE, wrist PS, finger FE)
  - **Strength** — required support torques per joint
  - **Spasticity** ratings per joint
  - **Endurance** targets per limb segment
  - **Cognitive** scores, aphasia and neglect flags
- **Patient interests** (sports, cooking, ADL, gardening, etc.) for personalized game content
- **Activity status** (Offline / Online / Exercising)
- **3D avatar files** for VR representation
- **Session notes** with therapist authorship and timestamps

---

## 6. Frontend Applications

### Patient Dashboard (Next.js in Electron)

- Built with **Next.js** + React, served via Electron
- Guides patients through the full therapy workflow:
  `Login → Mood Survey → ROM Assessment → Exercise Selection → Game → Exercise Rating → Result Upload`
- Includes a **ROM assessment module** — guides patients through range-of-motion tests with the exoskeleton before exercises begin
- Communicates with the Electron main process via **WebSocket (port 3001)** to trigger game launch
- Uploads merged session data to the backend after each completed session

### Therapist Dashboard (React + TypeScript + Vite)

- Built with **React / TypeScript / Tailwind CSS**
- Key features:
  - Patient list management and new patient registration
  - Per-patient detail views with therapy goal setting (ROM, strength, endurance, cognitive)
  - Exercise protocol assignment and scheduling (calendar integration)
  - Session progress review and analytics
  - Real-time messaging with patients
  - Dashboard overview showing patient activity status

---

## 7. Technologies & Skills

| Category | Technologies |
|---|---|
| **Languages** | JavaScript (Node.js), TypeScript, Python, HTML/CSS |
| **Frontend** | React, Next.js, TypeScript, Tailwind CSS, Vite |
| **Desktop** | Electron.js |
| **Backend** | Node.js, Express.js, RESTful APIs |
| **Databases** | MongoDB (via Mongoose ODM) |
| **Message Queue** | RabbitMQ (AMQP) |
| **Real-time Comms** | WebSocket (`ws` / `websockets`), UDP sockets |
| **AI / Signal Processing** | Python `asyncio`, threshold-based classifiers, exponential fatigue modelling, kinematic feature extraction |
| **DevOps** | Docker, Docker Compose, multi-container orchestration |
| **Hardware Integration** | UDP-based exoskeleton interface, joint angle data parsing (EFE, SFE, shoulder AA/FE/IE) |
| **Game Integration** | Unity game (`.exe`) launched from Electron, bidirectional UDP communication |
| **Security** | JWT-based authentication (`x-access-token`), middleware-based route protection |

---

## 8. Key Technical Contributions

1. **End-to-end system integration** — connected physical exoskeleton hardware to AI analysis to clinical dashboards via a custom multi-protocol communication architecture (UDP + WebSocket + REST API)
2. **Real-time fatigue adaptive control** — implemented a biomechanically-informed fatigue model that feeds back to the exoskeleton in real time to modulate assistance torque based on repetition count
3. **Compensatory movement detection** — rule-based kinematic classifier running at 10 Hz, providing live alerts to the game to discourage harmful shoulder substitution patterns
4. **Digital twin architecture** — designed a rich, extensible patient data model capturing clinical, biomechanical, and behavioural dimensions for longitudinal tracking
5. **Microservices backend** — designed and deployed a multi-service containerised backend with message-broker-based inter-service communication (RabbitMQ)
6. **Gamified therapy UX** — co-designed patient and therapist UI workflows to maximise engagement, clinical usability, and data traceability
7. **Session data pipeline** — automated collection, merging, and cloud upload of multi-source session logs (kinematics, fatigue, compensation, game score) at session end

---

## 9. Impact & Clinical Relevance

- Addresses the **low engagement** problem in stroke rehabilitation through game-based therapy
- Provides **objective, quantitative data** to therapists — replacing subjective observation with timestamped, multi-channel session logs
- Enables **adaptive rehabilitation** — fatigue-aware exoskeleton assistance reduces risk of overexertion
- Supports **remote or semi-autonomous therapy** through a guided patient interface
- Scalable architecture suitable for **clinical trials** and **multi-patient deployment** (Docker, microservices backend)

---

## 10. Repository Structure

```
NewCode/
├── ReHybSystem/                    # Electron desktop app (local orchestrator)
│   ├── main.js                     # Main process: WebSocket servers, game launcher, data pipeline
│   └── Modules/
│       ├── MessageHandler.py       # Exoskeleton data router (UDP)
│       ├── FatiguePrediction.py    # Real-time fatigue estimation
│       ├── CompensationDetection.py# Compensatory movement detection
│       ├── Patient_Dashboard/      # Next.js patient-facing UI
│       └── Badminton_Windows/      # Unity game executable
│
├── ReHybSystemMicServer/           # Containerised microservices backend
│   ├── docker-compose.yml          # MongoDB + RabbitMQ + 4 Node.js services
│   ├── ReHybSystemServer/          # Core REST API (auth, digital twin, session upload)
│   ├── ChatHandSystemServer/       # Therapist-patient messaging service
│   ├── NoteHandSystemServer/       # Clinical notes service
│   └── DataHandSystemServer/       # Session data analytics service
│
└── Therapist_Dashboard/            # React/TypeScript therapist-facing UI
    └── src/
        ├── dashboard/              # Overview and calendar
        ├── patients/               # Patient management and goal setting
        ├── exercises/              # Exercise protocol management
        └── messages/               # Real-time chat UI
```
