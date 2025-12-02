interface FadeEdgeProps {
    height: number;
    toBottom: boolean;
    opacity: number
}

const FadeEdge: React.FC<FadeEdgeProps> = ({ height, toBottom, opacity }) => {
    const gradientStyle: React.CSSProperties = {
        opacity: `${opacity}%`,
        width: '100%',
        height: `${height}px`,
        background: toBottom
            ? `linear-gradient(to bottom, transparent, var(--background) )`
            : `linear-gradient(to top, transparent, var(--background))`,
        pointerEvents: 'none',
        zIndex: 10,
    };

    return <div style={gradientStyle} />;
};

export default FadeEdge;