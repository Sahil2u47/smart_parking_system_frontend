import "./About.css";


function About() {
  return (
    <main className="about-page">

      <section className="about-hero">

        <div className="about-badge">
          SMART PARKING SYSTEM
        </div>

        <h1>
          Parking smarter.
          <span> Living easier.</span>
        </h1>

        <p>
          Smart Parking is designed to make vehicle parking
          simple, organized and convenient for everyone.
        </p>

      </section>


      <section className="about-content">

        <div className="about-card">
          <span>01</span>

          <h2>Our Purpose</h2>

          <p>
            We provide a simple digital platform where users
            can manage their vehicles, find parking slots and
            book parking without unnecessary hassle.
          </p>
        </div>


        <div className="about-card">
          <span>02</span>

          <h2>Smart Management</h2>

          <p>
            Parking information can be managed through a
            centralized system, making slot allocation and
            booking easier to handle.
          </p>
        </div>


        <div className="about-card">
          <span>03</span>

          <h2>Built for Convenience</h2>

          <p>
            From vehicle registration to parking and booking
            management, everything is designed around a
            clean and straightforward user experience.
          </p>
        </div>

      </section>

    </main>
  );
}

export default About;