'use client'

import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../../../public/lottie/lottie-landing.json';

const LottieAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-[550px] aspect-square">
                <Lottie
                    options={defaultOptions}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default LottieAnimation;