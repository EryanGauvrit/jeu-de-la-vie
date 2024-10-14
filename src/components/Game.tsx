/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Pixel from './Pixel';
import { Button } from './ui/button';

const Game = () => {
    const pixelSize = 10;
    const gridX = 1200 / pixelSize;
    const gridY = 700 / pixelSize;
    const [grid, setGrid] = useState<Array<Array<number>>>([]);
    const [play, setPlay] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const createGrid = () => {
        const newGrid = new Array(gridY).fill(0).map(() => new Array(gridX).fill(0));
        setGrid(newGrid);
    };

    const updateGrid = () => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row, x) =>
                row.map((cell, y) => {
                    const neighbors = [
                        [x - 1, y - 1],
                        [x - 1, y],
                        [x - 1, y + 1],
                        [x, y - 1],
                        /* cell */ [x, y + 1],
                        [x + 1, y - 1],
                        [x + 1, y],
                        [x + 1, y + 1],
                    ];

                    const liveNeighbors = neighbors.reduce((acc, [nx, ny]) => {
                        if (nx >= 0 && ny >= 0 && nx < gridY && ny < gridX) {
                            return acc + prevGrid[nx][ny];
                        }
                        return acc;
                    }, 0);

                    if (cell === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
                        return 0;
                    }
                    if (cell === 0 && liveNeighbors === 3) {
                        return 1;
                    }
                    return cell;
                }),
            );
            return newGrid;
        });
    };

    const handleClick = (x: number, y: number) => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    if (rowIndex === x && colIndex === y) {
                        return cell === 1 ? 0 : 1;
                    }
                    return cell;
                }),
            );
            return newGrid;
        });
    };

    const handleMouseDown = (x: number, y: number) => {
        setIsMouseDown(true);
        handleClick(x, y);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseOver = (x: number, y: number) => {
        if (isMouseDown) {
            handleClick(x, y);
        }
    };

    const handleReset = () => {
        setPlay(false);
        createGrid();
    };

    const randomizeGrid = () => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row) => row.map(() => (Math.random() > 0.8 ? 1 : 0)));
            return newGrid;
        });
    };

    const displayPixel = (x: number, y: number) => {
        const filled = grid[x][y] === 1;
        return (
            <Pixel
                key={`${x}-${y}`}
                size={pixelSize}
                fill={filled}
                onMouseDown={() => handleMouseDown(x, y)}
                onMouseOver={() => handleMouseOver(x, y)}
            />
        );
    };

    useEffect(() => {
        createGrid();
    }, []);

    useEffect(() => {
        if (play) {
            const interval = setInterval(updateGrid, 100);
            return () => clearInterval(interval);
        }
    }, [play]);

    return (
        <>
            <div className="flex justify-center gap-3">
                <Button onClick={() => setPlay(!play)} className="uppercase">
                    {play ? 'Stop' : 'Start'}
                </Button>
                <Button onClick={handleReset} variant={'secondary'} className="uppercase">
                    Reset
                </Button>
                <Button onClick={randomizeGrid} variant={'ghost'} className="uppercase">
                    Randomize
                </Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridX}, ${pixelSize}px)` }} onMouseUp={handleMouseUp}>
                {grid.map((row, x) => row.map((_, y) => displayPixel(x, y)))}
            </div>
        </>
    );
};

export default Game;
