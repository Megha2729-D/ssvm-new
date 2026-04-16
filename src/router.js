import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollToTop from "./Component/ScrollToTop";
import Homepage from "./Pages/Homepage";
import StudentpreneurAward from "./Pages/StudentpreneurAward";
import Preloader from "./Component/Preloader";

import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Common layout
import Navbar from "./Pages/Navbar";
import Footer from "./Pages/Footer";

gsap.registerPlugin(ScrollTrigger);

// 🔥 Layout wrapper
const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

const Router = () => {
    const [loading, setLoading] = useState(true);

    // AOS init
    useEffect(() => {
        AOS.init({ duration: 1000, once: false, easing: "ease-in-out" });
    }, []);

    // Prevent scroll restore
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    // Reset scroll
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Preloader
    useEffect(() => {
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "auto";

            document.body.getBoundingClientRect();

            window.addEventListener("load", () => {
                setTimeout(() => {
                    ScrollTrigger.refresh(true);
                }, 1000); // ⚠️ reduced from 10s (no need huge delay)
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // GSAP config
    useEffect(() => {
        gsap.config({
            autoSleep: 60,
            force3D: true,
        });

        ScrollTrigger.config({
            ignoreMobileResize: true,
        });

        ScrollTrigger.defaults({
            anticipatePin: 1,
        });
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* ✅ Homepage */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Homepage />
                        </Layout>
                    }
                />

                {/* ✅ New Route */}
                <Route
                    path="/studentpreneur-award"
                    element={
                        <Layout>
                            <StudentpreneurAward />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;