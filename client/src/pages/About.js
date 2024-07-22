import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title="About us_UC Camp">
      <div className="row contactus">
        <div className="col-md-6">
          <img
            className="contactusImg"
            src="/images/aboutus.jpg"
            alt="aboutus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center rounded-ms">
            ABOUT US
          </h1>
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qu odit,
            quibusdam. Quisquam, quia, quod, quos quae, quas, quidem, quia,
            quibusdam, quod quibusdam. Quisquam, quia, quod, quos quae, quas,
            quidem, quia, quibusdam, quod Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Qu odit, quibusdam. Quisquam, quia,
            quod, quos quae, quas, quidem, quia, quibusdam, quod quibusdam.
            Quisquam, quia, quod, quos quae, quas, quidem, quia, quibusdam, quod
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qu odit,
            quibusdam. Quisquam, quia, quod, quos quae, quas, quidem, quia,
            quibusdam, quod quibusdam. Quisquam, quia, quod, quos quae, quas,
            quidem, quia, quibusdam, quod
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
