import { useRef,useState } from "react";
const ProfilePage = () => {
    const imageref=useRef();
    const [user,setUser]=useState(null);
const [imageurl,setImageUrl]=useState(null);
const [imagefile,setImageFile]=useState(null);
const handleText=(e)=>{
setUser(prev => ({...prev,[e.target.name]:e.target.value}));
}
const handleImage=(e)=>{
    console.log(e.target.files)
    console.log(e.target.files[0])
    const file=e.target.files[0];
    setImageFile(file);
    const reader=new FileReader();
    reader.onloadend=()=>{
        setImageUrl(reader.result);
    }
    reader.readAsDataURL(file);
}
const handleSubmit=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('file',imagefile);
    formData.append('name',user.name);
    formData.append('email',user.email);
    formData.append('phone',user.phone);
    console.log(formData);
    try {
        const response=fetch('http://localhost:3000/api/user/updateprofile',{
            method:'POST',
            credentials:'include',
         
            body:formData
        })
        if(response.ok){
            console.log(response.json());
        }
    } catch (error) {
        console.log(error);
    }
}


    return (
        <div className="max-w-lg mx-auto p-3 w-full">
           <h1 className="my-7 text-center font-semibold text-[30px]" >Profile</h1>
 
              <form action="" className="flex flex-col gap-3" onSubmit={(event)=>handleSubmit(event)}  >
                <input  type="file"  onChange={(event)=>handleImage(event)} className="hidden" ref={imageref} />
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>imageref.current.click()}>
                    <img className="rounded-full w-full h-full object-cover border-8 border-[lightgray]" src={imageurl || "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"} alt="" />
                </div>
                <div className="flex flex-col items-center gap-6 mt-10">
                <input type="text" name="name" onChange={(event)=>handleText(event)} placeholder="Name"  className="lg:w-96 md:w-64 border border-gray-300 rounded-md p-2" />
                <input type="text" name="email" onChange={(event)=>handleText(event)} placeholder="Email" className="lg:w-96 md:w-64 border border-gray-300 rounded-md p-2" />
                <input type="text" name="phone" onChange={(event)=>handleText(event)} placeholder="Phone" className="lg:w-96 md:w-64 border border-gray-300 rounded-md p-2" />
                <div className=" flex justify-between lg:w-96 md:w-64 gap-3">
                <input type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md"  />

                <input type="reset" className="bg-blue-500 text-white py-2 px-4 rounded-md"  />
                </div>
                </div>

              </form>
            
        </div>
    );
};
export default ProfilePage;