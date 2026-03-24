from flask import Flask, request, jsonify
import pandas as pd
from prophet import Prophet
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_absolute_percentage_error
import os

app = Flask(__name__)

@app.route('/forecast', methods=['POST'])
def forecast():
    data = request.json['data']

    df = pd.DataFrame(data)
    df.columns = ['ds', 'y']
    df['ds'] = pd.to_datetime(df['ds'])

    # Prophet model
    model = Prophet()
    model.fit(df)

    future = model.make_future_dataframe(periods=30)
    forecast = model.predict(future)

    result = forecast[['ds', 'yhat']].tail(30).to_dict(orient="records")

    return jsonify(result)


@app.route('/compare', methods=['POST'])
def compare():
    data = request.json['data']

    df = pd.DataFrame(data)
    df.columns = ['ds', 'y']
    df['ds'] = pd.to_datetime(df['ds'])

    # Prophet
    prophet_model = Prophet()
    prophet_model.fit(df)
    future = prophet_model.make_future_dataframe(periods=30)
    prophet_forecast = prophet_model.predict(future)

    # ARIMA
    arima_model = ARIMA(df['y'], order=(5,1,0))
    arima_model = arima_model.fit()
    arima_forecast = arima_model.forecast(30)

    # MAPE (simple dummy split)
    actual = df['y'][-30:]
    predicted = prophet_forecast['yhat'][-30:]
    mape = mean_absolute_percentage_error(actual, predicted)

    return jsonify({
        "prophet": prophet_forecast[['ds','yhat']].tail(30).to_dict("records"),
        "arima": list(arima_forecast),
        "mape": mape
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)