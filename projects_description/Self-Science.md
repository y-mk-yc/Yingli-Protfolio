# Projects — Technical Description for CV / NotebookLM

This document covers two projects:
1. **Self Science Platform** — a Flutter monorepo for physiological research and wellness (primary project)
2. **Green** — a .NET 8 microservices backend for a social media / content platform (secondary project)

---

---

# Project 1: Self Science Platform

## Problem Statement

Wellness centers, clinical researchers, and health practitioners need to run structured physiological measurement studies on participants. Current solutions are fragmented: wearable sensor hardware is siloed from clinical workflows, data ends up in disconnected spreadsheets, and practitioners have no real-time visibility into participant adherence or wellbeing. Participants also lack a guided mobile experience that integrates biosensors with daily health practices.

The Self Science platform solves this by providing a fully integrated, end-to-end ecosystem: a mobile sensing app for participants, a desktop station for supervised lab sessions, a practitioner web dashboard, and a shared cloud backend — all connected through the same data layer.

---

## What We Built

A **Flutter monorepo** containing three cross-platform applications and shared packages, all backed by a Directus CMS backend and Google Cloud Storage.

---

### Application 1 — `apps/mhealth`: Participant Mobile App (Android)

Guides participants through structured research studies on their own smartphones.

**Key capabilities:**
- Connects to Bluetooth Low Energy (BLE) biosensors — Polar heart-rate monitors (H10, H360) and InteraXon Muse EEG headsets — for real-time physiological data streaming
- Streams and uploads biometric data (ECG, PPG, Heart Rate, Accelerometer, EEG, Gyroscope, PPI) in CARP-compatible JSON to Google Cloud Storage
- Built on **CARP Mobile Sensing (CAMS)**, a research-grade mobile sensing framework from DTU (Technical University of Denmark), for study protocol management, sensor scheduling, and structured data collection
- Fetches study protocols from Directus, converts them to CARP `SmartphoneStudyProtocol` objects, deploys them on-device, and executes them
- Participants can log timestamped biometric events, view real-time biosignal charts, submit mood journal check-ins with AI-generated empathetic responses, and track action plan tasks
- Uses **Flutter BLoC** for the sensing layer (`CarpBloc`) and **Provider/ChangeNotifier** for UI state

---

### Application 2 — `apps/self_science_station`: Lab Desktop App (Windows/Linux)

Runs on a research station PC during supervised sessions at a wellness center.

**Key capabilities:**
- Connects simultaneously to multiple Polar sensors (H10, H360) for high-resolution ECG, PPG, and PPI streaming
- Multi-sensor aggregation with real-time signal quality assessment
- Streams session data to GCS for downstream processing pipelines
- Integration tests validate real hardware (Polar H360 PPG streaming) — no hardware mocking

---

### Application 3 — `apps/webapp`: Practitioner Web Dashboard (Flutter Web)

Role-gated web interface for practitioners and clients.

**Client view:** Study progress, session history, check-in journal, action plan task tracking

**Practitioner view:**
- All clients in their center, filtered and sorted by mood level and adherence rate
- Broadcast messaging to selected clients
- Practice library management (modules, tasks — CRUD with category/type/sort filters)
- Center-specific study definitions and session completion monitoring

**Per-center dynamic theming:** each wellness center applies its own brand colors via Material 3 `ColorScheme`.

---

## Shared Package Architecture

All three apps depend on shared Dart packages — the single source of truth for data contracts, business logic, and sensor integrations.

### `packages/models` — Shared Data Models

Plain Dart classes with `fromMap()` / `toMap()` JSON serialization.

| Model Group | Key Classes |
|---|---|
| Users & Auth | `UserModel` — email, phone, DOB, height, weight, `UserRole` |
| Centers | `CenterModel` — name, brand colors, geo-location, studies, services |
| Studies & Sessions | `StudyModel`, `SessionModel`, `SessionStepModel`, `SessionStepResultModel` |
| Client-side | `ClientModel`, `CheckInModel` (with `aiResponse`), `TaskModel`, `MessageModel`, `RatingModel` |
| Sensors & Metrics | `SensorTypeModel`, `SensorInstanceModel`, `MetricModel` |
| Practices | `PracticeModel`, `PracticeStep` |

Enums (all with `.label` / `.emoji` UI extensions): `UserRole`, `LoginType`, `MoodLevel` (5-level), `PracticeFrequency`, `ClientFilter`, `ClientSort`

---

### `packages/providers` — Shared State Management

Flutter `ChangeNotifier` providers. All communicate with the Directus REST API with 3-attempt retry logic, timeouts, and UXCam error event logging.

| Provider | Responsibility |
|---|---|
| `UserProvider` | JWT auth, email/password login, OTP phone login, registration, token parsing |
| `StudyProvider` | Full study lifecycle — fetch, step resolution, start/end tracking, completion marking, session counting |
| `SensorProvider` | BLE scanning via `flutter_blue_plus`, Polar connection state machine, sensor metadata persistence |
| `ClientProvider` | Client list, mood/adherence filter, multi-select messaging (practitioner use) |
| `CheckInProvider` | Mood journal submit and retrieval, form validation |
| `TaskProvider` | Action plan CRUD, per-date completion tracking, `overallCompletionRate` computed getter |
| `ThemeProvider` | Generates Material 3 `ThemeData` from center brand colors; font: Poppins |
| `LocalProvider` | Device UUID, test mode flag, session timeout stream |
| `MessageProvider` | Practitioner-to-client broadcast messaging |
| `ModuleProvider` | Practice library CRUD, category/type/sort filtering |
| `UploadRetryProvider` | Queues failed sensor data uploads, retries on reconnect |

Sensor connection state machine:
```
discovering → connecting → connected
                        → available   (disconnected, previously seen)
                        → unavailable (connection timeout)
```

---

### `packages/sensors_core` — Low-Level Sensor SDK Wrappers

| Component | Description |
|---|---|
| `PolarAPI` | Wraps the Polar SDK to stream ECG, HR, PPG, PPI, Accelerometer, Gyroscope, Magnetometer, Skin Temperature per device. Supports `canRecord` metric filtering and configurable auto-reconnect. |
| `PolarAPIH10` | H10-specific variant |
| `MuseSDK` / `MuseSDK2` | BLE-level EEG/PPG/Accelerometer/Gyroscope streaming for Muse headsets — custom BLE packet parsing, epoch windowing, sample zipping, `ValueNotifier`-based streams |
| `MuseNativeManager` | Native BLE scan and connection manager for Muse devices |
| `SensorInstance` | Base class: local JSON file I/O, streaming lifecycle, signal quality checking |

---

## Technical Stack

| Layer | Technology |
|---|---|
| Mobile & Desktop Apps | Flutter / Dart (SDK >= 3.3.0) |
| State Management — UI | Flutter Provider (`ChangeNotifier`) |
| State Management — Sensing | Flutter BLoC |
| Mobile Sensing Framework | CARP Mobile Sensing (CAMS) — DTU |
| Backend / API | Directus 10.8.1 (headless CMS, REST + GraphQL) |
| Database | PostgreSQL (managed by Directus) |
| Cloud Storage | Google Cloud Storage (GCS) |
| Authentication | Directus JWT; OTP phone login via Twilio SMS |
| Polar Sensor SDK | Local fork of `polar` Flutter package — adds Polar H360 support |
| EEG Sensor | InteraXon Muse (custom BLE parsing — no official Flutter package) |
| BLE Scanning | `flutter_blue_plus` |
| AI Integration | Claude API (Anthropic) — server-side via Directus Flows |
| Backend Extensions | Custom Directus Node.js operations: GCP Storage uploader, Twilio SMS sender |
| Routing | `go_router` (mhealth), manual navigation (webapp) |
| Analytics / Crash | UXCam |
| Version Control | GitLab (feature-branch workflow, MR-gated merges) |
| Documentation | Docusaurus internal developer docs site |

---

## Key Technical Challenges and Solutions

### 1. Bridging Raw Sensor Streams into a Research Protocol Framework

**Problem:** CARP Mobile Sensing uses an abstract deployment model (protocols, tasks, triggers, measures) that does not directly expose raw BLE streams. The Polar SDK and Muse SDK have completely different APIs and data formats.

**Solution:** Designed and built `SensorUploadBridge` — a component that sits between the sensor APIs and the CARP data pipeline. It subscribes to live streams from `PolarAPI` and `MuseSDK`, wraps each data point in a CARP-compatible `Measurement` object with correct namespaces (`dk.cachet.carp.polar`, `dk.ssi.muse`), and forwards them into `DirectusDataManager` for upload to GCS. This decouples sensor SDKs from CARP's machinery while preserving data format compatibility with CARP tooling.

---

### 2. Directus-to-CARP Protocol Conversion

**Problem:** Study protocols are stored in Directus in a custom relational schema. CARP requires them as `SmartphoneStudyProtocol` Dart objects.

**Solution:** Built `ProtocolAnalyzer` to read Directus study JSON, align it to CARP's prototype structure, and merge multiple protocols (self and group study). `ProtocolToStudy` converts the merged result into a deployable `SmartphoneStudyProtocol`. All heavy processing runs in Dart `Isolate.run()` to keep the UI thread unblocked.

---

### 3. Polar H360 Support — Forked SDK

**Problem:** The Polar H360 is not supported by the upstream `polar` Flutter package on pub.dev.

**Solution:** Forked the Polar SDK locally (`libraries/polar-7.8.0-with360/`) and added H360 support. All three apps reference this local fork. The fork must never be replaced with the upstream package without re-implementing H360 support.

---

### 4. InteraXon Muse EEG — No Official Flutter Package

**Problem:** No Flutter package exists for the Muse EEG headset. Only native Android/iOS SDKs are available with no Dart bindings.

**Solution:** Built a custom BLE-level Muse integration from scratch: `MuseNativeManager` handles BLE scan and connection; `MuseParsers` parses raw BLE packets for EEG (4 channels), PPG, Accelerometer, and Gyroscope; epoch windowing and sample zipping are handled in utilities. All data is exposed via `ValueNotifier`-based streams.

---

### 5. Role-Based Multi-Tenant Architecture

**Problem:** The same backend serves participants, practitioners, and admins across many wellness centers, each with different branding and data access rules.

**Solution:** Directus roles (`client`, `practitioner`, `admin`) enforce per-row data access at the database level. JWT claims carry the role; `UserProvider.parseJwtRole()` extracts it on login. `ThemeProvider` dynamically generates a Material 3 `ColorScheme` from each center's brand colors. A static `kProgrammingApiToken` handles unauthenticated registration flows only.

---

### 6. Server-Side AI Integration (No API Keys in Mobile Binaries)

**Problem:** AI API keys embedded in Flutter app code are visible in compiled binaries.

**Solution:** All Claude API calls are routed through Directus Flows on the server. When a participant submits a check-in, a Directus Flow triggers, calls the Claude API using server-stored credentials, and writes the `ai_response` back to the check-in record. The Flutter app reads the response on the next fetch — zero API keys exist on the client side.

---

## Data Flow

### Sensor Data (End to End)

```
Participant wears Polar sensor / Muse headset
  |  BLE (Bluetooth Low Energy)
  v
PolarAPI / MuseSDK  (packages/sensors_core)
  |  Raw typed streams: HR, ECG, PPG, PPI, EEG, Acc, Gyro
  v
SensorUploadBridge
  |  Wraps as CARP Measurement objects
  |  Namespace: dk.cachet.carp.polar / dk.ssi.muse
  v
DirectusDataManager  →  HTTP POST to Directus
  v
GCP Storage Extension (custom Directus Node.js operation)
  v
GCS Bucket: raw/<centerId>/<studyId>/<sessionId>/<userId>_<sensorId>_<timestamp>.json
  |  (processing pipeline)
  v
processed/  (moved via GCS move operation on pipeline completion)
```

### Study Protocol (Fetch and Deploy)

```
Directus  (mobile_studies collection)
  |  MobileStudyService.fetchStudies()
  v
ProtocolAnalyzer.alignWithCARPProtocolPrototype()  [Dart Isolate]
  v
ProtocolAnalyzer.mergeProtocols()  [Dart Isolate]
  v
ProtocolToStudy.toStudy()  →  SmartphoneStudyProtocol
  v
SmartphoneDeploymentService.createStudyDeployment()
  v
SensingService  →  SmartphoneDeploymentController  (start / stop sensing)
  v
SensorUploadBridge.initWithDeployment()
```

### AI Check-In Response

```
Participant submits check-in (mood + journal text)
  |  CheckInProvider.submitCheckIn()  →  POST /items/check_ins
  v
Directus Flow triggers on item creation
  |  Server-side: calls Claude API  (API key in Directus env only)
  v
Directus writes ai_response back to check_ins record
  v
App reads aiResponse on next CheckInProvider.fetchRecentCheckIns()
```

---

## Backend — Directus CMS

**Version:** Directus 10.8.1  |  **Database:** PostgreSQL  |  **Auth:** JWT (access + refresh tokens)

### Key Collections

| Collection | Purpose |
|---|---|
| `directus_users` | User accounts |
| `centers` | Wellness / research center records |
| `studies` / `sessions` | Study and session definitions |
| `session_step_results` | Per-user step completion records |
| `mobile_studies` | CARP-style protocol definitions |
| `check_ins` | Mood journal entries with AI response field |
| `tasks` | Action plan task definitions |
| `practices` | Wellness practice library |
| `messages` | Practitioner to client messages |
| `sensor_types` / `sensor_instances` | Sensor catalog and per-user assignments |
| `physiological_metrics` | Metric definitions (ECG, HR, PPG, etc.) |

### Custom Backend Extensions (Node.js)

**GCP Storage Extension:**
- `upload` — uploads JSON sensor recordings to GCS, marks as Raw for downstream pipelines
- `move` — moves files from `raw/` to `processed/` on pipeline completion

**Twilio SMS Extension:**
- Sends OTP codes and practitioner notifications via SMS (called from Directus Flows)

---

## Testing

| Test | App | Coverage |
|---|---|---|
| `test/auth_test.dart` | mhealth | `UserProvider` login / logout flows |
| `test/sensor_service_test.dart` | mhealth | Sensor state machine transitions |
| `test/mobile_study_test.dart` | mhealth | `StudyProvider` step resolution |
| `integration_test/polar_360_ppg_test.dart` | station | Real Polar H360 PPG streaming (requires hardware) |
| `test/center_provider_test.dart` | providers | `CenterProvider` fetch and retry logic |

Directus API responses are tested against a real staging instance — HTTP mocking is not used (mocking has previously caused test/production divergence in this codebase).

---

## Project Context

| Attribute | Detail |
|---|---|
| Domain | Digital health / clinical research / wellness technology |
| Platform | Android mobile (mhealth), Windows/Linux desktop (station), Flutter Web (webapp) |
| Architecture | Flutter monorepo, multi-app, shared packages, headless CMS backend |
| Key integrations | Polar wearables, Muse EEG, CARP sensing framework, GCS, Claude AI, Twilio |
| Stack keywords | Flutter, Dart, BLoC, Provider, CARP, Directus, PostgreSQL, Google Cloud Storage, BLE, Polar SDK, Muse EEG, Claude AI, Twilio, GitLab |

---

---

# Project 2: Green — .NET 8 Microservices Backend

## What is Green?

Green is a backend platform for a social media / content application, built as a set of independent microservices using .NET 8 and ASP.NET Core. Each service owns its own PostgreSQL database and communicates with other services through Kafka event streaming. A YARP-based API Gateway routes all external traffic to the appropriate service.

---

## Architecture Overview

```
Client
  |
  v
Green.ApiGateway  (YARP reverse proxy)
  |
  +---> Green.User          (user auth, profiles)
  +---> Green.MediaManager  (media posts: image, video, audio, document)
  +---> Green.Catalog       (content/catalog items with comments)
  +---> Green.SocialGraph   (follows, likes)

All services share:
  Green.Common  (repository pattern, Result<T>, Kafka producer/consumer, EF Core setup)
```

---

## Services

### `Green.User` — User Service

Manages user accounts, authentication, and authorization.

**Endpoints:**

| Method | Route | Description |
|---|---|---|
| `GET` | `/users/{id}` | Get user by ID |
| `POST` | `/users` | Register new user |
| `POST` | `/users/login` | Login — returns JWT token |
| `PUT` | `/users/{id}` | Update user profile |
| `DELETE` | `/users/{id}` | Delete user |

**Key implementation details:**
- Passwords hashed with **BCrypt.Net** before storage — plaintext is never persisted
- Login validates BCrypt hash, then calls `TokenService.GenerateToken()` to produce a signed JWT
- **JWT** tokens are signed with HMAC-SHA256 using a secret key (minimum 32 bytes, validated at startup). Token carries `NameIdentifier`, `Name`, and `Email` claims
- On `GET /users/{id}`, the user data is also published to a Kafka topic (`UserServiceTopic`) — used to fan out events to other services
- Uses the `Result<T>` pattern throughout the service layer: operations return `Result<T>.Success(value)` or `Result<T>.Failure(errorCode)` — the controller maps error codes to HTTP status codes
- Planned: `GetRecommendedAsync()` returns latest 10 users by creation date; intended to be replaced with an AI recommendation algorithm with Redis caching

**Entity:**
```csharp
UserEntity { Id, Name, Email, PasswordHash, Role, CreatedAt, UpdatedAt }
```

---

### `Green.MediaManager` — Media Service

Manages media posts (images, videos, audio files, documents) uploaded by users.

**Endpoints:**

| Method | Route | Description |
|---|---|---|
| `GET` | `/media` | Get all media |
| `GET` | `/media/{id}` | Get media by ID |
| `GET` | `/media/recommended/{id}` | Get recommended posts for a user |
| `POST` | `/media` | Create media post |
| `PUT` | `/media/{id}` | Update media post |
| `DELETE` | `/media/{id}` | Delete media post |

**Key implementation details:**
- On `GET /media/{id}`, the media data is published to a Kafka topic (`PositonServiceTopic`) for downstream consumers
- `GetRecommendedAsync()` currently returns the latest 10 media items by `CreatedAt` descending — designed as a placeholder for a future AI recommendation engine with Redis caching
- Supports an inter-service HTTP client (`MediaClient`) for authenticating requests cross-service (token forwarding pattern)

**Entity:**
```csharp
Media { Id, Title, CoverUrl, Type, ContentUrl, UserId, CreatedAt, UpdatedAt }
// Type: "image" | "video" | "audio" | "document"
```

---

### `Green.Catalog` — Content Catalog Service

Manages generic content items (articles, guides, catalog entries) with support for comments.

**Endpoints:**

| Method | Route | Description |
|---|---|---|
| `GET` | `/contents` | Get all content |
| `GET` | `/contents/{id}` | Get content by ID |
| `POST` | `/contents` | Create content item |
| `PUT` | `/contents/{id}` | Update content item |
| `DELETE` | `/contents/{id}` | Delete content item |

**Entities:**
```csharp
Content { Id, Title, ContentBody, CreatedAt, UpdatedAt }
Comment { ... }
```

---

### `Green.SocialGraph` — Social Graph Service

Tracks social relationships between users: follows and likes.

**Status:** Early stage — entities and database context are defined; controllers and service layer are in progress.

**Entities:**
```csharp
Follow { Id, UserId, CreatedAt, UpdatedAt }
Like   { Id, UserId, CreatedAt, UpdatedAt }
```

---

### `Green.ApiGateway` — API Gateway

A minimal **YARP (Yet Another Reverse Proxy)** gateway that routes all incoming client requests to the correct microservice based on configuration. No business logic lives here — it is purely a routing layer.

```csharp
// Program.cs — the entire gateway
builder.Services.AddReverseProxy().LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));
app.MapReverseProxy();
```

Route rules are defined in `appsettings.json` under the `ReverseProxy` section.

---

### `Green.Common` — Shared Library

A NuGet-published class library (`v1.0.15`) shared across all services. Contains:

**Repository Pattern:**
```csharp
IRepository<T> {
    GetAllAsync()
    GetAllAsync(predicate)
    GetByIdAsync(id)
    GetByIdAsync(predicate)
    CreateAsync(entity)
    UpdateAsync(entity)
    DeleteAsync(id)
}
// Implemented by PostgresRepository<T> using EF Core + Npgsql
```

`IEntity` interface enforces: `Id (Guid)`, `CreatedAt (DateTimeOffset)`, `UpdatedAt (DateTimeOffset)` on all domain entities.

**Result Pattern:**
```csharp
Result<T> {
    Value, IsSuccess, Error
    static Success(value), Success(), Failure(errorCode)
}
```
Used throughout service layers to return typed results without throwing exceptions. Controllers map error codes to HTTP status codes.

**Kafka Integration:**

- `ProducerService` — generic async Kafka producer using `Confluent.Kafka`. Serializes message payloads to JSON, publishes to a named topic with a string key.
- `KafkaConsumerBase` — abstract `BackgroundService`. Subscribes to configured topics, runs a consume loop, and dispatches each message to the abstract `HandleMessage()` method that subclasses override.
- `KafkaSettings` — configuration model: `BootstrapServers`, `GroupId`, `Acks`, `AllowAutoCreateTopics`, `Subscribes`

**PostgreSQL Setup Extension:**
```csharp
// Registers EF Core + Npgsql + generic repository in one call
builder.Services.AddPostgres(configuration);
builder.Services.AddPostgresRepository<TEntity>();
```

---

## Technical Stack

| Layer | Technology |
|---|---|
| Framework | .NET 8 / ASP.NET Core |
| Language | C# 12 |
| ORM | Entity Framework Core 8 with Npgsql (PostgreSQL) |
| Authentication | JWT Bearer (HMAC-SHA256, `Microsoft.AspNetCore.Authentication.JwtBearer`) |
| Password Hashing | BCrypt.Net-Next |
| Message Broker | Apache Kafka (Confluent.Kafka 2.4.0) |
| API Gateway | YARP (Yet Another Reverse Proxy) |
| API Documentation | Swagger / Swashbuckle |
| Observability | OpenTelemetry (logs + traces exported via OTLP) |
| Architecture | Microservices, each service owns its own database |
| Inter-service comms | Kafka events (async) + HTTP clients (sync, where needed) |
| Repository | Generic `IRepository<T>` / `PostgresRepository<T>` pattern |
| Service layer | `Result<T>` monad pattern — no uncaught exceptions in controllers |

---

## Key Design Decisions

### 1. Each Service Owns Its Own Database
Each microservice (User, MediaManager, Catalog, SocialGraph) has its own `DbContext` and runs its own EF Core migrations. There are no cross-service database joins — inter-service data is accessed via HTTP clients or by consuming Kafka events.

### 2. Result Pattern Instead of Exceptions
All service methods return `Result<T>` rather than throwing exceptions for expected failure cases (not found, invalid input, etc.). Controllers inspect `result.IsSuccess` and map `result.Error` to the appropriate HTTP status code. This keeps exception handling out of the normal control flow.

### 3. Kafka for Event-Driven Decoupling
When a user is fetched (`GET /users/{id}`) or media is retrieved (`GET /media/{id}`), the data is also published as a Kafka event. This allows other services to react to activity without polling or tight coupling. The `KafkaConsumerBase` `BackgroundService` provides a consistent consumer pattern across all services.

### 4. Generic Repository via `IEntity` Constraint
`PostgresRepository<T>` is constrained to `T : class, IEntity`. Because all entities implement `IEntity`, the same repository handles `CreatedAt`/`UpdatedAt` stamping, GUID generation, and CRUD uniformly across all services without code duplication.

### 5. JWT Enforcement at Startup
The User service validates at startup that `JwtSecret` is at least 32 bytes (256 bits). A weak key causes an `InvalidOperationException` before the service accepts any traffic — preventing silent security misconfigurations.

---

## Project Context

| Attribute | Detail |
|---|---|
| Domain | Social media / content platform backend |
| Architecture | Microservices with independent databases, event-driven with Kafka, API Gateway routing |
| Platform | .NET 8, runs on any OS |
| Status | Core services functional (User, Media, Catalog); SocialGraph in progress |
| Stack keywords | .NET 8, C#, ASP.NET Core, EF Core, PostgreSQL, Kafka, YARP, JWT, BCrypt, OpenTelemetry, Swagger, microservices, repository pattern, Result pattern |
