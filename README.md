---

# 🚀 Financea Internship Project  

## 📌 Overview  
**Financea** is a scalable platform designed for enterprises to efficiently manage **accounting and expense tracking**.  

---

## 🎨 Design  
🔗 **Figma Link:** : https://www.figma.com/design/KRWtfhMioOGzQsHoC4gjjo/Financea-team?node-id=0-1

---

## ⚙️ Installation & Setup  

```sh
# 📥 Clone the repository  
git clone https://github.com/your-repo/financea.git  
cd financea  

# 📦 Install dependencies  
npm install  

# 🔧 Set up environment variables  
cp .env.example .env  # Configure the necessary environment variables  

# ▶️ Start the development server  
npm run dev  
```

---

## 📂 Folder Structure  
```
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
│── middlewares/
│   ├── middlewares.ts        # Middleware for authentication
│── .env.local                # MongoDB & JWT Secret
│── next.config.js            
│── package.json              
```
 😎
