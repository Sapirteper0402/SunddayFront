// import routes from '../routes'
import { NavLink, useParams } from "react-router-dom";
import { svgService } from "../svg.service";
import { useEffect, useRef } from "react";
import { useForm } from "../customHooks/useForm";

export function AddBoardModal({ onAddBoard , handleCloseModal}) {

  const [boardTitle, setBoardTitle,handleChange] = useForm({title: ''})
  const modalRef = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleCloseModal]);


  function handleCreateBoard(e){
    e.preventDefault();
    onAddBoard(boardTitle.title); 
    handleCloseModal();
  };

  return (
    <section ref={modalRef} className="add-board-modal">
      <button className="close" onClick={handleCloseModal}>
       <section className='btn-hover-svg'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </section>
      </button>
      <section className="content">
        <h1>Create Board</h1>
        <form className="add-board" onSubmit={handleCreateBoard}>
          <label>Board name</label>
          <input type="text" 
                  name="title" 
                  value={boardTitle.title} 
                  onChange={handleChange}/>
          <section className="form-actions">
              <button onClick={handleCloseModal}>Cancel</button>
              <button type="submit" onClick={handleCreateBoard}>Create Board</button>
          </section>
        </form>
      </section>
    </section>
  );
}
