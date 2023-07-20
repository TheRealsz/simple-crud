import { useEffect, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'

// gap = distancia entre os elementos


// Como tipar isso corretamente
export function Form({ onEdit, setOnEdit, getUsers }: any) {

    const ref = useRef<HTMLFormElement | null>(null);

    // Nao entendi
    useEffect(() => {
        if (onEdit) {
            const user: any = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.telefone.value = onEdit.telefone;

        }
    }, [onEdit]);


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const user: any = ref.current

        if (
            !user.nome.value ||
            !user.email.value ||
            !user.telefone.value
        ) {
            return toast.error("Por favor, preencha todos os campos!")
        }

        if (onEdit) {
            try {
                const response = await axios.put(`https://localhost:8800/${onEdit.ID}`, {
                    nome: user.nome.value,
                    email: user.email.value,
                    telefone: user.telefone.value,
                })
                const { data } = response
                toast.success(data)
            } catch (data: any) {
                toast.error(data)
            }
        }
        else {
            try {
                const response = await axios.post('https://localhost:8800', {
                    nome: user.nome.value,
                    email: user.email.value,
                    telefone: user.telefone.value,
                })
                const { data } = response
                toast.success(data)
            } catch (data: any) {
                toast.error(data)
            }
        }

        user.name.value = ""
        user.email.value = ""
        user.telefone.value = ""

        setOnEdit(null)
        getUsers()
    }
    return (
        <form className='flex items-end gap-10 flex-wrap bg-slate-800 p-5 shadow-default rounded-md text-slate-50' ref={ref} onSubmit={handleSubmit}>
            <div className='flex flex-col'>
                <label>Nome</label>
                <input type="text" name="nome" className='inputDefault' />
            </div>
            <div className='flex flex-col'>
                <label>Email</label>
                <input type="email" name='email' className='inputDefault' />
            </div>
            <div className='flex flex-col'>
                <label>Telefone</label>
                <input name="telefone" className='inputDefault' />
            </div>
            <div className='flex flex-col'>
                <button type='submit' className='bg-sky-700 py-3 px-5 cursor-pointer rounded-md border-none h-10 flex justify-center items-center hover:bg-sky-500 hover:shadow-hover'>Salvar</button>
            </div>
        </form>
    );
}
