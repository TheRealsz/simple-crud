import { useRef } from 'react';

// gap = distancia entre os elementos

export function Form({ onEdit }: any) {

    const ref = useRef<HTMLFormElement | null>(null);

    return (
        <form className='flex items-end gap-10 flex-wrap bg-slate-800 p-5 shadow-default rounded-md text-slate-50' ref={ref}>
            <div className='flex flex-col'>
                <label>Nome</label>
                <input type="text" name="nome" className='inputDefault'/>
            </div>
            <div className='flex flex-col'>
                <label>Email</label>
                <input type="email" name='email' className='inputDefault'/>
            </div>
            <div className='flex flex-col'>
                <label>Telefone</label>
                <input name="fone" className='inputDefault'/>
            </div>
            <div className='flex flex-col'>
                <button type='submit' className='bg-sky-700 py-3 px-5 cursor-pointer rounded-md border-none h-10 flex justify-center items-center hover:bg-sky-500 hover:shadow-hover'>Salvar</button>
            </div>
        </form>
    );
}
