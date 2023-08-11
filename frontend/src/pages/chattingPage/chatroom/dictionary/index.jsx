import { useState } from 'react';

import * as S from './style';

import ChatPageSearch from 'components/searchInput/chatpagesearch';

export default function Dictionary({ props: { dictionaryClicked } }) {
    const [input, setInput] = useState("");

    const onChangeInput = (e) => {
        setInput(e.target.value);
    }

    return (
        <S.Section dictionaryClicked={dictionaryClicked}>
            <S.SectionHeader>
                <h3>Dictionary</h3>
                <ChatPageSearch props={{ id: 'dictionaryInput', placeholder: '검색할 단어 입력', onChangeInput, input }} />
            </S.SectionHeader>
        </S.Section>
    )
}