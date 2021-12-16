import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

const ProgressBarComponent = () => {
    const [count, setCount] = useState(0);

    const animate = () => {
        setInterval(() => {
            setCount((count) => count + 1);
        }, 500);
    };

    return (
        <div>
            <ProgressBar animated now={count} />
            <Button onClick={() => animate()} variant="primary">
                Primary
            </Button>{" "}
        </div>
    );
};

export default ProgressBarComponent;
