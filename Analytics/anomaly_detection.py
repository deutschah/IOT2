
from threshold_config import THRESHOLDS

def detect_anomaly(data):

    anomalies = []

    for field in ["AC_POWER", "DC_POWER", "DAILY_YIELD", "TOTAL_YIELD"]:
        value = data.get(field, 0)
        if value < 0:
            anomalies.append({
                "field": field,
                "type": "measurement_error",
                "value": value
            })
        elif value > THRESHOLDS[field]:
            anomalies.append({
                "field": field,
                "type": "situational_anomaly",
                "value": value
            })
    
    return anomalies if anomalies else False