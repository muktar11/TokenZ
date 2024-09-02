import React, { useEffect, useState, useRef  } from 'react';
import logo from './logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';
//  not mine
import Hamster from '../icons/Hamster';
import {
  binanceLogo,
  dailyReward,
  } from '../images';
import contact from '../images/contact.png';
import Info from '../icons/Info';
import Settings from '../icons/Settings';
import Mine from '../icons/Mine';
import Friends from '../icons/Friends';
import { Socket } from 'socket.io-client';


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

interface ExchangeData {
  id: number;
  currencytype: string;
  value: string;
  expiry_date: string;
  timestamp: string;
}

function Setting() {
   
    const [username, setUsername] = useState<string | null>(null);
    const [exchangeData, setExchangeData] = useState<ExchangeData[] | null>(null);
    const navigate = useNavigate();

  const handlexchangepage = () => {
    navigate('/Exchange');
  };

  const hanldeminipage = () => {
    navigate('/mine-page');
  };

  const handleFriedPage = () => {
    navigate('/friend-page');
  };

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/');
  };


  const items: Iitem[] = [
    {
      icon: 'binanceIcon',
      title: 'Exchange',
    },
    {
      icon: 'mineIcon',
      title: 'Mine',
    },
    {
      icon: 'friendsIcon',
      title: 'Friends',
    },
    {
      icon: 'moneyIcon',
      title: 'Earn',
    },
    {
      icon: 'coinIcon',
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
          <div  className="flex items-center justify-between space-x-4 mt-1">
            <div className="flex items-center w-1/3">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-[12px]"></p>
                  <p className="text-sm">
                    <span className="text-[#95908a]"></span>
                  </p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div
                      className="progress-gradient h-2 rounded-full"
                      //style={{ width: `${calculateProgress()}%` }}
                      >

                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div
             
              className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
              <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <div className="flex-1 text-center">
                <p className="text-xs text-[#85827d] font-medium">Exchange Rate</p>
                <div className="flex items-center justify-center space-x-1">
                  {exchangeData && exchangeData.map(item => (
        <div key={item.id}>
          <p> {item.currencytype} {item.value}</p>
        </div>
      ))}
                </div>
              </div>
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <Settings className="text-white" />
            </div>
          </div>
        </div>

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
            <div className="px-4 mt-6 flex justify-between gap-2">
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={contact} onClick={handleLogout} alt="Daily Reward" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Logout</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                  
                </p>
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

export default Setting;