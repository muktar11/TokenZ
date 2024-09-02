import React from 'react';
import { IconProps } from "../utils/types";

const TikTok: React.FC<IconProps> = ({ size = 24, className = "" }) => {
    const svgSize = `${size}px`;

    return (
        <svg fill="currentColor" className={className} height={svgSize} width={svgSize} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.935 2.153v7.731s4.885 1.158 7.697 3.643c-.01.138-.03.275-.06.408-.592 2.825-3.046 4.667-5.873 4.667a5.97 5.97 0 0 1-3.179-.908v2.493a9.252 9.252 0 0 0 4.285.991c.07 0 .135-.017.2-.018 4.945-.104 9.06-4.13 9.06-9.208V8.664c-3.523.013-6.432-2.698-6.43-6.11h-5.7zm-2.16 8.095v2.227a3.429 3.429 0 0 0-1.61-.397c-1.864 0-3.377 1.458-3.475 3.291a3.421 3.421 0 0 0-.021.387c0 1.942 1.57 3.52 3.503 3.52a3.44 3.44 0 0 0 1.602-.4v-2.235c-.485.301-1.073.482-1.693.482-1.794 0-3.246-1.471-3.246-3.29 0-1.82 1.454-3.291 3.246-3.291.62 0 1.21.18 1.696.482z"/>
        </svg>
    );
};

export default TikTok;
