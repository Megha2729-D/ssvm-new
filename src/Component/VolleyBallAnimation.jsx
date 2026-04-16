import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LetterReveal from "./LetterReveal";

import "../assets/css/volleyball.css";
import runnerAnimation from "../assets/json/699cbf57a3baf554905772e8_volleyball_desktop.json";

const BASE_IMAGE_URL = "https://ssvm-new.onrender.com/assets/images/";

gsap.registerPlugin(ScrollTrigger);

const VolleyBallAnimation = () => {
    const lottieContainer = useRef(null);
    const sectionRef = useRef(null);
    const bottomTextRef = useRef(null);
    const middleTextRef = useRef(null);
    const centerTextRef = useRef(null);

    const triggerRef = useRef(null); // ✅ store trigger

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            gsap.set(bottomTextRef.current, { opacity: 1, y: 0 });
            gsap.set(middleTextRef.current, { opacity: 1, y: 0 });
            gsap.set(centerTextRef.current, { opacity: 1, y: 0 });
            return;
        }

        let animation;
        let bottomTween, middleTween, centerTween;

        let bottomHidden = false;
        let middleShown = false;
        let centerShown = false;

        animation = lottie.loadAnimation({
            container: lottieContainer.current,
            renderer: "svg",
            loop: false,
            autoplay: false,
            animationData: runnerAnimation,
        });

        animation.addEventListener("DOMLoaded", () => {
            const totalFrames = animation.totalFrames;

            // 🔥 IMPORTANT: delayed refresh
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 150);

            // Initial states
            gsap.set(bottomTextRef.current, { opacity: 1, y: 0 });
            gsap.set(middleTextRef.current, { opacity: 0, y: 60 });
            gsap.set(centerTextRef.current, { opacity: 0, y: 60, scale: 0.1 });

            triggerRef.current = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: () => "+=" + window.innerHeight * 1.5,
                scrub: true,
                pin: true,
                pinSpacing: true,
                anticipatePin: 2,
                invalidateOnRefresh: true,

                onUpdate: (self) => {
                    const progress = self.progress;

                    // 🎯 Lottie control
                    const slowFactor = 0.8;
                    const frame = Math.round(
                        Math.min(progress * slowFactor, 1) * (totalFrames - 1)
                    );
                    animation.goToAndStop(frame, true);

                    /* -------- Bottom text -------- */
                    if (progress > 0.53 && !bottomHidden) {
                        bottomHidden = true;
                        bottomTween?.kill();
                        bottomTween = gsap.to(bottomTextRef.current, {
                            opacity: 0,
                            duration: 0.5,
                        });
                    }

                    if (progress <= 0.53 && bottomHidden) {
                        bottomHidden = false;
                        bottomTween?.kill();
                        bottomTween = gsap.to(bottomTextRef.current, {
                            opacity: 1,
                            duration: 0.5,
                        });
                    }

                    /* -------- Middle text -------- */
                    if (progress > 0.75 && progress < 0.95 && !middleShown) {
                        middleShown = true;
                        middleTween?.kill();
                        middleTween = gsap.to(middleTextRef.current, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                        });
                    }

                    if ((progress <= 0.75 || progress >= 0.95) && middleShown) {
                        middleShown = false;
                        middleTween?.kill();
                        middleTween = gsap.to(middleTextRef.current, {
                            opacity: 0,
                            y: 60,
                            duration: 0.5,
                        });
                    }

                    /* -------- Center text -------- */
                    if (progress > 0.95 && !centerShown) {
                        centerShown = true;
                        centerTween?.kill();
                        centerTween = gsap.to(centerTextRef.current, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            ease: "back.out(1.7)",
                        });
                    }

                    if (progress <= 0.95 && centerShown) {
                        centerShown = false;
                        centerTween?.kill();
                        centerTween = gsap.to(centerTextRef.current, {
                            opacity: 0,
                            y: 60,
                            scale: 0.1,
                            duration: 0.5,
                        });
                    }

                    /* -------- Background -------- */
                    gsap.to(sectionRef.current, {
                        backgroundColor: progress >= 0.9 ? "#F2FF33" : "",
                        duration: 0.3,
                    });
                },

                onLeave: () => {
                    animation.goToAndStop(totalFrames - 1, true);
                },
            });
        });

        return () => {
            if (animation) animation.destroy();
            if (triggerRef.current) triggerRef.current.kill(); // ✅ FIXED
        };
    }, []);

    return (
        <section ref={sectionRef} className="basket-section h-100">
            {window.innerWidth >= 768 && (
                <div className="basket-wrapper">
                    <div ref={lottieContainer} className="basket-lottie"></div>
                </div>
            )}

            <div className="volleyball_anim_content">
                {/* Bottom Text */}
                <div ref={bottomTextRef} className="bottom-text d-none d-md-block">
                    <LetterReveal
                        text="Shape Tomorrow Through Action"
                        className="heading_about text-c1"
                    />
                </div>

                {/* Middle Text */}
                <div ref={middleTextRef} className="middle-text d-none d-md-flex">
                    <LetterReveal text="Ssvm Transforming" className="heading_about" />
                    <LetterReveal text="India Conclave" className="heading_about" />
                    <LetterReveal text="2026" className="heading_about" />
                </div>

                {/* Center */}
                <div ref={centerTextRef} className="center-text">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <img
                                src={`${BASE_IMAGE_URL}ssvm-founder-anim.gif`}
                                className="w-100"
                                alt=""
                            />
                        </div>
                        <div className="col-lg-12 text-center">
                            <h2>Dr. Manimekalai Mohan</h2>
                            <h2>Founder, SSVM Institutions</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VolleyBallAnimation;