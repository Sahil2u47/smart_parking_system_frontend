import "./ParkingCard.css";

function ParkingCard({
  type,
  title,
  description,
  price,
  availableSlots,
  icon,
}) {
  return (
    <div className="parking-card">

      <div className="parking-card-top">
        <div className="parking-card-icon">
          {icon}
        </div>

        <span className="parking-card-type">
          {type}
        </span>
      </div>

      <div className="parking-card-content">
        <h3>{title}</h3>

        <p>
          {description}
        </p>
      </div>

      <div className="parking-card-bottom">

        <div className="parking-card-price">
          <strong>{price}</strong>
          <span>/ hour</span>
        </div>

        <div className="parking-card-slots">
          <strong>{availableSlots}</strong>
          <span>Available</span>
        </div>

      </div>

    </div>
  );
}

export default ParkingCard;