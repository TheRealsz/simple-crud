import {Dispatch, SetStateAction,} from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { MdModeEdit, MdDelete } from 'react-icons/md'


// Tipando as informações que irao chegar da API e o qual o codigo ira tratar

interface GridProps {
    users: Array<UserData>,
    setUsers : Dispatch<SetStateAction<Array<UserData>>>,
    setOnEdit : Dispatch<SetStateAction<null | UserData>>
}

export function Grid({ users, setUsers, setOnEdit } : GridProps) {

    function handleEdit(item: UserData) {
        setOnEdit(item)
    }

    async function handleDelete(ID : String){
        try {
            const response = await axios.delete("http://localhost:8800/" + ID)
            const { data } = response;
            // Cria um novo array filtrando todos os outros usuarios menos o que foi excluido
            const NewArray = users.filter((user : UserData) => user.ID !== ID)
            setUsers(NewArray);
            toast.success(data, { style: { backgroundColor: "green", color: "#fff", top: "50px", position: "relative" }})

        } catch (data: any) {
            toast.error(data, { style: { backgroundColor: "red", color: "#fff", top: "50px", position: "relative" }})
        }

        setOnEdit(null)
    }
    
    return (
        <table className="w-full bg-slate-800 shadow-default max-w-3xl mx-5 my-auto break-all rounded-md">
            {/* <Toaster /> */}
            <thead>
                <tr className="text-slate-50 border-b border-inset border-slate-500">
                    <th className="text-start pb-1 pr-5">ID</th>
                    <th className="text-start pb-1 pr-5">Nome</th>
                    <th className="text-start pb-1 pr-5">Email</th>
                    <th className="text-start pb-1 pr-5 max-sm:hidden">Telefone</th>
                    <th className="text-start pb-1 pr-5"></th>
                    <th className="text-start pb-1 pr-5"></th>
                </tr>
            </thead>
            <tbody>
                {/* Ira gerar uma linha para cada usuario existente dentro do banco, pegando as informações disponibilizadas e jogando-as dentro
                das cedulas */}
                {users.map ((item: UserData, index: React.Key | null | undefined) => (
                    <tr key={index}>
                        <td className="w-1/4 pt-4 items-start pr-5">{item.ID}</td>
                        <td className="w-1/4 pt-4 items-start pr-5">{item.nome}</td>
                        <td className="w-1/4 pt-4 items-start pr-5">{item.email}</td>
                        <td className="w-1/5 pt-4 items-start pr-5 max-sm:hidden">{item.tel}</td>
                        <td className='w-1/12 pt-4 items-center pr-5'>
                            <MdModeEdit className='hover:text-yellow-400 text-xl' onClick={() => handleEdit(item)}/>
                        </td>
                        <td className='w-1/12 pt-4 items-center'>
                            <MdDelete className='hover:text-red-500 text-xl' onClick={() => handleDelete(item.ID)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
