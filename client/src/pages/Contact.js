import React from "react";
import Layout from "../components/Layout/Layout";
import { BiSolidPhoneCall } from "react-icons/bi";
import { RiCustomerServiceFill } from "react-icons/ri";
import { IoIosMail } from "react-icons/io";

const Contact = () => {
  return (
    <Layout title="Contact us_UC Camp">
      <div className="row contactus">
        <div className="col-md-6">
          <img
            className="contactusImg"
            src="/images/callCentre.jpg"
            alt="contactus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center rounded-ms">
            CONTACT US
          </h1>
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qu odit,
            quibusdam. Quisquam, quia, quod, quos quae, quas, quidem, quia,
            quibusdam, quod quibusdam. Quisquam, quia, quod, quos quae, quas,
            quidem, quia, quibusdam, quod
          </p>
          <div>
            <p className="mt-3">
              <IoIosMail className="contactusIcon" /> : SITE
              www.help@uccamp.components
            </p>
            <p className="mt-3">
              <BiSolidPhoneCall className="contactusIcon" /> : CALL 022 - 9211
              420
            </p>
            <p className="mt-3">
              <RiCustomerServiceFill className="contactusIcon" /> : SUPPORT 1800
              0220 1111 (toll free)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
