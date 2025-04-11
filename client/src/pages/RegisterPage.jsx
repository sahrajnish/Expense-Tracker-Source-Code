// RegisterPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, message } from "antd";

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const res = await axios.post("/api/v1/users/register", values);
            console.log(res);
            message.success(res?.data?.message || "Registration successful");
            navigate("/login");
        } catch (err) {
            console.log(err?.response?.data)
            const msg = err?.response?.data?.message || "Something went wrong";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    // restricting logged in user
    useEffect(() => {
        if(localStorage.getItem('user')) {
            navigate('/')
        }
    }, [navigate])

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
                <Form
                    layout="vertical"
                    className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
                    onFinish={submitHandler}
                >
                    <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, message: "Name is required" },
                            { min: 3, message: "Name must be at least 3 characters long" },
                        ]}
                    >
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Email is required" },
                            { type: "email", message: "Enter a valid email address" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Password is required" },
                            { min: 6, message: "Password must be at least 6 characters long" },
                        ]}
                    >
                        <Input type="password" />
                    </Form.Item>

                    <div className="mt-4 w-full">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white text-base font-medium py-3 rounded-md transition ${loading
                                    ? "cursor-not-allowed opacity-70"
                                    : "hover:bg-blue-700"
                                }`}
                        >
                            {loading && (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            Register
                        </button>
                    </div>

                    <div className="mt-4 text-center text-sm text-gray-700">
                        Already Registered?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </div>
                </Form>
            </div>
        </>

    );
};

export default RegisterPage;