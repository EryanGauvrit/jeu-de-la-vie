import { Analytics } from '@vercel/analytics/react';
import logo from './assets/logo.png';
import Game from './components/Game';

function App() {
    return (
        <main className="container flex flex-col items-center py-5 gap-10">
            <div className="flex items-center gap-5">
                <img src={logo} alt="Pixel Game Life Logo" className="w-10 h-10" />
                <h1 className="text-3xl uppercase font-bold text-amber-500">Pixel Game Life</h1>
            </div>
            <Game />
            <Analytics />
        </main>
    );
}

export default App;
