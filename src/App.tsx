import { useState, useEffect } from 'react';

const ColorfulCard = () => {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState('#3B82F6');
    const [isAnimating, setIsAnimating] = useState(false);

    const colors = [
        '#3B82F6', // Blue
        '#EF4444', // Red
        '#10B981', // Green
        '#F59E0B', // Yellow
        '#8B5CF6', // Purple
        '#EC4899', // Pink
        '#06B6D4', // Cyan
        '#84CC16', // Lime
    ];

    const handleClick = () => {
        setCount(prev => prev + 1);
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setColor(randomColor);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setColor(randomColor);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div 
                className={`
                    bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4
                    transform transition-all duration-300 ease-in-out
                    ${isAnimating ? 'scale-105 rotate-1' : 'scale-100 rotate-0'}
                    hover:shadow-xl
                `}
                style={{ borderTop: `4px solid ${color}` }}
            >
                <h1 
                    className="text-3xl font-bold text-center mb-6 transition-colors duration-500"
                    style={{ color }}
                >
                    Magic Counter
                </h1>
                
                <div className="text-center mb-6">
                    <div 
                        className="text-6xl font-bold mb-2 transition-colors duration-500"
                        style={{ color }}
                    >
                        {count}
                    </div>
                    <p className="text-gray-600">
                        {count === 0 ? 'Click to begin!' : 
                         count === 1 ? 'You made your first click!' :
                         count < 10 ? 'Keep going!' :
                         count < 50 ? 'You\'re on fire! 🔥' :
                         'Amazing! 🎉'}
                    </p>
                </div>

                <button
                    onClick={handleClick}
                    className={`
                        w-full py-3 px-6 rounded-lg font-semibold text-white
                        transform transition-all duration-200
                        hover:scale-105 active:scale-95
                        focus:outline-none focus:ring-4 focus:ring-opacity-50
                    `}
                    style={{ 
                        backgroundColor: color,
                        boxShadow: `0 4px 14px 0 ${color}40`
                    }}
                >
                    Click Me! ✨
                </button>

                <div className="mt-6 flex justify-center space-x-2">
                    {colors.map((c, index) => (
                        <div
                            key={index}
                            className={`
                                w-4 h-4 rounded-full cursor-pointer
                                transform transition-all duration-200
                                hover:scale-125 ${color === c ? 'ring-2 ring-gray-400' : ''}
                            `}
                            style={{ backgroundColor: c }}
                            onClick={() => setColor(c)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export const App = () => {
    return (
        <div className='h-screen w-screen'>
            <ColorfulCard />
        </div>
    );
};
