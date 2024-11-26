import React, { useState, useEffect } from 'react';
import './stylegambling.css';
import { Link } from 'react-router-dom'
import ReturnPopup from './components/ReturnPopup';
import Fireworks from "./fireworks.jsx";

const RouletteWheel = () => {
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState('');
    const [rotation, setRotation] = useState(0);
    const [balances, setBalances] = useState(null);
    const [transferAmount, setTransferAmount] = useState('');
    const [freeSpinUsed, setFreeSpinUsed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [showFireworks, setShowFireworks] = useState(false);
    const spinCost = 50;

    const userId = localStorage.getItem('userId');

    if (!userId) {
        return <div>You must be logged in to play!</div>;
    }

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

    useEffect(() => {
        const fetchBalances = async () => {
            try {
                const response = await fetch(`http://localhost:3000/details/${userId}`);
                if (!response.ok) throw new Error('Failed to fetch balances.');
                const data = await response.json();
                console.log('API Response:', data);
    
                if (data && data.length > 0) {
                    const userDetails = data[0];
                    setBalances({
                        checking_balance: parseFloat(userDetails.checking_balance) || 0,
                        savings_balance: parseFloat(userDetails.savings_balance) || 0,
                    });
                } else {
                    console.error('Invalid or empty data structure from API');
                    setBalances({ checking_balance: 0, savings_balance: 0 });
                }
            } catch (error) {
                console.error('Error fetching balances:', error);
                setBalances({ checking_balance: 0, savings_balance: 0 });
            } finally {
                setLoading(false);
            }
        };
    
        fetchBalances();
    }, [userId]);
    
    const updateBalances = async (newBalances) => {
        try {
            const response = await fetch(`http://localhost:3000/details/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBalances),
            });

            if (response.ok) {
                setBalances(newBalances);
            } else {
                console.error('Failed to update balances:', await response.json());
            }
        } catch (error) {
            console.error('Failed to update balances:', error);
        }
    };

    const spinWheel = () => {
        if (spinning || balances === null) return;

        const spinSound = new Audio('/Jackpot.mp3');
        spinSound.play();

        if (!freeSpinUsed) {
            setFreeSpinUsed(true);
        } else {
            if (balances.checking_balance < spinCost) {
                setResult(`Sorry, you need $${spinCost} to spin again!`);
                return;
            }
            updateBalances({
                ...balances,
                checking_balance: balances.checking_balance - spinCost,
            });
        }

        setSpinning(true);
        setShowFireworks(true);
        setTimeout(() => {
            setShowFireworks(false);
        },3000);
        const newRotation = rotation + 1440 + Math.random() * 360;
        setRotation(newRotation);

        setTimeout(() => {
            setSpinning(false);
            const winningIndex = Math.floor(Math.random() * segments.length);
            const winAmount = segments[winningIndex].amount;

            updateBalances({
                ...balances,
                checking_balance: balances.checking_balance + winAmount,
            });

            setResult(
                winAmount >= 0
                    ? `You won $${winAmount}, congratulations!`
                    : `Sorry, you lost $${Math.abs(winAmount)}, try again?`
            );
        }, 5000);
    };

    const handleTransfer = (direction) => {
        const amount = parseFloat(transferAmount);
        if (isNaN(amount) || amount <= 0 || balances === null) return;

        if (direction === 'toSavings' && balances.checking_balance >= amount) {
            updateBalances({
                checking_balance: balances.checking_balance - amount,
                savings_balance: balances.savings_balance + amount,
            });
        } else if (direction === 'toChecking' && balances.savings_balance >= amount) {
            updateBalances({
                checking_balance: balances.checking_balance + amount,
                savings_balance: balances.savings_balance - amount,
            });
        } else {
            setResult(`You don't have enough money to transfer!`);
        }
    };

    if (loading || balances === null) {
        return <div>Loading your balances...</div>;
    }

    return (
        <div className="wheel-container">
            {showFireworks && <Fireworks />}
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
                                borderLeft: '2px solid #87CEEB',
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
                disabled={spinning || loading}
            >
                {spinning ? 'Spinning...' : freeSpinUsed ? `Spin ($${spinCost})` : 'Free Spin!'}
            </button>
            <div className="result">{result}</div>
            <div className="balance">
                <p>Checking Balance: ${balances.checking_balance.toFixed(2)}</p>
                <p>Savings Balance: ${balances.savings_balance.toFixed(2)}</p>
            </div>
            <div className="transfer-section">
                <input
                    type="number"
                    placeholder="Transfer Amount"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                />
                <button onClick={() => handleTransfer('toSavings')}>To Savings</button>
                <button onClick={() => handleTransfer('toChecking')}>To Checking</button>
            </div>
            <button type='button' onClick={() => setButtonPopup(true)}>Return Home</button>
            <ReturnPopup trigger={buttonPopup} setTrigger={setButtonPopup}/>
        </div>
    );
};

export default RouletteWheel;
