import React from "react";
import TitleReveal from "./TitleReveal";
import "../assets/css/guruaward.css";

const BASE_IMAGE_URL = "https://ssvm-main.onrender.com/assets/images/"

const GuruAward = () => {
    return (
        <div className="guru_award_parent">
            <div className="hero-bg"></div>

            <section className="hero-wrapper">
                <div className="hero">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="hero-text text-white">
                                <div className="eyebrow">
                                    <span className="section-sub-title text-uppercase fw-bold">
                                        <img src={`${BASE_IMAGE_URL}favicon.png`} alt="" />
                                        Inspirational Guru Awards
                                    </span>
                                    {/* <span className="eyebrow-dot"></span>
                                    <span>Inspirational Guru Awards</span> */}
                                </div>

                                <div>
                                    <TitleReveal
                                        text="Honouring educators"
                                        className="heading_about text-white "
                                        style={{
                                            fontSize: "35px",
                                            textAlign: "start",
                                            display: "block",
                                        }}
                                    />
                                    <TitleReveal
                                        text="who shape lives"
                                        className="heading_about text-white "
                                        style={{
                                            fontSize: "35px",
                                            textAlign: "start",
                                            display: "block",
                                        }}
                                    />
                                </div>

                                <div>
                                    <p className="hero-subtitle">
                                        While students are the future, educators are the force shaping that future.
                                    </p>
                                    <p className="hero-subtitle">
                                        The Inspirational Guru Awards honour educators who go beyond teaching subjects—and instead shape mindsets, character, and confidence.
                                    </p>
                                    <p className="hero-subtitle">

                                        These are mentors who:
                                    </p>

                                    <ul>
                                        <li>Inspire action, not just understanding</li>
                                        <li>Build resilience, not just knowledge</li>
                                        <li>Influence lives far beyond classrooms</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="hero-visual">
                                <article className="orbital-card">
                                    <div className="orbital-card-inner">
                                        <img src={`${BASE_IMAGE_URL}ssvm-award-1.gif`} className="w-100" alt="" />
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="col-lg-12 mt-4">
                            <div className="hero-actions d-flex justify-content-between w-100">
                                <button className="btn-primary">
                                    <span>Register – Internal (SSVM)</span>
                                </button>

                                <button className="btn-ghost">
                                    <span>Register – External</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* LEFT: TEXT */}
                </div>
            </section>
        </div>
    );
};

export default GuruAward;