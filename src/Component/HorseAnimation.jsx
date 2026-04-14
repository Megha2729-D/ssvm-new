import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollRevealText from "./ScrollRevealText";

import horseAnimation from "../assets/json/69b860a75dc06d6daafcd1ba_horse.json";
import "../assets/css/horse.css";

const BASE_IMAGE_URL = "https://ssvm-main.onrender.com/assets/images/"

gsap.registerPlugin(ScrollTrigger);

const HorseAnimation = () => {

    const lottieRef = useRef(null);
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    useEffect(() => {
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        let animation;

        animation = lottie.loadAnimation({
            container: lottieRef.current,
            renderer: "svg",
            loop: false,
            autoplay: false,
            animationData: horseAnimation,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid meet",
            },
        });

        const handleAnimation = () => {
            const totalFrames = animation.totalFrames;
            const playhead = { frame: 0 };

            const screenWidthMobile = window.innerWidth;
            const startXContent = screenWidthMobile >= 400 ? -50 : 0;
            // ✅ FIX: prevent transform conflict
            gsap.set(contentRef.current, {
                xPercent: 0,
                yPercent: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => "+=" + window.innerHeight * 1.6,
                    scrub: true,
                    pin: true,
                },
            });

            // Lottie scroll sync
            tl.to(
                playhead,
                {
                    frame: totalFrames - 1,
                    ease: "none",
                    onUpdate: () => {
                        animation.goToAndStop(Math.round(playhead.frame), true);
                    },
                },
                0
            );

            // Content animation
            const screenWidth = window.innerWidth;
            const startX = screenWidth >= 2000 ? -5000 : -2000;

            tl.fromTo(
                contentRef.current,
                { x: startX },
                {
                    x: 0,
                    ease: "power3.out",
                },
                0.2
            );
        };

        animation.addEventListener("DOMLoaded", () => {
            handleAnimation();
            ScrollTrigger.refresh();
        });

        return () => {
            if (animation) animation.destroy();
            ScrollTrigger.getAll().forEach((t) => t.kill());
            ScrollTrigger.refresh();
        };
    }, []);

    return (
        <section ref={sectionRef} className="horse-section" id="about">

            <div className="horse-wrapper">

                <div ref={lottieRef} className="horse-lottie"></div>

                <div ref={contentRef} className="horse-content-box mission-box">

                    <div className="h-100">
                        <div className="missin_inner_part h-100">
                            <div className="mission_inner_content" data-aos="zoom-in">
                                <div className="section_container px-0 text-white">
                                    <div className="row py-5 justify-content-start align-items-stretch">
                                        <div className="col-xl-9">
                                            <div className="about__content text-black">
                                                <div className="section-header text-start">
                                                    <div>
                                                        <span className="section-sub-title text-uppercase small text-black fw-bold">
                                                            <img src={`${BASE_IMAGE_URL}favicon.png`} alt="" />
                                                            SSVM Transforming India Conclave 2026
                                                        </span>
                                                        <ScrollRevealText text="Flex Your Future – Creating Our World Today" className="reveal_heading" />
                                                        <p className="fw-bold">The SSVM Transforming India Conclave is not just an event—it’s a movement.</p>
                                                        <p>
                                                            Over the past four years, the conclave has grown into a powerful platform where ideas meet action. Each year, under a new theme, it has brought together students, educators, entrepreneurs, and change-makers to engage in conversations that truly matter.
                                                        </p>
                                                    </div>
                                                    <div className="horse_second_sec">
                                                        <ScrollRevealText text="Theme 2026 - Flex Your Future" className="reveal_heading" />
                                                        <p>
                                                            Most students focus on performance. Very few understand what sustains it.
                                                            Flex Your Future shifts the focus to the foundation behind every form of success—health. It looks at the mind and body as one system, where mental resilience, emotional balance, nutrition, and physical strength work together.
                                                            Because real performance—whether in academics, sports, or life—is not built in isolation, but through alignment.
                                                            A strong future cannot be built on a weak foundation.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="col-xl-5 d-flex align-items-center">
                                        <div className="about__thumbs" data-aos="zoom-in">
                                            <img src="https://ssvm-2o-d4pw.vercel.app/_next/image?url=https%3A%2F%2Fssvmtransformationindia.s3.ap-south-1.amazonaws.com%2Fimages%2Fabout.jpg&w=640&q=75" className="w-100 rounded-3" alt="" />
                                            <div className="thumb-column thumb-column-1">
                                    <div className="thumb-1 h-100 thumb bounce-y-down">
                                        <img
                                            src={`${BASE_IMAGE_URL}about1.jpeg`}
                                            alt=""
                                            className="w-100"
                                        />
                                    </div>
                                </div>

                                <div className="thumb-column thumb-column-2">
                                    <div className="thumb-2 thumb bounce-x">
                                        <img
                                            src={`${BASE_IMAGE_URL}about2.jpg`}
                                            alt=""
                                            className="w-100"
                                        />
                                    </div>
                                    <div className="thumb-3 thumb bounce-y-up">
                                        <img
                                            src={`${BASE_IMAGE_URL}about3.jpg`}
                                            alt=""
                                            className="w-100"
                                        />
                                    </div>
                                </div>
                                        </div>
                                    </div> */}
                                    </div>
                                </div>
                                {/* <span className="section-sub-title text-uppercase small text-black fw-bold">
                                <img src={`${BASE_IMAGE_URL}favicon.png`} alt="" />
                                Our
                            </span>
                            <ScrollRevealText text="Mission" className="reveal_heading" />

                            <p className="mission-description">
                                Flex Your Future is about empowering individuals to adapt, grow, and shape what lies ahead. By encouraging creativity, collaboration, and forward thinking, we aim to provide the skills and opportunities needed to unlock potential and build a dynamic and successful future.
                            </p>

                            <div className="row">

                                <div className="col-6">
                                    <div className="mission-item">
                                        <div className="mission-icon">
                                            <i className="fas fa-user-tie"></i>
                                        </div>
                                        <h4>Empowering Future Leaders</h4>
                                        <p>Encouraging individuals to take initiative, think boldly, and lead with confidence.</p>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="mission-item">
                                        <div className="mission-icon">
                                            <i className="fas fa-lightbulb"></i>
                                        </div>
                                        <h4>Igniting Creativity & Innovation</h4>
                                        <p>Fostering an environment where ideas grow and new solutions emerge.</p>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="mission-item">
                                        <div className="mission-icon">
                                            <i className="fas fa-users"></i>
                                        </div>
                                        <h4>Collaborative Learning</h4>
                                        <p>Building communities where people connect, share knowledge, and grow together.</p>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="mission-item">
                                        <div className="mission-icon">
                                            <i className="fas fa-seedling"></i>
                                        </div>
                                        <h4>Shaping a Flexible Future</h4>
                                        <p>Equipping individuals with the mindset to adapt, evolve, and succeed.</p>
                                    </div>
                                </div>

                            </div> */}
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default HorseAnimation;