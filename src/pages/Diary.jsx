import { useParams } from "react-router-dom"; // for parameter
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";

const Diary = () => {
    const params = useParams();
    const nav = useNavigate();
    const curDiaryItem = useDiary(params.id);
    
    if (!curDiaryItem) {
        return <div>"데이터 로딩중...!"</div>;
    }
    
    const { createdDate, emotionId, content } = curDiaryItem;
    const title = getStringedDate(new Date(createdDate));

    return (
        <div>
            <Header 
                title={`${title} 기록`}
                leftChild={<Button text={"<뒤로가기"} onClick={() => nav('/', {replace:true})} />}
                rightChild={<Button text={"수정하기"} onClick={() => nav(`/edit/${params.id}`)}/>}
            />
            <Viewer emotionId={emotionId} content={content} />
        </div>

    );
};

export default Diary;