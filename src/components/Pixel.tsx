import { cn } from '@/lib/utils';

const Pixel = ({
    size,
    fill,
    onMouseDown,
    onMouseOver,
}: {
    size?: number;
    fill?: boolean;
    onMouseDown: () => void;
    onMouseOver: () => void;
}) => {
    return (
        <div
            className={cn('w-2 h-2 bg-foreground border cursor-pointer', fill ? 'bg-foreground' : 'bg-background')}
            style={{ width: size, height: size }}
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
        ></div>
    );
};

export default Pixel;
