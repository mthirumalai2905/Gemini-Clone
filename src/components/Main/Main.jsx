import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
    const { onSent, setInput, input, showResult, recentPrompt, resultData, loading } = useContext(Context);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSent(input);
        }
    };

    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt='' />
            </div>
            <div className='main-container'>
                {!showResult ? (
                    <>
                        <div className='greet'>
                            <p><span>Hello, Dev</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className='cards-container'>
                            <div className='cards'>
                                <p>Suggest beautiful places to see an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="compass" />
                            </div>
                            <div className='cards'>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="bulb" />
                            </div>
                            <div className='cards'>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="message" />
                            </div>
                            <div className='cards'>
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="code" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
    <div className="result-title">
        <img src={assets.user_icon} alt=""/>
        {recentPrompt === 'hello' ? null : (
            <p>{recentPrompt}</p>
            
        )}
    </div>
    <div className="result-data">
        <img src={assets.gemini_icon} alt=""/>
        {loading ? (
            <div className="loader">
                <hr />
                <hr />
                <hr />
            </div>
        ) : (
            <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
        )}
    </div>
</div>

                )}
            </div>
            <div className='main-bottom'>
                <div className='search-box'>
                    <input 
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress} // Added event listener for key press
                        value={input} 
                        type='text' 
                        placeholder='Enter a prompt here'
                    />
                    <div>
                        <img src={assets.gallery_icon} alt="gallery" />
                        <img src={assets.mic_icon} alt="mic" />
                        <img onClick={() => onSent(input)} src={assets.send_icon} alt="send" />
                    </div>
                </div>
                <p id='b'>Gemini may display inaccurate info, including about people, so double-check its accuracy.</p>
            </div>
        </div>
    );
}

export default Main;
