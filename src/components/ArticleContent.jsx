import React, { useState, useEffect, useRef } from 'react';
import { useScroll } from "motion/react"
import { AnimationBox } from "./Interactives.jsx"
import { sections } from '../../public/content.js';


export default function ArticleContent({ windowHeight, windowWidth }) {
    const spacing = .2;
    const height = windowHeight * spacing;

    const stepsContainerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: stepsContainerRef,
        offset: ["start end", "end start"],
    });

    const [scrollY, setScrollY] = useState(() => {
        const saved = localStorage.getItem('scrollY');
        return saved !== null ? parseInt(saved) : 0;
    });

    const [currentStepIndex, setCurrentStepIndex] = useState(() => {
        const saved = localStorage.getItem('currentStepIndex');
        return saved !== null && scrollY > 2000 ? parseInt(saved) : 0;
    });

    useEffect(() => {
        localStorage.setItem('currentStepIndex', currentStepIndex.toString());
    }, [currentStepIndex]);

    useEffect(() => {
        localStorage.setItem('scrollY', scrollY.toString());
    }, [scrollY]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        if (scrollY <= 100) {
            setCurrentStepIndex(0);
        }
    }, [scrollY]);

    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };

    const onStepExit = ({ data, direction }) => {
        if (direction === 'up') {
            setCurrentStepIndex(data - 1);
        } else if (direction === 'down') {
            setCurrentStepIndex(data);
        }
    };

    const baseProps = {
        currentStepIndex,
        scrollYProgress,
        windowWidth,
        stepsContainerRef,
        onStepEnter,
        onStepExit,
        height,
    };

    return (
        <div className="[overflow-x:clip]">
            <p className="text-right mr-3 md:mr-5 text-sm">
            The student-run coffee shop became a dance club for Battle of the DJ’s. Courtesy of Taylor Pate.
            </p>
            {sections.map((section, index) => (
                <AnimationBox
                    key={index}
                    {...baseProps}
                    scrollText={section.scrollText}
                    paragraphText={section.paragraphText}
                    imageArray={section.imageArray}
                    barLength={section.barLength}
                    start={section.start}
                />
            ))}
        </div>
    );
}
