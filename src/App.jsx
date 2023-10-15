import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import churchLogo from './assets/LOGO.jpg';

const baseURL = "http://192.168.0.6:4316/api/v2/controller/live-item";

function App() {
  const [post, setPost] = useState(null);
  const [text, setTest] = useState(null);
  const [verseNumber, setVerseNumber] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(baseURL);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    const pollingInterval = setInterval(() => {
      fetchData();
    }, 100); // Poll every 100 milliseconds (adjust as needed)

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  // Function to split text if it starts with a number
  function splitText(text) {
    const words = text.split(" ");
    if (!isNaN(parseInt(words[0]))) {
      return (
        <>
          <sup id='versnumb' className='text-lg'>
            {post.slides[0].tag}
          </sup>
          <span className='text-left text-3xl'>{words.slice(1).join(" ")}</span>
        </>
      );
    } else {
      return (<>
      <sup id='versnumb' className='text-lg'>
            {post.slides[0].tag}
          </sup>
      <span className='text-left text-3xl'> {text}</span></>);
    }
  }


  return (
    <div className='shadow rounded-lg pd-2 bg-cyan-800 text-slate-50'>
      <div id='card' className='gap-1 flex px-2 py-2 rounded-lg bg-cyan-50 text-cyan-950 align-middle'>
        <img src={churchLogo} className='w-24 h-24 rounded-lg' alt="Church Logo" />
        <div>
          {post && post.slides && post.slides[0] && post.slides[0].text ? (
            splitText(post.slides[0].text)
          ) : (
            ""
          )}
        </div>
      </div>
      <p id='verseReference' className='text-xl text-cyan-50'>
        {post ? post.title : ""}
      </p>
    </div>
  );
}

export default App;
