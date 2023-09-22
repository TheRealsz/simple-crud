import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'

// gap = distancia entre os elementos


interface FormProps {
    onEdit : null | UserData,
    setOnEdit : Dispatch<SetStateAction<null | UserData>>,
    getUsers : () => void
}

export function Form({ onEdit, setOnEdit, getUsers }: FormProps) {

    const ref = useRef<HTMLFormElement | null>(null);

    // Nao entendi
    useEffect(() => {
        if (onEdit) {
            if (ref.current) {

                ref.current.nome.value = onEdit.nome;
                ref.current.email.value = onEdit.email;
                ref.current.telefone.value = onEdit.tel;
            }

        }
    }, [onEdit]);


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const user: HTMLFormElement | null = ref.current
        const name = user?.nome.value;
        const email = user?.email.value;
        const tel = user?.telefone.value;
        if (
            !name ||
            !email ||
            !tel
        ) {
            return toast.error("Por favor, preencha todos os campos!")
        }

        if (onEdit) {
            try {
                const response = await axios.put("http://localhost:8800/" + onEdit.ID, {
                    nome: name,
                    email: email,
                    tel: tel,
                })
                const { data } = response
                toast.success(data, { style: { backgroundColor: "green", color: "#fff", top: "50px", position: "relative" }})
            } catch (error) {
                toast.error("Erro ao atualizar o usuario", { style: { backgroundColor: "red", color: "#fff", top: "50px", position: "relative" }})
            }
        }
        else {
            try {
                const response = await axios.post("http://localhost:8800/", {
                  nome: name,
                  email: email,
                  tel: tel,
                });
                const { data } = response
                toast.success(data, { style: { backgroundColor: "green", color: "#fff", top: "50px", position: "relative" }})
            }
            // Tentar acessar a mensagem dentro do data para retornar o erro
            catch (error) {
                toast.error("Erro ao cadastrar o usuario", { style: { backgroundColor: "red", color: "#fff", top: "50px", position: "relative" }})
            }
        }

        if (ref.current){
            ref.current.reset()
        }

        setOnEdit(null)
        getUsers()
    }
    return (
        <form className='flex items-end gap-12 flex-wrap bg-slate-800 p-7 shadow-default rounded-md text-slate-50' ref={ref} onSubmit={handleSubmit}>
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
                <input type="tel" name="telefone" className='inputDefault' />
            </div>
            <div className='flex flex-col'>
                <button type='submit' className='bg-sky-700 py-3 px-5 cursor-pointer rounded-md border-none h-10 flex justify-center items-center hover:bg-sky-500 hover:shadow-hover'>Salvar</button>
            </div>
        </form>
    );
}
