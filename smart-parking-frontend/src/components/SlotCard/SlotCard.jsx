import "./SlotCard.css";

function SlotCard({ slotNumber, vehicleType, status }) {
  const isAvailable = status === "available";

  return (
    <div className={`slot-card ${status}`}>

      <div className="slot-card-top">
        <span>{vehicleType}</span>
        <strong>{slotNumber}</strong>
      </div>

      <div className="slot-card-icon">
        {vehicleType === "CAR" && "🚗"}
        {vehicleType === "BIKE" && "🏍️"}
        {vehicleType === "AUTO" && "🛺"}
      </div>

      <div className="slot-card-status">
        <span className="slot-status-dot"></span>
        {isAvailable ? "Available" : "Occupied"}
      </div>

    </div>
  );
}

export default SlotCard;