from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
from flask_cors import CORS
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

@app.route('/predict_next', methods=['POST'])
def predict_next():
    try:
        # Parse input JSON
        data = request.get_json()
        input_features = data['features']  # Expecting last 60 'Close' price values
        symbol = data['ticker']
        type_of_data = data['type']  # Type of data: close, open, high, low, volume
        time_horizon = data['time_horizon']  # Prediction horizon: 1D, 5D, 1M, 3M, 6M, 1Y

        # Define the number of days for each horizon
        horizons = {
            "1D": 1,
            "5D": 5,
            "1M": 30,
            "3M": 90,
            "6M": 180,
            "1Y": 365
        }

        if time_horizon not in horizons:
            return jsonify({'error': 'Invalid time horizon. Choose from 1D, 5D, 1M, 3M, 6M, 1Y.'})

        prediction_days = horizons[time_horizon]

        # Ensure we have at least 60 values to work with
        if len(input_features) < 60:
            return jsonify({'error': 'Input must contain at least 60 values.'})

        # Get the latest 60 values
        input_features = input_features[-60:]

        model_path = f"models_{type_of_data}_prices/{symbol}_model.h5"
        model = load_model(model_path)

        # Ensure input contains exactly 60 values
        if len(input_features) != 60:
            return jsonify({'error': 'Input must contain exactly 60 values.'})

        # Initialize the scaler dynamically using the input features
        scaler = MinMaxScaler(feature_range=(0, 1))
        features = np.array(input_features).reshape(-1, 1)
        scaled_features = scaler.fit_transform(features)

        # Start prediction for the specified time horizon
        future_predictions = []
        prediction_dates = []
        input_sequence = scaled_features[-60:]  # Start with the last 60 days

        # Get the current date
        current_date = datetime.now()

        for day in range(prediction_days):
            # Reshape the input sequence to match LSTM input shape (1, 60, 1)
            input_seq = input_sequence.reshape(1, 60, 1)

            # Predict the next value in scaled form
            next_pred_scaled = model.predict(input_seq)[0][0]

            # Inverse transform to get the actual prediction
            next_pred = scaler.inverse_transform([[next_pred_scaled]])[0][0]

            if type_of_data == "low":
                future_predictions.append(next_pred - random.randint(0, 20))
                print(future_predictions)
            else:
                future_predictions.append(next_pred)

            # Calculate the corresponding date for the prediction
            prediction_date = current_date + timedelta(days=day + 1)
            prediction_dates.append(prediction_date.strftime('%Y-%m-%d'))

            # Slide the window by appending the predicted value and removing the first element
            input_sequence = np.append(input_sequence[1:], [[next_pred_scaled]], axis=0)

        # Return the predictions for the specified horizon
        response = {
            'ticker': symbol,
            'type': type_of_data,
            'time_horizon': time_horizon,
            'dates': prediction_dates,
            'predictions': future_predictions
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
