
from threshold_config import THRESHOLDS

def detect_anomaly(data):
    for field in ["AC_POWER", "DC_POWER", "DAILY_YIELD", "TOTAL_YIELD"]:
        value = data.get(field, 0)
        if value < 0:
            return f"{field} measurement_error: {value}"
        elif value > THRESHOLDS[field]:
            return f"{field} situational_anomaly: {value}"
    
    return False
