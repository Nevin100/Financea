# 🚀 Financea Internship Project  
<hr/>

## 📌 Overview  
Instant Paid is a scalable platform designed for enterprises to manage accounting and expense tracking efficiently.  


## 🎨 Design :
<h6>https://www.figma.com/design/KRWtfhMioOGzQsHoC4gjjo/Financea-team?node-id=0-1&p=f&t=REzM1NoUf3EBXlor-0</h6>

<hr/>

## ⚙️ Installation & Setup  
sh
# 📥 Clone the repository  
git clone https://github.com/your-repo/financea.git  
cd financea  

# 📦 Install dependencies  
npm install  

# 🔧 Set up environment variables  
cp .env.example .env  
# Configure the necessary environment variables  

# ▶️ Start the development server  
npm run dev  

## Folder Structure /: 
frontend/
│── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/
│   │   │   │   ├── route.ts      # Signup API
│   │   │   ├── login/
│   │   │   │   ├── route.ts      # Login API
│── lib/
│   ├── redux/
│   │   ├── store.ts          # Redux Store Setup
│   │   ├── authSlice.ts      # Redux Slice for Authentication
│── utils/
│   ├── validations.ts        # Zod Validation Schemas
│── .env.local                # MongoDB & JWT Secret
│── Middlewares/
    │──middlewares.ts         # Middleware for authentication
│── next.config.js            
│── package.json              


