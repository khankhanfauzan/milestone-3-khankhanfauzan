import { useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
}

function SafeImage({
    src,
    alt,
    fallback = "https://placehold.co/600x600?text=Image+Not+Available",
    className,
    width,
    height,
    ...props
}: SafeImageProps) {
    const [sourceImage, setSourceImage] = useState(src);

    return (
        <img
            src={sourceImage}
            alt={alt}
            className={className}
            onError={() => {
                setSourceImage(fallback);
            }}
            width={width}
            height={height}
        />
    );
}

export default SafeImage;
