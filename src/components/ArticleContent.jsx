import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from "motion/react"
import { Scrollama, Step } from 'react-scrollama';
import {
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    s1,
    s2,
    s3,
    s4,
    s5,
    showing
} from '../../public/content.js';



function ScrollBar({ scrollYProgress }) {
    return (
        <div className="absolute left-0 right-0 z-10 top-[17px] flex justify-center">
            <div className="relative w-full max-w-xl h-[3px]
            rounded-full bg-gray-500 overflow-hidden
            lg:max-w-none lg:top-[-18px] lg:h-[5px]">
                <motion.div
                    className="absolute inset-0 rounded-full bg-[#800000] origin-left"
                    style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                />
            </div>
        </div>
    )
}



const ScrollContainer = (props) => {
    const { start, onStepEnter, onStepExit, textArray, height } = props;
    return (
        <div className="relative px-5 py-5 z-10 mx-auto">
            <Scrollama
                onStepEnter={onStepEnter}
                onStepExit={onStepExit}
                offset={1}
            >
                {textArray.map((_, index) => (
                    <Step data={start + index} key={start + index}>
                        <div
                            className="relative w-[100px] h-[100px]"
                            style={{ marginBottom: 0.9 * height + 'px' }}
                        >
                            <p
                                className="scroll_font text-center"
                            ></p>
                        </div>
                    </Step>
                ))}
            </Scrollama>
        </div>
    );
};

const AnimationContainerOne = ({ currentStepIndex, textArray, scrollYProgress, windowWidth }) => {
    const imageArray = [
        ["crowd1.jpg", "A crowd gathers in the basement of Cobb Cafe. <a href='https://chicagomaroon.com/staff_name/nolan-shaffer/'>Nolan Shaffer</a>.", -1, 0],
        ["crowd2.jpg", "A party-light setup made the basement coffee shop come alive. <a href='https://chicagomaroon.com/staff_name/nolan-shaffer/'>Nolan Shaffer</a>.", 1, 1],
        ["hallway.jpg", "The hallway of the academic building became the entryway to the party. <a href='https://chicagomaroon.com/staff_name/nolan-shaffer/'>Nolan Shaffer</a>.", 2, 2]
    ]

    console.log(scrollYProgress)
    const barProgress = useTransform(
        scrollYProgress,
        [0, 0.40],
        [0, 1]
    )

    return (
        <div className="sticky bg-black top-0 h-screen w-full relative flex justify-center">
            <ScrollBar scrollYProgress={barProgress} />
            {imageArray.map((el, index) => (
                <div key={index} className={`absolute left-1/2 -translate-x-1/2
                max-w-xl w-full max-h-screen
                lg:flex lg:items-center lg:justify-center lg:h-screen
                lg:p-6 lg:gap-5 lg:max-w-6xl lg:w-full
                ${el[2] <= currentStepIndex && currentStepIndex <= el[3] ? 'z-30 pointer-events-auto' : 'z-0 pointer-events-none'}`}>
                    <div className="flex flex-col items-center lg:flex-[2] lg:min-w-0 pointer-events-auto">
                        <img
                            src={el[0]}
                            alt={el[1]}
                            className={`mt-[20px] w-full h-auto object-contain lg:mt-0 lg:max-w-5xl lg:w-full
                                transition-opacity duration-[1500ms]
                                ${el[2] <= currentStepIndex && currentStepIndex <= el[3] ? 'opacity-100' : 'opacity-0'}`}
                        />
                        <p
                            className={`text-gray-400 mt-2 text-sm italic text-left w-full relative z-10
                            ${el[2] <= currentStepIndex && currentStepIndex <= el[3] ? 'opacity-100' : 'opacity-0 hidden pointer-events-none'}`}
                            dangerouslySetInnerHTML={{ __html: el[1] }}
                        />
                    </div>
                    <div className="z-[25] absolute left-0 right-0 flex justify-center top-[105%]
                        lg:relative lg:top-0 lg:left-0 lg:right-0 lg:flex-1 lg:min-w-0 lg:flex lg:items-center lg:justify-center">
                        <p
                        className={`absolute text-white content lg:relative lg:text-left transition-opacity duration-500
                        ${el[2] <= currentStepIndex && currentStepIndex <= el[3] ? 'opacity-100' : 'opacity-0'}`}
                        dangerouslySetInnerHTML={{ __html: textArray[index] }}
                        />
                    </div>
                </div>
        ))}
        </div>
    );
};

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

    // Reset currentStepIndex to 0 when user scrolls to the top of the page
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

    return (
        <div className="[overflow-x:clip]">
            <p className="text-right mr-3 md:mr-5 text-sm">
            The student-run coffee shop became a dance club for Battle of the DJ’s. Courtesy of Taylor Pate.
            </p>
            <div className="w-[100dvw] mx-auto py-10 md:py-10 flex flex-col items-center">
                {p1.map((text, index) => (
                    <p
                        className="mb-[20px] px-[2%] md:px-[20%] z-[20] content"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ))}
                <AnimationContainerOne
                    currentStepIndex={currentStepIndex}
                    textArray={s1}
                    scrollYProgress={scrollYProgress}
                    windowWidth={windowWidth}
                />
                <div ref={stepsContainerRef}>
                    <ScrollContainer
                        onStepEnter={onStepEnter}
                        onStepExit={onStepExit}
                        textArray={s1}
                        start={0}
                        height={height}
                    />
                </div>
            </div>
        </div>
    );
}
