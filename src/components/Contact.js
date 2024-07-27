import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const emailConfig = {
  service_id: "service_c6kacwf",
  template_id: "template_6sizxn6",
  public_key: "uOaJuvlu7UWJzNq14",
};

function Contact() {
  const emailRef = useRef();

  const sendMail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        emailConfig.service_id,
        emailConfig.template_id,
        emailRef.current,
        {
          publicKey: emailConfig.public_key,
        }
      )
      .then(
        () => {
          Toast.fire({
            title: "Message Sended!",
            icon: "success",
          });
        },
        (error) => {
          Toast.fire({
            title: `Failed ${error.text}}`,
            icon: "error",
          });
        }
      );
  };
  return (
    <div className="lg:w-[900px] mx-auto p-5">
      <div className="card bg-[#A20B0B] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 rounded-md  px-10 py-7">
        <h3 className=" font-poppins text-[36px] font-bold mb-4">Contact Me</h3>
        <form ref={emailRef} onSubmit={sendMail}>
          <div className=" lg:grid grid-cols-2 md:gap-3">
            <div>
              <label
                class="block uppercase tracking-wide text-white text-sm font-bold mb-2"
                for="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Input your name"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="from_name"
                required
              />
            </div>
            <div>
              <label
                class="block uppercase tracking-wide text-white text-sm font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Input your email"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
                name="from_email"
                required
              />
            </div>
          </div>
          <label
            class="block uppercase tracking-wide text-white text-sm font-bold mb-2"
            for="subject"
          >
            subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Input email subject"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
            name="subject"
            required
          />
          <label
            class="block uppercase tracking-wide text-white text-sm font-bold mb-2"
            for="message"
          >
            message
          </label>
          <textarea
            type="text"
            id="subject"
            placeholder="Input your message"
            rows={4}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
            name="subject"
            required
          />
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="bg-[#822020] py-2 px-5 hover:bg-white hover:text-[#822020] rounded-lg transition-all ease-in-out duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
