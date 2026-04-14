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
        // 🚫 Stop early GSAP calculations
        ScrollTrigger.config({
            autoRefreshEvents: "none",
        });

        document.body.style.overflow = "hidden"; // lock scroll

        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // ✅ AFTER preloader is removed → enable GSAP
    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                ScrollTrigger.config({
                    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
                });

                ScrollTrigger.refresh(); // 🔥 FIXES YOUR ISSUE
                document.body.style.overflow = "auto"; // unlock scroll
            }, 100); // small buffer
        }
    }, [loading]);

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