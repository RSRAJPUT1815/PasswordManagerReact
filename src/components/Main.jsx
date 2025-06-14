import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Eye, Plus, EyeOff } from "lucide-react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Main() {
  const [val, setVal] = useState({ site: "", password: "", sitename: "" });
  const [passShow, setpassShow] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const showpasseye = () => {
    setShowPassword(!showPassword);
    if (passShow === "password") {
      setpassShow("text");
    }
    else {
      setpassShow("password");


    }
  }
  const savepass = async () => {
    if (val.site === "" || val.password === "" || val.sitename === "") {
      // Ask user to fill in all fields
      alert("Please fill in all fields");
      return;
    }


    // setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...val, id: uuidv4() }) })

    console.log("Saved Password:", val);
    setVal({ site: "", password: "", sitename: "" }); // Reset the form 

    // If any such id exists in the db, delete it 
    await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: val.id }) })

  }


  const inputhandoler = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value })
  }

  return (
    <>
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

      <div className="min-h-[80%] bg-gray-100 flex flex-col items-center py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Password Manager</h1>
        <div className="w-full max-w-md bg-gray-200 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <input
              type="text"
              name="sitename"
              id="sitename"
              value={val.sitename}
              onChange={inputhandoler}
              placeholder="Enter website name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

          </div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              name="site"
              id="site"
              value={val.site}
              onChange={inputhandoler}
              placeholder="Enter website URL"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

          </div>
          <div className="flex items-center mb-4">
            <input
              type={passShow}

              name="password"
              value={val.password}
              onChange={inputhandoler}
              id="password"
              placeholder="Enter password"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button onClick={showpasseye} className="ml-2  p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <button onClick={() => savepass()} className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Password
          </button>
        </div>
      </div>
    </>
  )
}

export default Main

