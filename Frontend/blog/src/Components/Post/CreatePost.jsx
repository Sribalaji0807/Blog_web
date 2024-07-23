import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextInput,Select,FileInput,Button } from 'flowbite-react'
export default function CreatePost() {
  return (
<div className='p-3 max-w-3xl min-h-screen mx-auto'>
    <h1 className='text-center text-3xl my-7 font-semibold' >Create a post</h1>
<form className='flex flex-col gap-4'>
<div className='flex flex-col gap-4 sm:flex-row justify-between'>
    <TextInput placeholder='title' type='text' required id='title' className='flex-1' />
<Select>
    <option value="uncategorized">Select a Category</option>
    <option value="Javascript">Javascript</option>
    <option value="React.js">React.js</option>
    <option value="Node.js">Node.js</option>
</Select>
</div>
<div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
<FileInput type='file' accept='image/*' />
<Button type="button" gradientDuoTone="purpleToBlue" size='sm' outline>Upload image</Button>
</div>
<ReactQuill theme="snow" placeholder="Write Something .." className="h-72 mb-12" required/>
<Button gradientDuoTone="purpleToPink" type='submit' >Publish</Button>
</form>
</div>
)
}
