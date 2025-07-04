# Pantau Warga Cimahpar Stoneyard 🌙

Welcome to Pantau Warga Cimahpar Stoneyard, a comprehensive web application designed to connect neighbors, streamline communication, and manage community activities efficiently. This project is a tailored version of the Nextacular open-source starter kit.

**Features** packaged out-of-the-box: **Authentication**, **Billing & Payment**, **Database**, **Email**, **Custom Domains**, **Multi-tenancy**, **Workspaces**, and **Teams**

## ✨ Key Features (Community Hub)

- **Dynamic Landing Page**: A welcoming entry point for visitors and residents, showcasing latest news and marketplace items.
- **User Authentication**: Secure login and registration system powered by Firebase Authentication, with a role-based access structure (`warga`, `admin`, `superadmin`).
- **Announcements**: Keep residents informed with the latest official news and updates from the community management.
- **Classifieds Marketplace**: A resident-only marketplace to buy, sell, or trade items, featuring an auto-scrolling carousel and full ad management capabilities (create, edit, delete).
- **AI-Powered Issue Reporting**: Residents can report issues (e.g., maintenance, security), which are automatically summarized and categorized by a Genkit AI agent for faster routing and resolution.
- **Camera Integration**: Users can take photos directly from their device's camera when reporting issues or creating classified ads.
- **Resident Directory**: A management system for maintaining a directory of community residents.
- **Financial Management**:
    - **IPL Dues**: Track and manage monthly resident fees.
    - **Payment Confirmation**: A dedicated form for residents to confirm their payments.
    - **Financial Reports**: View comprehensive financial overviews with charts and transaction histories.
- **Photo Gallery**: A visual showcase of community events and activities.
- **Security & Waste Management**: View security patrol schedules and waste collection information.
- **"Curhat Warga" (Resident Venting)**: An anonymous, AI-powered feature where residents can share their thoughts and receive an empathetic, supportive response from an AI agent.
- **Multi-language Support**: Fully bilingual interface supporting both English and Indonesian (`en` / `id`).

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (with App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui, Headless UI
- **Icons**: Lucide React
- **AI/Generative**: Google Gemini via Genkit
- **Authentication**: Firebase Authentication
- **Notifications**: Gotify (optional)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env.local` in the root of your project and add the following configuration keys.

    **Firebase (Required for Authentication):**
    These credentials can be found in your Firebase project settings.
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=1:...
    ```

    **Gotify (Optional for Notifications):**
    If you want to use the push notification feature for issue reporting, set up a Gotify server and add its credentials.
    ```env
    GOTIFY_URL=https://your-gotify-server.com
    GOTIFY_TOKEN=YourGotifyAppToken
    ```

### Running the Application

1.  **Start the Next.js development server:**
    This runs the main web application.
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

2.  **Start the Genkit development server:**
    In a separate terminal, run this command to enable the AI features.
    ```bash
    npm run genkit:dev
    ```
    The Genkit development UI will be available at `http://localhost:4000`.

## 📂 Project Structure

- **/src/app/**: Contains all the pages and layouts, following the Next.js App Router structure.
- **/src/ai/**: Home to all Genkit-related code, including AI flows and prompts.
- **/src/components/**: Reusable React components, including UI components from Shadcn.
- **/src/context/**: React context providers for managing global state like authentication and internationalization (i18n).
- **/src/lib/**: Utility functions, static data, and Firebase configuration.
- **/src/locales/**: Translation files for `en` and `id` languages.
- **/src/services/**: Modules for interacting with external services (e.g., Gotify).
- **/public/**: Static assets like images and logos.
