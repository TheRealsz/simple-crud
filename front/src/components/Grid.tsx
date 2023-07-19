import react from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { MdModeEdit, MdDelete } from 'react-icons/md'

// Tipando as informações que irao chegar da API e o qual o codigo ira tratar
type Users = {
    id: String;
    nome: String;
    email: String;
    telefone: String;
}

export function Grid({ users } : any) {

    function handleDelete(){

    }

    const successToast = () => toast.success("Teste", { style: { backgroundColor: "green", color: "#fff", top: "50px", position: "relative" }, });
    return (
        <table className="w-full bg-slate-800 p-5 shadow-default max-w-3xl mx-5 my-auto break-all">
            {/* <Toaster /> */}
            <thead>
                <tr className="text-slate-50 border-b border-inset border-slate-500">
                    <th className="text-start pb-1">ID</th>
                    <th className="text-start pb-1">Nome</th>
                    <th className="text-start pb-1">Email</th>
                    <th className="text-start pb-1 max-sm:hidden">Telefone</th>
                    <th className="text-start pb-1"></th>
                    <th className="text-start pb-1"></th>
                </tr>
            </thead>
            <tbody>
                {/* Ira gerar uma linha para cada usuario existente dentro do banco, pegando as informações disponibilizadas e jogando-as dentro
                das cedulas */}
                {users.map ((item: Users, index: React.Key | null | undefined) => (
                    <tr key={index}>
                        <td className="w-1/4 pt-4 items-start">{item.id}</td>
                        <td className="w-1/4 pt-4 items-start">{item.nome}</td>
                        <td className="w-1/4 pt-4 items-start">{item.email}</td>
                        <td className="w-1/5 pt-4 items-start max-sm:hidden">{item.telefone}</td>
                        <td className='w-1/12 pt-4 items-center'>
                            <MdModeEdit className='hover:text-yellow-400'/>
                        </td>
                        <td className='w-1/12 pt-4 items-center'>
                            <MdDelete className='hover:text-red-500' onClick={() => handleDelete()}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
