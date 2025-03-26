# summarizer.py - Optimized Preloading Summary with Ollama Model Creation

import pandas as pd
import ollama
from functools import lru_cache
import firebase_admin
from firebase_admin import credentials, db





cred = credentials.Certificate('./auth/hackathon-2025-f43df-firebase-adminsdk-fbsvc-25543fce48.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://hackathon-2025-f43df-default-rtdb.firebaseio.com/'
})
# Load Excel sheets into DataFrames at the start (to avoid re-reading on every request)
file_path = 'data/hackathon_dataset.xlsx'
sheets_dict = pd.read_excel(file_path, sheet_name=None)
customer_profile_df = sheets_dict['Customer Profile (Individual)'].set_index('Customer_Id')
transaction_history_df = sheets_dict['Transaction History'].set_index('Customer_Id')
social_media_df = sheets_dict['Social Media Sentiment'].set_index('Customer_Id')

# In-memory cache for preloaded customer summaries
preloaded_summaries = {}

def create_ollama_model_for_offers(custid, summary):
    try:
        model_content = (
            f"### System\nUse this summary to understand the customer  .\n\n"
            f"{summary}\n\n### User\nUse this summary as reference for any other queries.\n"
            f"Consider your role as a Wells Fargo banking advisor for the customer, who will be helping with doubts and providing offers and suggestions that the bank has."
        )
        model_name = f"cust_{custid}_summary"

        # Create the model dynamically using Ollama
        ollama.create(
            model=model_name,
            from_='bankingmodel',
            system=model_content
        )

        # Cache the model name after successful creation
        preloaded_summaries[custid] = model_name

    except Exception as e:
        print(f"Error creating Ollama model for Customer {custid}: {e}")

def create_ollama_model(custid, summary):
    try:
        model_content = (
            f"### System\nUse this summary to understand the customer and you are a wells fargo banking advisor for the customer who will be helping in his doubts and giving him the offers and suggesstions that bank has .\n\n"
            f"{summary}\n\n### User\nUse this summary as reference for any other queries.\n"
        )
        model_name = f"cust_{custid}_summary"

        # Create the model dynamically using Ollama
        ollama.create(
            model=model_name,
            from_='bankingmodel',
            system=model_content
        )

        # Cache the model name after successful creation
        preloaded_summaries[custid] = model_name

    except Exception as e:
        print(f"Error creating Ollama model for Customer {custid}: {e}")

@lru_cache(maxsize=100)
def generate_summary(custid):
    try:
        base_summary=''
        if custid in customer_profile_df.index:
            customer = customer_profile_df.loc[custid]

            # Create a compact summary with essential details only
            base_summary = (
                f"Customer {custid}: {customer['Age']} years, {'Male' if customer['Gender'] == 'M' else 'Female'}, "
                f"{customer['Occupation']} from {customer['Location']}, earning ${customer['Income per year ($)']} annually. "
                f"Interests: {customer['Interests']}."
            )

        # Compact transaction summary (last 2)
        if custid in transaction_history_df.index:
            transaction_rows = transaction_history_df.loc[[custid]]
            if not transaction_rows.empty:
                transaction_summary = "; ".join(
                    f"{row['Category']} of ${row['Amount ($)']} on {row['Purchase_Date']}"
                    for _, row in transaction_rows.iterrows()
                )
                base_summary += f" Transaction history: {transaction_summary}."

        # Social media sentiment summary (ALL interactions)
        if custid in social_media_df.index:
                social_media_rows = social_media_df.loc[[custid]]
                if not social_media_rows.empty:
                    sentiment_summary = "; ".join(
                        f"Post: '{row['Content']}' ({row['Intent']})"
                        for _, row in social_media_rows.iterrows()
                    )
                    base_summary += f" Social media interactions: {sentiment_summary}."


        # Return the generated summary
        return base_summary

    except Exception as e:
        return f"An error occurred while generating the summary: {e}"


# Flask APIs to manage the workflow
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/preload-summary', methods=['POST'])
def preload_summary():
    data = request.json
    custid = data.get("custid")

    if not custid:
        return jsonify({"error": "Customer ID is required"}), 400

    summary = generate_summary(custid)
    create_ollama_model(custid, summary)

    return jsonify({"message": summary})

@app.route('/get-offers', methods=['POST'])
def get_offers():
    data = request.json
    custid = data.get("custid")
    user_input = data.get("user_input")

    if not custid or not user_input:
        return jsonify({"error": "Customer ID and user input are required"}), 400

    # Check if the model is created
    short_query = f"User said: '{user_input}'."

    try:
        stream = ollama.chat(
            model=f"cust_{custid}_summary",
            messages=[ {"role": "user", "content": short_query}],
            stream=True,
        )

        response_content = ""
        for message in stream:
            response_content += message["message"]["content"]

        return jsonify({"offers": response_content})

    except Exception as e:
        return jsonify({"error": f"Ollama API call failed: {e}"}), 500
    
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get("custid")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        # Check credentials in Firebase Realtime Database
        ref = db.reference('users')
        users = ref.get()

        # Check if the user exists and verify the password
        if email in users and users[email]['password'] == password:
            return jsonify({"message": "Login successful!"})
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        return jsonify({"error": f"Firebase database error: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)


