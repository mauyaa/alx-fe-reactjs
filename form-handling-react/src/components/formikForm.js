import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const schema = Yup.object({
  username: Yup.string().min(2, "Too short").required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 chars").required("Password is required"),
});

export default function FormikRegistrationForm() {
  const [status, setStatus] = useState(null);

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto" }}>
      <h2>Register (Formik + Yup)</h2>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={schema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            const res = await fetch("https://reqres.in/api/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: values.email, password: values.password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Registration failed");
            setStatus({ ok: true, msg: `Registered! token=${data.token}` });
            resetForm();
          } catch (err) {
            setStatus({ ok: false, msg: err.message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Username</label>
            <Field name="username" />
            <ErrorMessage name="username" component="div" style={{ color: "crimson" }} />

            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" style={{ color: "crimson" }} />

            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" style={{ color: "crimson" }} />

            <button type="submit" disabled={isSubmitting} style={{ marginTop: 12 }}>
              {isSubmitting ? "Submitting..." : "Create Account"}
            </button>
          </Form>
        )}
      </Formik>

      {status && <p style={{ color: status.ok ? "green" : "crimson" }}>{status.msg}</p>}
    </div>
  );
}
