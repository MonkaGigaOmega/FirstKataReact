import FooterFilter from './FooterFilter'

function Footer({ tasks, setTasks, term, setTerm }) {
  const completedCount = tasks.filter((task) => !task.isCompleted).length

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.isCompleted))
  }

  return (
    <footer className="footer">
      <span className="todo-count">{`${completedCount} items left`}</span>
      <FooterFilter term={term} setTerm={setTerm} />
      <button type="button" className="clear-completed" onClick={handleClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
