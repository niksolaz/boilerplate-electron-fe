import React from 'react';

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}

const App: React.FC = () => {
    return (
        <div>
            <h1>Electron + React</h1>
        </div>
    );
};

export default App;