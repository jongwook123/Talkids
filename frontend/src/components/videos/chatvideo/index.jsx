import { useEffect, useRef, useState } from 'react';
import * as S from './style';

const ChatVideo = ({ stream, muted, translated, translateOn }) => {
    const ref = useRef(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (ref.current) {
            ref.current.srcObject = stream;
        }

        if (muted) {
            setIsMuted(muted);
        }
    }, [stream, muted]);

    console.log(translated, translateOn);

    return (
        <S.VideoWrapper>
            <video ref={ref} muted={isMuted} autoPlay />
            {
                translateOn && translated && <S.Translated visible={translated}>{translated}</S.Translated>
            }
        </S.VideoWrapper>
    );
};

export default ChatVideo;
