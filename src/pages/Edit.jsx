import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Button from "../components/Button"
import Editor from "../components/Editor";
import { DiaryDispatchContext } from "../App"
import useDiary from "../hooks/useDiary";


const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
    const curDiaryItem = useDiary(params.id);

    const onCLickDelete = (id) => {
        if (window.confirm("일기를 정말 삭제할까요? 복구되지 않아요!")) {
            onDelete(id);
            nav('/', {replace:true});
        }
    }

    const onSubmit = (input) => {
        if(window.confirm("일기를 정말로 수정할까요?")) {
            onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
            nav('/', {replace:true});
        }
    }
    
    return (
        <div>
            <Header
                title={"일기 수정하기"}
                leftChild={<Button text={"뒤로가기"} onClick={() => nav(-1)}/>}
                rightChild={<Button 
                    text={"삭제하기"} 
                    type={"NEGATIVE"} 
                    onClick={() => onCLickDelete(params.id)}/>}
            />
            <Editor initData={curDiaryItem} onSubmit={onSubmit}/>
        </div>
    );
};

export default Edit;