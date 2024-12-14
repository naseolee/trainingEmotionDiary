import Button from "./Button";
import "./Editor.css"
import EmotionItem from "./EmotionItem";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEmotionList } from "../util/constants"

const getStringedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    if(month < 10) {
        month = `0${month}`;
    }

    if(date < 10) {
        date = `0${date}`;
    }

    return `${year}-${month}-${date}`;

}

const Editor = ({ initData, onSubmit }) => {
    const [input, setInput] = useState({
        createdDate : new Date(),
        emotionId: 3,
        content: "",
    });

    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                createdDate: new Date(Number(initData.createdDate))
            })
        }
    }, [initData]);

    const nav = useNavigate();

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if(name === "createdDate") {
            value = new Date(value);
        }
        setInput({
            ...input,
            [name]: value,
        });
    }

    const onCLickSubmitButton = () => {
        onSubmit(input);
    };

    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input 
                    name="createdDate" 
                    onChange={onChangeInput}
                    value={getStringedDate(input.createdDate)}
                    type="date" />
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {getEmotionList.map((item) => <EmotionItem 
                    onClick={() => onChangeInput({
                        target: {
                            name: "emotionId",
                            value: item.emotionId,
                        }
                    })}
                    key={item.emotionId} {...item} isSelected={item.emotionId === input.emotionId ? true : false}/>)}
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea 
                name="content"
                value={input.content}
                onChange={onChangeInput}
                placeholder="오늘은 어땠나요?"></textarea>
            </section>
            <section className="button_section">
                <Button onClick={() => nav(-1)} text={"취소하기"} />
                <Button onClick={onCLickSubmitButton} text={"작성완료"} type={"POSITIVE"} />
            </section>
        </div>
    );
}

export default Editor;1