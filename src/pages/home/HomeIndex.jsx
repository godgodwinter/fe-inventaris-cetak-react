import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../stores/counterSlice";

const notify = () =>
  toast("Good Job!", {
    icon: "👏",
  });

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  return (
    <div>
      <p>Counter Value: {count}</p>
      <button className="btn btn-success" onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
};

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="gap-2 space-y-2">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <button className="btn btn-sm btn-info" onClick={notify}>
          Make me a toast
        </button>
        <Toaster position="top-right" reverseOrder={false} />
        <div>
          <Counter />
        </div>
      </div>
    </>
  );
}

export default App;
