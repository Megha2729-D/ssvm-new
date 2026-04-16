import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Homepage from "./Pages/Homepage";
import Preloader from "./Component/Preloader";

gsap.registerPlugin(ScrollTrigger);

const Router = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 🔒 Lock scroll during preloader
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setLoading(false);

            // 🔓 Unlock scroll
            document.body.style.overflow = "auto";

            // ✅ Wait for DOM + layout to stabilize before GSAP calculates
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    ScrollTrigger.refresh(true);
                });
            });

        }, 2000); // your preloader duration

        return () => clearTimeout(timer);
    }, []);

    // 🔥 Optional but recommended (global GSAP stability)
    useEffect(() => {
        gsap.config({
            autoSleep: 60,
            force3D: true,
        });

        ScrollTrigger.config({
            ignoreMobileResize: true,
        });
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;