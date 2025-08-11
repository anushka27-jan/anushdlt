# AnushDLT - Depression Level Assessment Tool

A comprehensive mental health screening application built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

1. **Download** this project folder
2. **Open** the folder in VS Code
3. **Install dependencies**: `npm install`
4. **Start development server**: `npm run dev`
5. **Open browser**: `http://localhost:3000`

## ✨ Features

- **Professional Assessment**: 9-question depression screening based on PHQ-9
- **Real-time Progress**: Interactive questionnaire with progress tracking
- **Intelligent Scoring**: Backend API processes responses and calculates severity levels
- **Personalized Results**: Color-coded results with tailored recommendations
- **Crisis Resources**: Immediate support information for higher severity levels
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 📁 Project Structure

\`\`\`
anushdlt-app/
├── app/                    # Next.js App Router
│   ├── api/assessment/     # Backend API endpoint
│   ├── assessment/         # Assessment questionnaire page
│   ├── results/           # Results display page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Landing page
├── components/ui/         # Reusable UI components
├── lib/                   # Utility functions
└── .vscode/              # VS Code configuration
\`\`\`

## 🎯 Severity Levels

- **Minimal (0-4)**: Basic wellness recommendations
- **Mild (5-9)**: Lifestyle changes and counseling suggestions  
- **Moderate (10-14)**: Professional help strongly recommended
- **Severe (15+)**: Immediate professional intervention advised

## ⚠️ Important Disclaimer

This application is a screening tool and not a substitute for professional medical advice, diagnosis, or treatment. If you're experiencing thoughts of self-harm, please contact emergency services or a crisis helpline immediately.

## 🆘 Crisis Resources

- National Suicide Prevention Lifeline: **988**
- Crisis Text Line: Text **HOME** to **741741**
- Emergency: **911**

## 🛠️ Technologies Used

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Radix UI Components
- Lucide React Icons

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 VS Code Setup

This project includes VS Code configuration for:
- Debugging (server-side and client-side)
- Auto-formatting with Prettier
- ESLint integration
- TypeScript support

## 📄 License

This project is for educational and screening purposes only. Please consult with healthcare professionals for medical advice.
\`\`\`

```text file=".gitignore"
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
