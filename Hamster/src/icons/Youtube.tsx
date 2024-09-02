import React from 'react';
import { IconProps } from "../utils/types";

const YouTube: React.FC<IconProps> = ({ size = 24, className = "" }) => {
    const svgSize = `${size}px`;

    return (
        <svg fill="currentColor" className={className} height={svgSize} width={svgSize} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a2.942 2.942 0 0 0-2.067-2.08C19.696 3.5 12 3.5 12 3.5s-7.697 0-9.431.606a2.94 2.94 0 0 0-2.067 2.08 29.566 29.566 0 0 0-.502 5.313 29.569 29.569 0 0 0 .502 5.315 2.94 2.94 0 0 0 2.067 2.08C4.304 20.5 12 20.5 12 20.5s7.696 0 9.431-.606a2.94 2.94 0 0 0 2.067-2.08 29.569 29.569 0 0 0 .502-5.315 29.566 29.566 0 0 0-.502-5.313zM9.75 15.023v-6.048L16 11.998l-6.25 3.025z"/>
        </svg>
    );
};

export default YouTube;
