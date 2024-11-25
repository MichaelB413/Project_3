import React, { useState } from 'react';
import './stylegambling.css';

const RouletteWheel = ({ balance, updateBalance }) => {
    const [spinning, setSpinning] = 
useState(false);
    const [result, setResult] = 
useState('');
    const [rotation, setRotation] =
useState(0);
    const [freeSpinUsed, setFreeSpinUsed] = useState(false);
    const spinCost = 50;

const segments = [
    { number: 1, icon: '🎁', amount: 500, color: '#EF94C0' },
    { number: 2, icon: '📦', amount: -100, color: '#EF94C0' },
    { number: 3, icon: '🎮', amount: 200, color: '#EF94C0' },
    { number: 4, icon: '🥤', amount: -500, color: '#EF94C0' },
    { number: 5, icon: '⭐', amount: 100, color: '#EF94C0' },
    { number: 6, icon: '💰', amount: -150, color: '#EF94C0' },
    { number: 7, icon: '⌛', amount: 300, color: '#EF94C0' },
    { number: 8, icon: '🏆', amount: -75, color: '#EF94C0' },
    { number: 9, icon: '🎯', amount: 400, color: '#EF94C0' },
    { number: 10, icon: '📝', amount: -300, color: '#EF94C0' },
    { number: 11, icon: '🎨', amount: 250, color: '#EF94C0' },
    { number: 12, icon: '🎪', amount: 600, color: '#EF94C0' },
];

const spinWheel = () => {
    if (spinning) return;
    if (!freeSpinUsed) {
        setFreeSpinUsed(true);
    } else {
      if (balance < spinCost) {
        setResult(`Sorry you need $${spinCost} to spin again!`);
        return;
      }  
      updateBalance(balance - spinCost);
    }

    setSpinning(true);
    const newRotation = rotation + 1440 + Math.random() * 360;
    setRotation(newRotation);


setTimeout(() => {
    setSpinning(false);
    const winningIndex = Math.floor(Math.random() * segments.length);
    const winAmount = segments[winningIndex].amount;
        updateBalance(balance + winAmount);
            setResult(winAmount >= 0 ? `You won $${winAmount}, congratulations!`
                : `Sorry you lost $ ${Math.abs(winAmount)}, try again?`);
    }, 5000);
};

return (
    <div className="wheel-container">
        <div className="wheel-base">
            <div 
                className="wheel"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                <div className="center-star">⭐</div>
                {[...Array(12)].map((_, index) => (
                    <div
                        key={index}
                        className="segment"
                        style={{
                            '--i': index,
                            backgroundColor: '#FFB6C1',
                            borderLeft: '2px solid #87CEEB'
                        }}
                    >
                        <div className="segment-content">
                            <span className="segment-icon">{segments[index].icon}</span>
                            <span className="segment-number">{segments[index].number}</span>
                    </div>
                    </div>
                ))}
            </div>
            <div className="pointer">▼</div>
        </div>
        
        <button
            className="spin-button"
            onClick={spinWheel}
            disabled={spinning}
        >
            {spinning ? 'Spinning...' : freeSpinUsed ? `Spin ($${spinCost})` : 'Free Spin!'}
        </button>
        <div className="result">{result}</div>
        <div className="balance">Balance: ${balance}</div>
    </div>
);
};

export default RouletteWheel;
