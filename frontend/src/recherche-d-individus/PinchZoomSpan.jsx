import {useEffect, useRef} from "react";
import { create } from 'pinch-zoom-pan';
import classNames from 'classnames';

export const PinchZoomPan = ({ min, max, captureWheel, className, style, children }) => {
    const root = useRef(null);

    useEffect(() => {
        const element = root.current;
        if (!element) return;
        return create({ element, minZoom: min, maxZoom: max, captureWheel });
    }, [min, max, captureWheel]);

    return (
        <div ref={root} className={classNames(className, "root")} style={style}>
            <div className="point">
                <div className="canvas">
                    {children}
                </div>
            </div>
        </div>
    );
}