import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { baseurl } from "../Api/BaseApi";

function DeleteAccount() {
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds countdown
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (deleting) {
      const deleteUser = async () => {
        try {
            const response = await axios.delete(`${baseurl}/delete/user`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              });
          if (response.status === 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/'
          }
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };

      deleteUser();
    } else {
      const timerId = setTimeout(() => {
        setDeleting(true);
      }, timeLeft * 1000);

      return () => clearTimeout(timerId);
    }
  }, [deleting, timeLeft]);

  return (
    <Container>
      <div
        className="mt-5 p-4 rounded bg-white text-center border-top border-4 border-danger mx-auto text-secondary pt-0"
        style={{ maxWidth: "24rem", marginTop: "4rem" }}
      >
        <span
          className="bg-danger text-white p-4 rounded-circle d-inline-flex align-items-center justify-content-center"
          style={{ marginTop: "-2rem", marginBottom: "0.5rem" }}
        >
          <svg
            className="bi bi-trash"
            width="24"
            height="24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-8zm2 0A.5.5 0 0 1 8 6h.5v8H8V6zM5 4.5V3.3c0-.61.37-1.1.87-1.32A1.27 1.27 0 0 1 7.5 2H8.5a1.27 1.27 0 0 1 1.63.98c.5.22.87.71.87 1.32V4.5h-7zM3.5 4.5H12v-1.2a2.5 2.5 0 0 0-5-1H8.5a2.5 2.5 0 0 0-5 1V4.5zM4.5 3h7v-1a1.5 1.5 0 0 0-3 0v1H7.5v-1a1.5 1.5 0 0 0-3 0v1z" />
          </svg>
        </span>
        <h3 className="fw-bold fs-4 text-dark mb-2">
          Deleting Account within {timeLeft} seconds
        </h3>
        <p>You will permanently lose all your data in Zyacom.</p>
        <ul className="list-unstyled text-start ps-2">
          <li>Ensure you have backed up all necessary information.</li>
          <li>Contact support if you face any issues.</li>
          <li>We hope to see you again!</li>
        </ul>
      </div>
    </Container>
  );
}

export default DeleteAccount;
