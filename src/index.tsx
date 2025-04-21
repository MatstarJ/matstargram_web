import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // StrictMode는 개발 모드에서 컴포넌트를 두 번 렌더링하여 디버깅에 도움을 줍니다.
  // 하지만 Keycloak과 같은 외부 라이브러리와 함께 사용할 때 문제가 발생할 수 있습니다.
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
