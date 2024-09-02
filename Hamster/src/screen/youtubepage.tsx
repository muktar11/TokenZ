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
import { useNavigate } from 'react-router-dom';
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
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import Setting from './Setting';
interface Iitem {
  icon: string;
  title: string;
  onClick?: () => void; // Optional onClick property
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


function YouTubePage() {
   const [coincount, setCoinCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [coinCode, setCoinCode] = useState<string>(''); // State to hold the coin code input
    const socketRef = useRef<Socket | null>(null);
    const navigate = useNavigate();

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

   const handleCoinSubmit = async () => {
    try {
      const cachedUser = localStorage.getItem('user');
      if (!cachedUser) {
        setError('User data not found in local storage.');
        return;
      }

      const userData: UserCacheData = JSON.parse(cachedUser);
      const token = userData.token;

      const response = await axios.post(
        'https://token-z.com/api/activities/redeem',
        { coinCode }, // Include the coin code in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Coin Registered created:', response.data);
    } catch (error) {
      console.error('Error increasing coins:', error);
      setError('An error occurred while increasing coins.');
    }
  };
  



  const handlexchangepage = () => {
    navigate('/Exchange')
  }
  const hanldeminipage = () => {
      navigate('/mine-page')
  }

  const handleFriedPage = () => {
    navigate('/friend-page')
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
                  <p className="text-[12px]"></p>
                  <p className="text-sm">
                  
                  </p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div
                      className="progress-gradient h-2 rounded-full"
                     ></div>
                  </div>
                </div>
              </div>
            </div>
            <div
             
              className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
              <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <div className="flex-1 text-center">
                <p className="text-xs text-[#85827d] font-medium">Coin Count</p>
                <div className="flex items-center justify-center space-x-1">
                  <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" />
                
                  <p className="leading-[2.5rem] text-[34px] text-white"> 
                {coincount !== null ? (
            <div>{coincount}</div>
          ) : (
            <div>Loading...</div>
          )}
            </p>
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
           

            <div className="px-4 mt-4 flex justify-center">
             <div className="px-4 py-2 flex items-center justify-between space-x-2">
  <img src={dollarCoin} alt="Dollar Coin" className="w-[37px] h-[37px]" />
  <div className="flex items-center space-x-2" style={{ width: '100%' }}>
    <input
    value={coinCode}
            onChange={(e) => setCoinCode(e.target.value)}
      style={{
        color: 'black',
        width: '50%',
        border: '1px solid gray',
        padding: '10px',
        borderRadius: '4px',
      }}
    />
    <button
      type="submit"
      onClick={handleCoinSubmit}
      style={{
        width: '30%',
        padding: '10px',
        border: 'none',
        background: '#ff9900',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '4px',
      }}
    >
      InsertCoin
    </button>
  </div>
</div>

            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div className="w-80 h-80 p-4 rounded-full circle-outer">
                <div className="w-full h-full rounded-full circle-inner">
                   <div>
                <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/H7VvSoviv7Q" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                </iframe>
            </div>

            {/* YouTube Subscribe Button */}
            <div style={{ marginTop: '20px' }}>
                <div 
                    className="g-ytsubscribe" 
                    data-channelid="UCJxGUdWeUDcTYVWXFd4hg5g" 
                    data-layout="full" 
                    data-theme="dark" 
                    data-count="default">
                </div>
            </div>

            {/* Like & Comment Section */}
          
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

export default YouTubePage