// FormComponent.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const emailValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const panValidator = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharValidator = /^\d{12}$/;
const phoneNumberValidator = /^\d{10}$/;

const countries = [
  { code: "IN", name: "India", cities: [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
]
 },
  { code: "US", name: "United States", cities: ["New York", "Los Angeles", "Chicago"] },
  { code: "UK", name: "United Kingdom", cities: ["London", "Manchester", "Liverpool"] }
];

export default function FormComponent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCountryCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Validation function for each field
  const validate = (fieldValues = form) => {
    let tempErrors = { ...errors };

    if ("firstName" in fieldValues)
      tempErrors.firstName = fieldValues.firstName.trim() ? "" : "First Name is required";

    if ("lastName" in fieldValues)
      tempErrors.lastName = fieldValues.lastName.trim() ? "" : "Last Name is required";

    if ("username" in fieldValues)
      tempErrors.username = fieldValues.username.trim() ? "" : "Username is required";

    if ("email" in fieldValues) {
      if (!fieldValues.email.trim()) tempErrors.email = "Email is required";
      else if (!emailValidator.test(fieldValues.email)) tempErrors.email = "Email is not valid";
      else tempErrors.email = "";
    }

    if ("password" in fieldValues) {
      if (!fieldValues.password) tempErrors.password = "Password is required";
      else if (!passwordValidator.test(fieldValues.password))
        tempErrors.password =
          "Password must be at least 8 chars, contain 1 number, 1 uppercase and 1 lowercase letter";
      else tempErrors.password = "";
    }

    if ("phoneNumber" in fieldValues) {
      if (!fieldValues.phoneNumber) tempErrors.phoneNumber = "Phone number is required";
      else if (!phoneNumberValidator.test(fieldValues.phoneNumber))
        tempErrors.phoneNumber = "Phone number must be 10 digits";
      else tempErrors.phoneNumber = "";
    }

    if ("country" in fieldValues)
      tempErrors.country = fieldValues.country ? "" : "Country is required";

    if ("city" in fieldValues)
      tempErrors.city = fieldValues.city ? "" : "City is required";

    if ("panNo" in fieldValues) {
      if (!fieldValues.panNo.trim()) tempErrors.panNo = "PAN No. is required";
      else if (!panValidator.test(fieldValues.panNo.toUpperCase()))
        tempErrors.panNo = "PAN No. format is invalid";
      else tempErrors.panNo = "";
    }

    if ("aadharNo" in fieldValues) {
      if (!fieldValues.aadharNo.trim()) tempErrors.aadharNo = "Aadhar No. is required";
      else if (!aadharValidator.test(fieldValues.aadharNo))
        tempErrors.aadharNo = "Aadhar No. must be exactly 12 digits";
      else tempErrors.aadharNo = "";
    }

    setErrors(tempErrors);

    // Return true if no errors
    return Object.values(tempErrors).every(x => x === "");
  };

  // Handle input change
  const handleChange = e => {
    const { name, value } = e.target;

    // Reset city if country changes
    if (name === "country") {
      setForm(prev => ({ ...prev, [name]: value, city: "" }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }

    validate({ [name]: value });
  };

  // Handle blur to mark touched
  const handleBlur = e => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validate({ [name]: form[name] });
  };

  // Toggle show/hide password
  const toggleShowPassword = () => {
    setForm(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  // Submit handler
  const handleSubmit = e => {
    e.preventDefault();

    setTouched({
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
      phoneNumber: true,
      country: true,
      city: true,
      panNo: true,
      aadharNo: true
    });

    if (validate()) {
      setIsSubmitting(true);
      // Redirect with state containing form data
      navigate("/details", { state: { ...form } });
    }
  };

  // Disable submit if errors or any required field empty
  const isSubmitDisabled =
    !form.firstName ||
    !form.lastName ||
    !form.username ||
    !form.email ||
    !form.password ||
    !form.phoneNumber ||
    !form.country ||
    !form.city ||
    !form.panNo ||
    !form.aadharNo ||
    Object.values(errors).some(x => x !== "");

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
        <div className="container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* First Name */}
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={form.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.firstName && errors.firstName && (
            <div style={{ color: "red" }}>{errors.firstName}</div>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={form.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.lastName && errors.lastName && (
            <div style={{ color: "red" }}>{errors.lastName}</div>
          )}
        </div>

        {/* Username */}
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username *"
            value={form.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.username && errors.username && (
            <div style={{ color: "red" }}>{errors.username}</div>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <div style={{ color: "red" }}>{errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type={form.showPassword ? "text" : "password"}
            name="password"
            placeholder="Password *"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            style={{ marginLeft: 5 }}
          >
            {form.showPassword ? "Hide" : "Show"}
          </button>
          {touched.password && errors.password && (
            <div style={{ color: "red" }}>{errors.password}</div>
          )}
        </div>

        {/* Phone Number with country code */}
        <div>
          <select
            name="phoneCountryCode"
            value={form.phoneCountryCode}
            onChange={handleChange}
            style={{ width: "20%", marginRight: 5 }}
          >
            <option value="+91">+91 (India)</option>
            <option value="+1">+1 (USA)</option>
            <option value="+44">+44 (UK)</option>
          </select>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number *"
            value={form.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={10}
          />
          {touched.phoneNumber && errors.phoneNumber && (
            <div style={{ color: "red" }}>{errors.phoneNumber}</div>
          )}
        </div>

        {/* Country */}
        <div>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Country *</option>
            {countries.map(c => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          {touched.country && errors.country && (
            <div style={{ color: "red" }}>{errors.country}</div>
          )}
        </div>

        {/* City */}
        <div>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!form.country}
          >
            <option value="">Select City *</option>
            {form.country &&
              countries
                .find(c => c.code === form.country)
                ?.cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
          </select>
          {touched.city && errors.city && (
            <div style={{ color: "red" }}>{errors.city}</div>
          )}
        </div>

        {/* PAN No */}
        <div>
          <input
            type="text"
            name="panNo"
            placeholder="PAN No. *"
            value={form.panNo}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={10}
            style={{ textTransform: "uppercase" }}
          />
          {touched.panNo && errors.panNo && (
            <div style={{ color: "red" }}>{errors.panNo}</div>
          )}
        </div>

        {/* Aadhar No */}
        <div>
          <input
            type="text"
            name="aadharNo"
            placeholder="Aadhar No. *"
            value={form.aadharNo}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={12}
          />
          {touched.aadharNo && errors.aadharNo && (
            <div style={{ color: "red" }}>{errors.aadharNo}</div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" disabled={isSubmitDisabled}>
            Submit
          </button>
        </div>
      </form>
      </div>
    </div>
  );

}
