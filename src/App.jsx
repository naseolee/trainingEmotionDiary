import './App.css';
import { useReducer, useRef, createContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

const mockData = [
  {
    id: 1,
    createdDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
]

function reducer(state, action) {
  switch(action.type) {
    case "CREATE": return [action.data, ...state];
    case "UPDATE": 
      return state.map((item) =>  String(item.id) === String(action.data.id) ? action.data : item);
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.data.id));
    default:
      return state;
  }
}

const DiaryStateContext = createContext();
const DiaryDispatchContext = createContext();

// 1. "/" : 모든 일기를 조회하는 Home페이지
// 2. "/new" : 새로 일기를 작성하는 New페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
function App() {
  /*
  const nav = useNavigate();
  const onClickButton = () => {
    nav("/new");
  };
  */
  
  //?
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  // add
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type:"CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      }
    })
  };

  // modify
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type:"UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      }
    })
  };

    // delete
    const onDelete = (id) => {
      dispatch({
        type:"DELETE",
        data: {
          id,
        }
      })
    };

  return (
    <>
      {/*
      <Header title={"Header"}
        leftChild={<Button text={"Left"} />}
        rightChild={<Button text={"Right"} />}
      />

      <Button 
        text={"123"} 
        type={"DEFAULT"} 
        onClick={() =>{
          console.log("123 버튼 클릭!");
        }}
      />

      <Button 
        text={"123"} 
        type={"POSITIVE"} 
        onClick={() =>{
          console.log("123 버튼 클릭!");
        }}
      />

      <Button 
        text={"123"} 
        type={"NEGATIVE"} 
        onClick={() =>{
          console.log("123 버튼 클릭!");
        }}
      />

      Routes밖의 내용은 모든 페이지에 공통사용됨
      <div> { 
        <Link to={"/"}>Home</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/diary"}>Diary</Link>
        <Link to={"/edit"}>Edit</Link>
      </div>
      <button onClick={onClickButton}>New 페이지로 이동</button>
      */}
      <button onClick={() => {
        onCreate(new Date().getTime(), 1, "Hello");
      }}>add</button>

      <button onClick={() => {
        onUpdate(1, new Date().getTime(), 3, "updated");
      }}>update</button>

      <button onClick={() => {
        onDelete(1);
      }}>delete</button>

      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{
          onCreate,
          onUpdate,
          onDelete,
        }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/diary/:id' element={<Diary />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
