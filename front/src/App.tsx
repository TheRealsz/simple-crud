import { useState } from "react";
import { Form } from "./components/Form";
import { Grid } from "./components/Grid"
import axios from "axios"

// Colocar toaster
// Tirar os any

function App() {
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  return (
    <div className="w-full max-w-3xl mt-5 flex flex-col items-center gap-3 text-slate-50">
      <h1 className="text-3xl">Usuarios</h1>
      <Form />
      <Grid />
    </div>
  );
}

export default App;
