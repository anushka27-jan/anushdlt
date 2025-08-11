#!/bin/bash
# AnushDLT Setup Script
echo "Setting up AnushDLT Depression Assessment App..."

# Create project directory
mkdir -p anushdlt-app
cd anushdlt-app

# Initialize npm project
npm init -y

# Install Next.js and dependencies
npm install next@14.0.4 react@18 react-dom@18
npm install @radix-ui/react-label@^2.0.2 @radix-ui/react-progress@^1.0.3 @radix-ui/react-radio-group@^1.1.3
npm install class-variance-authority@^0.7.0 clsx@^2.0.0 lucide-react@^0.294.0 tailwind-merge@^2.2.0

# Install dev dependencies
npm install -D @types/node@^20 @types/react@^18 @types/react-dom@^18
npm install -D autoprefixer@^10.0.1 eslint@^8 eslint-config-next@14.0.4
npm install -D postcss@^8 tailwindcss@^3.4.17 typescript@^5

echo "Dependencies installed successfully!"
echo "Now copy all the project files and run: npm run dev"
