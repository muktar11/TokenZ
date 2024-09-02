import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import '../App.css';
import TopContent from '../components/TopContent';
// @ts-ignore
import numeral from 'numeral';
// icons
import coinIcon from '../images/coinIcon.svg';
import bigCoinIcon from '../images/bigCoin.svg';
import blueCenter from '../images/blue-center.svg';
import hamsterImage from '../images/hamster.svg';
import stormIcon from '../images/storm.svg';
import binanceIcon from '../images/binanceIcon.svg';
import mineIcon from '../images/mine.svg';
import friendsIcon from '../images/humans.svg';
import moneyIcon from '../images/moneys.svg';
import discord from '../images/discord.png';
import tiktok from '../images/tikok.png';
import twitch from '../images/twitch.png'
import youtube from '../images/youtube.png'
//  not mine
import Hamster from '../icons/Hamster';
import {
  binanceLogo,
  dailyCipher,
  dailyCombo,
  dailyReward,
  dollarCoin,
  hamsterCoin,
  mainCharacter,
  
} from '../images';
import Info from '../icons/Info';
import Settings from '../icons/Settings';
import Mine from '../icons/Mine';
import Friends from '../icons/Friends';
import Coins from '../icons/Coins';
import YouTube from '../icons/Youtube';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import Setting from './Setting';
interface Iitem {
  icon: string;
  title: string;
}

interface UserCacheData {
    token: string;
    user: {
        username: string;
        phone: string;
        id: number;
        coins: number;
    };
}

function MinePage() {
    const [coincount, setCoinCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const navigate = useNavigate();




  const handlexchangepage = () => {
    navigate('/Exchange')
  }
  const hanldeminipage = () => {
      navigate('/mine-page')
  }

  const handleFriedPage = () => {
    navigate('/friend-page')
  }

  const handleYoutubePage = () => {
    navigate('/video-page')
  }

  const handleSettingspage = () => {
    navigate('/settings')
  }

  const items: Iitem[] = [
    {
      icon: binanceIcon,
      title: 'Exchange',
    },
    {
      icon: mineIcon,
      title: 'Mine',
    },
    {
      icon: friendsIcon,
      title: 'Friends',
    },
    {
      icon: moneyIcon,
      title: 'Earn',
    },
    {
      icon: coinIcon,
      title: 'Airdrop',
    },
  ];

  const levelNames = [
    'Bronze', // From 0 to 4999 coins
    'Silver', // From 5000 coins to 24,999 coins
    'Gold', // From 25,000 coins to 99,999 coins
    'Platinum', // From 100,000 coins to 999,999 coins
    'Diamond', // From 1,000,000 coins to 2,000,000 coins
    'Epic', // From 2,000,000 coins to 10,000,000 coins
    'Legendary', // From 10,000,000 coins to 50,000,000 coins
    'Master', // From 50,000,000 coins to 100,000,000 coins
    'Grandmaster', // From 100,000,000 coins to 1,000,000,000 coins
    'Lord', // From 1,000,000,000 coins to ∞
  ];

  const levelMinPoints = [
    0, // Bronze
    5000, // Silver
    25000, // Gold
    100000, // Platinum
    1000000, // Diamond
    2000000, // Epic
    10000000, // Legendary
    50000000, // Master
    100000000, // GrandMaster
    1000000000, // Lord
  ];

  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints) : 732749365;
  });

   useEffect(() => {
        const cachedUser = localStorage.getItem('user');
        if (cachedUser) {
            try {
                const userData: UserCacheData = JSON.parse(cachedUser);
                setUsername(userData.user.username);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        } else {
            console.log('No user data found in localStorage.');
        }
    }, []);

    useEffect(() => {
        const cachedUser = localStorage.getItem('user');
        if (!cachedUser) {
            setError('User data not found in local storage.');
            return;
        }

        try {
            const userData: UserCacheData = JSON.parse(cachedUser);
            const userId = userData.user.id;

            socketRef.current = io('https://token-z.com', {
                query: { userId },
            });

            socketRef.current.emit('getUserCoins', userId);

            socketRef.current.on('userCoins', (data: { coins: number }) => {
                setCoinCount(data.coins);
            });

            socketRef.current.on('coinsUpdated', (data: { userId: number; coins: number }) => {
                setCoinCount(data.coins);
            });

            socketRef.current.on('error', (error: { error: string }) => {
                setError(error.error);
            });
        } catch (error) {
            console.error('Error setting up socket connection:', error);
            setError('An error occurred while setting up the socket connection.');
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    const handleImageClick = async () => {
        try {
            const cachedUser = localStorage.getItem('user');
            if (!cachedUser) {
                setError('User data not found in local storage.');
                return;
            }

            const userData: UserCacheData = JSON.parse(cachedUser);
            const token = userData.token;

            const response = await axios.post(
                'https://token-z.com/api/activities/tap',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Activity created:', response.data);

        } catch (error) {
            console.error('Error increasing coins:', error);
            setError('An error occurred while increasing coins.');
        }
    };
  
  return (
    // no my code
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="px-4 z-10">
          <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#1d2025]">
              <Hamster size={24} className="text-[#d4d4d4]" />
            </div>
            <div>
             <p className="text-sm"> {username ? `Welcome, ${username}` : 'User not found'}</p>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4 mt-1">
            <div className="flex items-center w-1/3">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-[12px]">{levelNames[levelIndex]}</p>
                  <p className="text-sm">
                    {levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span>
                  </p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    
                  </div>
                </div>
              </div>
            </div>
            <div
      
              className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
              <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <div className="flex-1 text-center">
                <p className="text-xs text-[#85827d] font-medium">Cash Balance</p>
                <div className="flex items-center justify-center space-x-1">
                  <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" />
               
                  <Info size={20} className="text-[#43433b]" />
                </div>
              </div>
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <div className="text-white" onClick={handleSettingspage}>
  <Settings />
</div>
            </div>
          </div>
        </div>

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
            <div className="px-4 mt-6 flex justify-between gap-2">
              <div onClick={handleYoutubePage} className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={youtube} alt="Daily Reward" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">YouTube</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
               
                </p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={discord} alt="Daily Cipher" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Discord</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                 
                </p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={tiktok} alt="Daily Combo" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">TikTok</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                  
                </p>
              </div>
               <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={twitch} alt="Daily Combo" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Twitch</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                 
                </p>
              </div>
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div className="px-4 py-2 flex items-center space-x-2">
                <img src={dollarCoin} alt="Dollar Coin" className="w-[37px] h-[37px]" />
              <p className="leading-[2.5rem] text-[34px] text-white"> 
                {coincount !== null ? (
            <div>{coincount}</div>
          ) : (
            <div>Loading...</div>
          )}
            </p>
              </div>
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div className="w-80 h-80 p-4 rounded-full circle-outer">
                <div className="w-full h-full rounded-full circle-inner">
                  <img
                    src={
                      'https://hamsterkombat.me/_next/image?url=%2Fhamster-kombat-9.png&w=1080&q=75'
                    }
                    alt="Main Character"
                    className="w-full h-full"
                     onClick={handleImageClick} // Attach the click handler here
                     
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fixed div */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
        <div
          onClick={handlexchangepage}
          className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
          <img src={binanceLogo} alt="Exchange" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Exchange</p>
        </div>
        <div onClick={hanldeminipage} className="text-center text-[#85827d] w-1/5">
          <Mine className="w-8 h-8 mx-auto" />
          <p className="mt-1">Mine</p>
        </div>
        <div onClick={handleFriedPage} className="text-center text-[#85827d] w-1/5">
          <Friends className="w-8 h-8 mx-auto" />
          <p className="mt-1">Friends</p>
        </div>
  
      </div>  
    </div>
   
  );
}

export default MinePage;