// DetailsPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    // If accessed directly without form submission, redirect back
    navigate("/");
    return null;
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Submitted Details</h2>
      <div><strong>First Name:</strong> {state.firstName}</div>
      <div><strong>Last Name:</strong> {state.lastName}</div>
      <div><strong>Username:</strong> {state.username}</div>
      <div><strong>Email:</strong> {state.email}</div>
      <div><strong>Phone No.:</strong> {state.phoneCountryCode} {state.phoneNumber}</div>
      <div><strong>Country:</strong> {state.country}</div>
      <div><strong>City:</strong> {state.city}</div>
      <div><strong>PAN No.:</strong> {state.panNo.toUpperCase()}</div>
      <div><strong>Aadhar No.:</strong> {state.aadharNo}</div>
      <br />
      <button onClick={() => navigate("/")}>Back to Form</button>
    </div>
  );
}
