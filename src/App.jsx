import './App.css';
import { useReducer, useRef, createContext, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

function reducer(state, action) {
  // web storage
  let nextState;
  switch(action.type) {
    case "INIT": 
    {
      return action.data;
    }
    case "CREATE": 
    {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": 
    {
      nextState = state.map((item) =>  String(item.id) === String(action.data.id) ? action.data : item);
      break;
    }
    case "DELETE":
    {
      nextState = state.filter((item) => String(item.id) !== String(action.data.id));
      break;
    }
    default:
      return state;
    }

    localStorage.setItem("diary", JSON.stringify(nextState));
    return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

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
  
  // loading(init)
  const [isLoading, setIsLoading] = useState(true);
  // datas
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }
    
    const parseData = JSON.parse(storedData);
    if (!Array.isArray(parseData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parseData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId + 1;
    
    dispatch({
      type:"INIT",
      data: parseData,
    });
    setIsLoading(false);
  }, [])

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

  if (isLoading) {
    return <div>데이터 로딩중입니다 ...</div>
  }

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
      {/* 테스트용 
      <button onClick={() => {
        onCreate(new Date().getTime(), 1, "Hello");
      }}>add</button>

      <button onClick={() => {
        onUpdate(1, new Date().getTime(), 3, "updated");
      }}>update</button>

      <button onClick={() => {
        onDelete(1);
      }}>delete</button>
      */}
      
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
