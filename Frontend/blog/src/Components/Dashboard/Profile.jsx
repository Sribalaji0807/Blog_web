import { useSelector } from "react-redux"
import { TextInput,Button } from "flowbite-react"
const Profile = () => {
    const {currentUser}=useSelector((state)=> state.user)
  return (
<>
<div className="max-w-lg mx-auto p-3 w-full">
    <h1 className="my-7 text-center font-semibold text-[30px]" >Profile</h1>
    <form className="flex flex-col gap-3">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" >
        <img className="rounded-full w-full h-full object-cover border-8 border-[lightgray]" src={currentUser.profilepicture} alt="" />
        </div>
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} />
        <TextInput type="text" id="email" placeholder="email" defaultValue={currentUser.email} />
<Button gradientDuoTone="purpleToPink">
    Update
</Button>
    </form>
    <div className="text-red-500 flex justify-between">
        <span  className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
    </div>
</div>
</>
)
}

export default Profile