import React, { useEffect, useState } from 'react'
import { Copy, Trash } from 'lucide-react';
import { ToastContainer, toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Passwords = () => {
  const [Passwords, setPasswords] = useState([])

  const getpasswords = async () => {
    const get = await fetch("http://localhost:3000")
    const paswords = await get.json()
    setPasswords(paswords)
    console.log('Passwords', Passwords)
  }

  useEffect(() => {
    getpasswords()
  }, [])

  const deletePassword = async (id) => {
    console.log('id', id)
    const c = confirm("Are you sure you want to delete this password? This action cannot be undone.");
    if (c) {
      setPasswords(Passwords.filter(item => item.id !== id));
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

    }
    toast('Password Deleted', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark"
      });
  }
  const copyData = (data) => {
    navigator.clipboard.writeText(data)
    toast('Copyed', {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark"
      });

  }


  return (

    <div className="min-h-[60%] bg-gray-100 flex flex-col items-center py-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="min-h-10 w-[80%] text-center bg-gray-200 flex shadow-md  justify-center  items-center py-10">
        {Passwords.length === 0 && <div className='text-2xl font-bold text-black'>No Passwords</div>}
        {Passwords.length != 0 && <div >
          {Passwords.map((data, index) => {
            return (
              <div key={index} className="p-6 bg-white min-w-96 shadow-xl rounded-xl mb-8 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-indigo-700">{data.sitename}</div>
                  <div>
                    <button onClick={() => { deletePassword() }} className="ml-2 p-1 bg-gray-400 text-black rounded-lg hover:bg-gray-500" >
                      <Trash />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-lg text-gray-700">
                    <div className='flex items-center gap-2'>
                      <span className=" font-medium text-gray-500">Site :</span>
                      <span>{data.site}</span>

                    </div>
                    <div>
                      <button onClick={() => { copyData(data.site) }} className="ml-2 p-1 bg-gray-400 text-black rounded-lg hover:bg-gray-500" >
                        <Copy />
                      </button>

                    </div>
                  </div>
                  <div className="flex justify-between items-center text-lg text-gray-700">
                    <div className='flex items-center gap-2'>
                      <span className=" font-medium text-gray-500">Password :</span>
                      <span>{"*".repeat(data.password.length)}</span>
                    </div>
                    <div>
                      <button onClick={() => { copyData(data.password) }} className="ml-2 p-1 bg-gray-400 text-black text-sm rounded-lg hover:bg-gray-500" >
                        <Copy className='text-3xl' />
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>}
      </div>
    </div>
  )
}

export default Passwords
