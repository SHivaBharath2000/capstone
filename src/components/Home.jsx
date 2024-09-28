import React from "react";
import bulldozer from "./assets/bull dozer.jpg";
import concretMixer from "./assets/concret.jpg";
import forklifts from "./assets/Forklifts.jpg";
import excavator from "./assets/Excavator.webp";
import background from "./assets/background.png";
import testimonial1 from "./assets/testimonials-1.jpg";
import testimonial2 from "./assets/testimonials-2.jpg";
import testimonial3 from "./assets/testimonials-3.jpg";
import nomoney from "./assets/no-money.png";
import decision from "./assets/decision.png";
import aggrement from "./assets/agreement.png";
import rentalEquip from "./assets/equipment-rental-service.jpg"
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="home-container">
      <section
        className="hero"
        style={{ backgroundImage: `url(${rentalEquip})`}}
      >
        <div className="hero-child">
          <h1 className="hero-heading" style={{ color: "white" }}>Welcome to Market Rental Place</h1>
          <p style={{fontSize:"26px"}}>Your one-stop shop for renting equipment</p>
          <Link to="/Equipment"><button className="get-started">Get Started</button></Link>
        </div>
      </section>
      <section className="how-it-works">
        <div className="row">
          <div className="col-lg-4">
          <img  className="log0-icon"src={decision}></img>
            <h3>Wide Equipment Selection</h3>
            <p className="lead mb-0">From power tools to heavy machinery, we have the right equipment for every job</p>
          </div>
          <div className="col-lg-4">
            <img  className="log0-icon"src={aggrement}></img>
            <h3>Flexible Rental Terms</h3>
            <p className="lead mb-0">Daily, weekly, or monthly rentals to fit your project timeline and budget. We offer flexible terms to suit your needs.</p>
          </div>
          <div className="col-lg-4">
            <img  className="log0-icon"src={nomoney}></img>
            <h3>No Hidden Fees</h3>
            <p className="lead mb-0">Our prices are transparent and no hidden fees for your peace of mind.</p>
          </div>
        </div>
      </section>

      <section className="featured-equipment">
        <div className="row g-0">
          <div className="col-lg-6">
            <img className="Equipment-image" src={bulldozer} alt="Bulldozer" />
          </div>
          <div className="col-lg-6" style={{ textAlign: "center" }}>
            <div className="Equipment-fonts">
              <h1 className="Equipment-name">Bull Dozer</h1>
              <p className="Equipment-description">
                A bulldozer, often referred to as a dozer, is a powerful piece
                of heavy equipment commonly used in construction, earth-moving,
                and other large-scale projects Bulldozers are used in
                construction, mining, and land clearing for tasks such as
                pushing large quantities of soil, sand, rubble, or other
                materials, grading land, and creating roads.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-0">
          <div className="col-lg-6" style={{ textAlign: "center" }}>
            <div className="Equipment-fonts">
              <h1 className="Equipment-name">concrete mixer</h1>
              <p className="Equipment-description">
                A concrete mixer, also known as a cement mixer, is a machine
                that combines cement, aggregate (such as sand or gravel), and
                water to form concrete The most common type of concrete mixer
                uses a revolving drum to mix the components. The drum is
                equipped with blades or paddles that ensure the materials are
                thoroughly mixed.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              style={{ width: "102%" }}
              src={concretMixer}
              alt="Concrete Mixer"
            />
          </div>
        </div>

        <div className="row g-0">
          <div className="col-lg-6">
            <img style={{ width: "100%" }} src={forklifts} alt="Forklifts" />
          </div>
          <div className="col-lg-6" style={{ textAlign: "center" }}>
            <div className="Equipment-fonts">
              <h1 className="Equipment-name">Fork Lifts</h1>
              <p className="Equipment-description">
                A forklift is a powered industrial truck used to lift and move
                materials over short distances.Forklifts are used in warehouses,
                distribution centers, and manufacturing facilities for tasks
                such as loading and unloading trucks, stacking pallets, and
                transporting materials.{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="row g-0">
          <div className="col-lg-6" style={{ textAlign: "center" }}>
            <div className="Equipment-fonts">
              <h1 className="Equipment-name">Excavator</h1>
              <p className="Equipment-description">
                An excavator is a heavy construction machine used for digging
                and moving large objects. Excavators are used in various
                applications such as digging trenches, holes, and foundations,
                material handling, demolition, dredging, and mining
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <img style={{ width: "100%" }} src={excavator} alt="Excavator" />
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="row">
          <div className="col-lg-4">
            <div className="testimonial">
              <img className="customer-image" src={testimonial1} alt="" />
              <div className="customer-fonts">
                <h3 style={{ fontWeight: "bold" }}>Margaret E</h3>
                <p>"Great service and quality equipment!"</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="testimonial">
              <img className="customer-image" src={testimonial2} alt="" />
              <div className="customer-fonts">
                <h3 style={{ fontWeight: "bold" }}>Fred S.</h3>
                <p>"Easy to rent and return."</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="testimonial">
              <img className="customer-image" src={testimonial3} alt="" />
              <div className="customer-fonts">
                <h3 style={{ fontWeight: "bold" }}>Sarah W.</h3>
                <p>
                  "Thanks so much for making these free resources available to
                  us"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Contact us: info@marketplace.com</p>
      </footer>
    </div>
  );
}

export default Home;
