import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyle';
import ModalProvider from './components/ModalProvider';
import LoginProvider from './components/LoginProvider';
import ThemeProvider from './components/Theme';
import VideoProvider from './components/VideoItem/CustomVideo/VideoProvider';
import DetailVideoProvider from './components/VideoItem/DetailVideoProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <ThemeProvider>
                <ModalProvider>
                    <LoginProvider>
                        <DetailVideoProvider>
                            <VideoProvider>
                                <App />
                            </VideoProvider>
                        </DetailVideoProvider>
                    </LoginProvider>
                </ModalProvider>
            </ThemeProvider>
        </GlobalStyles>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
