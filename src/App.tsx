import Game from './components/Game';

function App() {
    return (
        <main className="container flex flex-col items-center py-5 gap-10">
            <h1 className="text-3xl uppercase font-bold">Le Jeu de la Vie</h1>
            <Game />
        </main>
    );
}

export default App;
