# 🚀 Project Name

## 📌 Table of Contents
- [Introduction](#introduction)
- [Demo](#demo)
- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Challenges We Faced](#challenges-we-faced)
- [How to Run](#how-to-run)
- [Tech Stack](#tech-stack)
- [Team](#team)

---

## 🎯 Introduction
- The *AI-Driven Customer Insights Platform* is designed to help financial institutions better understand their customers through AI-powered analytics.
- *Problem Statement*: Traditional customer analysis methods are slow, inefficient, and lack personalization. Banks and financial institutions struggle to offer customized services due to limited insights from customer data.
- *Our Solution*: We leverage AI models to analyze transaction history, social media sentiment, and other data points to generate personalized banking insights and recommendations.


## 🎥 Demo
🔗 [Live Demo](#) (if applicable)  
📹 [Video Demo](#) (if applicable)  
🖼️ Screenshots:

![Screenshot 1](link-to-image)
Screenshot1-https://drive.google.com/file/d/1xlTzBJ1VtrXBbPCu1q8tfdEey_ehHPHY/view?usp=sharing
Screenshot2-https://drive.google.com/file/d/1PKOrHcccSeY2-Hb96FY_i1WAgP7UhNu3/view?usp=sharing
Screenshot3-https://drive.google.com/file/d/1uOFxo6gdBlm6-MeEUvAaqJGK1NFtqlg5/view?usp=sharing

## 💡 Inspiration
- The idea originated from the *growing demand for personalized banking experiences*.
- Customers want tailored financial advice, but banks struggle to process large amounts of unstructured data efficiently.
- Inspired by AI advancements, we sought to build a system that transforms raw customer data into *actionable insights*.
- The goal is to enhance customer satisfaction while *optimizing bank revenue through better-targeted services*.

## ⚙️ What It Does
- *Customer Segmentation*: Groups customers based on spending patterns, demographics, and behavior.
- *Personalized Offers*: AI-generated banking offers tailored to individual customer needs.
- *Transaction Analysis*: Identifies spending trends and provides insights on financial habits.
- *Sentiment Analysis*: Uses social media data to understand customer sentiment toward financial products.
- *Real-time Insights*: Provides instant recommendations based on customer interactions.

## 🛠️ How We Built It
- *Backend Development*:
  - Built using *Python* to handle API requests and process customer data.
  - Uses *Pandas and NumPy* for data cleaning and transformation.
  - *Caching with @lru_cache* to improve performance when loading customer data.
- *AI Model*:
  - *Ollama AI model* trained to analyze transaction history and customer preferences.
  - Pre-trained on financial datasets for accurate predictions.
- *Frontend*:
  - Uses *React* for an interactive UI.

## 🚧 Challenges We Faced
- *Data Handling*: Processing large transaction datasets efficiently without performance bottlenecks.
  - *Solution*: Used caching and optimized data processing pipelines.
- *AI Model Accuracy*: Training the model to generate meaningful insights without bias.
  - *Solution*: Used diverse datasets and continuous model fine-tuning.
- *Deployment & Scaling*: Ensuring the system remains responsive under heavy loads.
  - *Solution*: Implemented cloud-based autoscaling and load balancing.

## 🏃 How to Run
1. *Clone the repository*  
   sh
   git clone https://github.com/ewfx/aidhp-finovators.git
   
2. *Install dependencies and run the app*
### Backend
  ```
cd code/src/backend
pip install -r requirements.txt
ollama create bankingmodel -f{ModeFile} #ModelFile is in backend directory
python app.py
 ```

### Frontend
```
cd code/src/frontend
npm install
npm run dev
```
 
   

## 🏗️ Tech Stack
- 🔹 Frontend: React 
- 🔹 Backend: Python
- 🔹 Database: Firebase
- 🔹 AI Model: Ollama

## 👥 Team
- Ananditaa H - https://github.com/ananditaa | https://www.linkedin.com/in/ananditaa-h-7b1387209/
- Yuvan Shankar - [GitHub](#) | [LinkedIn](#)
- Ram Ganesh - [GitHub](https://github.com/Ram-20062003) | [LinkedIn](https://www.linkedin.com/in/ram-ganesh-k-r-0796a121b/)
