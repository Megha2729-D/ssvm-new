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
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "auto";

            // ✅ WAIT until everything (images, Lottie, DOM) is fully loaded
            window.addEventListener("load", () => {
                setTimeout(() => {
                    ScrollTrigger.refresh(true);
                }, 50);
            });

        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        gsap.config({
            autoSleep: 60,
            force3D: true,
        });

        ScrollTrigger.config({
            ignoreMobileResize: true,
        });

        // ✅ GLOBAL FIX for multiple pinned sections
        ScrollTrigger.defaults({
            anticipatePin: 1,
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