import { useEffect, useState } from "react";
import { Form } from "./components/Form";
import { Grid } from "./components/Grid"
import axios from "axios"
import toast, { Toast, Toaster } from "react-hot-toast"

// Colocar toaster
// Tirar os any

type User = {
  nome: String;
}

function App() {
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  async function getUsers() {
    try {
      const response = await axios.get("http://localhost:8800")
      // Ordem alfabetica
      setUsers(response.data.sort((a: User, b: User) => (a.nome > b.nome ? 1 : -1)))
    } catch (error) {
      toast.error("Algo deu errado, tente novamente!")
      console.log(error)
    }
  }

  // Toda vez que ouver alteração no setUsers, sera chamado o getUsers (praticamente um looping)
  useEffect(() => {
      getUsers();
    }, [setUsers] 
  )

  return (
    <div className="w-full max-w-3xl mt-5 flex flex-col items-center gap-4 text-slate-50">
      <Toaster />
      <h1 className="text-3xl">Usuarios</h1>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
    </div>
  );
}

export default App;
