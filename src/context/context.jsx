import React, { useState, useEffect, createContext } from 'react';
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [error, setError] = useState(null);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    try {
      const response = await runChat(prompt);
      setRecentPrompt(prompt);
      setPrevPrompts(prev => [...prev, prompt]);

      const responseArray = response.split("**");
      let formattedResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        formattedResponse += i % 2 === 0 ? responseArray[i] : "<b>" + responseArray[i] + "</b>";
      }

      const formattedResponse2 = formattedResponse.split("*" || "//" || "```").join("</br>");
      const newResponseArray = formattedResponse2.split(" ");
      
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }

      setResultData(formattedResponse2);
    } catch (error) {
      console.error("Error while fetching response: ", error);
      setError("Error occurred while fetching response.");
    }

    setLoading(false);
    setInput("");
  };

  useEffect(() => {
    // Load data from localStorage
    const savedPrevPrompts = JSON.parse(localStorage.getItem('prevPrompts')) || [];
    const savedRecentPrompt = localStorage.getItem('recentPrompt') || "";
    const savedShowResult = localStorage.getItem('showResult') === 'true';

    if (savedPrevPrompts.length > 0) {
      setPrevPrompts(savedPrevPrompts);
    }
    if (savedRecentPrompt) {
      setRecentPrompt(savedRecentPrompt);
    }
    setShowResult(savedShowResult);
    
    // Initial prompt on component mount
    onSent("hello");

    // Clean up
    return () => {
      // Save data to localStorage when component unmounts
      localStorage.setItem('prevPrompts', JSON.stringify(prevPrompts));
      localStorage.setItem('recentPrompt', recentPrompt);
      localStorage.setItem('showResult', showResult);
    };
  }, []);

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    error,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
