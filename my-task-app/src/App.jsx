import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (text === "") return;

    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 表示するタスクだけをフィルターする。tasks 本体は変更しない。
  const visibleTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "undone") return !task.done;
    return true;
  });

  const filterButtonClass = (name) =>
    filter === name
      ? "bg-blue-500 text-white px-3 py-2 rounded-md"
      : "bg-white border border-gray-400 px-3 py-2 rounded-md hover:bg-gray-50";

  return (
    <main className="max-w-2xl mx-auto p-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">タスク管理</h1>

      <form onSubmit={addTask} className="flex gap-3 mb-6">
        <input
          className="border border-gray-500 rounded-md px-4 py-3 flex-1 min-w-0 text-lg text-white"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="新しいタスクを入力..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 text-lg"
        >
          追加
        </button>
      </form>

      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={filterButtonClass("all")}
        >
          すべて
        </button>
        <button
          type="button"
          onClick={() => setFilter("undone")}
          className={filterButtonClass("undone")}
        >
          未完了
        </button>
        <button
          type="button"
          onClick={() => setFilter("done")}
          className={filterButtonClass("done")}
        >
          完了済み
        </button>
      </div>

      <ul className="space-y-3">
        {visibleTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4"
          >
            <span
              role="button"
              tabIndex={0}
              aria-pressed={task.done}
              onClick={() => toggleTask(task.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleTask(task.id);
                }
              }}
              className={`flex-1 cursor-pointer text-lg ${task.done ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
            {!task.done && (
              <button
                type="button"
                className="text-green-600 hover:text-green-700 text-base"
                onClick={() => toggleTask(task.id)}
              >
                完了
              </button>
            )}
            <button
              type="button"
              className="text-red-400 hover:text-red-600 text-base"
              onClick={() => deleteTask(task.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      {visibleTasks.length === 0 && (
        <p className="text-center text-gray-400 mt-8">
          {tasks.length === 0
            ? "タスクがありません"
            : filter === "done"
              ? "完了済みのタスクがありません"
              : filter === "undone"
                ? "未完了のタスクがありません"
                : "表示するタスクがありません"}
        </p>
      )}
    </main>
  );
}

export default App;