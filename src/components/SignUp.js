import React, { useEffect, useState } from 'react'

import * as MdIcons from 'react-icons/md';

import Modal from 'react-modal';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from "@material-tailwind/react";
import OTPform from './OTPform';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/actions/users_actions';
Modal.setAppElement('#root'); // Set the root element for accessibility


const schema = Yup.object({
    firstname: Yup
    .string()
    .required()
    .trim(),
    lastname : Yup
        .string()
        .required()
        .trim(),
        email :  Yup
        .string()
        .required()
        .email()
        .trim(),
        phone  :  Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .trim(),
        province : Yup
        .string()
        .required()
        .trim(),
        nida : Yup
        .string()
        .required()
        .min(20)
        .max(20)
        .trim(),
        password : Yup
        .string()
        .min(8)
        .trim(),
        confirmPassword : Yup
        .string()
        .required()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .trim()
})


 
export function CustomSpinner() {
  return <Spinner className="h-16 w-16 text-blue-800/50" />;
}


export default function SignUp() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showSpinner,setShowSpinner] = useState(false);
  const [btnClicked, setBtnClicked]  =  useState(false);
  const dispatch = useDispatch();

  const new_user =   useSelector(state => state.users);
  // console.log(new_user);
  const constituencies  = useSelector(state  => state.users);
    // console.log(constituencies.constituencies.dataList)


const openModal = () => {
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
};

const  handleSignUp = () => {
  setTimeout(() => {
    if(new_user?.new_user === null){

    }
    else {
      openModal()
    }
  }, 3500);
}

const loginClicked = () => {
  setBtnClicked(true);
  handleSignUp();
  setTimeout(() => {
    setBtnClicked(false);

  }, 3000);
}



    const { register, handleSubmit, reset, formState: { errors, isValid, isDirty, isSubmitSuccessful } } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(schema)
    })

    const onSubmit = data => {
        console.log(data)
        // dispatch(signUpUser(data))

        dispatch(registerUser(data))
        openModal()

    }

    useEffect(() => {
      if(isSubmitSuccessful){
        reset({
          firstname : "",
          lastname : "",
          email : "",
          phone : "",
          nida : "",
          password : "",
          confirmPassword : ""
        })
      }
    })


  return (
    <div className='bg-gray-200'>
<div class="grid min-h-screen place-items-center">
  <div class="w-11/12 p-11 bg-white rounded-lg sm:w-9/12 md:w-1/2 lg:w-5/12">
    <h1 class="text-xl font-semibold">Hello there ?, <span class="font-normal">please fill in your information to continue</span></h1>
    <form class="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div class="flex justify-between gap-3">
        <span class="w-1/2">
          <label for="firstname" class="block text-xs font-semibold text-gray-600 uppercase">Firstname</label>
          <input id="firstname" type="text" name="firstname" placeholder="John" autocomplete="given-name" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.firstname? "border-red-500" : "border-sky-500"}`} 
            defaultValue={""}
            {...register("firstname")}
        />
        <span className="text-red-500 text-sm">{errors.firstname?.message}</span>
        </span>
        <span class="w-1/2">
          <label for="lastname" class="block text-xs font-semibold text-gray-600 uppercase">Lastname</label>
        <input id="lastname" type="text" name="lastname" placeholder="Doe" autocomplete="family-name" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.lastname ? "border-red-500" : "border-sky-500"}`}
        defaultValue={""}
        {...register("lastname")}
        />
         <span className="text-red-500 text-sm">{errors.lastname?.message}</span>
        </span>
      </div>
           <label for="email" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail Address</label>
           <input id="email" type="email" name="email" placeholder="john.doe@company.com" autocomplete="email" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.email?"border-red-500" : "border-sky-500"}`}
             defaultValue={""}
             {...register("email")}
           />
            <span className="text-red-500 text-sm">{errors.email?.message}</span>
        
            <div class="flex justify-between gap-3">
              <span className="w-1/2">
         <label for="telephone" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Telephone</label>
         <input id="telephone" type="tel" name="telephone" placeholder="255710020090" autocomplete="tel" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.phone ? "border-red-500" : "border-sky-500"}`} 
           defaultValue={""}
           {...register("phone")}
         />
          <span className="text-red-500 text-sm">{errors.phone?.message}</span>
              </span>

              <span className="w-1/2">
         <label for="province" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Province</label>
         <select id="province" type="tel" name="telephone" placeholder="255710020090" autocomplete="tel" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.phone ? "border-red-500" : "border-sky-500"}`} 
           defaultValue={""}
           {...register("province")}
         >
                <option value="" disabled>Select province</option>
                {
                  constituencies && constituencies.constituencies &&  constituencies.constituencies.dataList &&(
                    constituencies && constituencies.constituencies &&  constituencies.constituencies.error === false?(
                      constituencies?.constituencies?.dataList.map((item,index) => (
                        <option key={index} value={item.uuid}> {item.constituentName} </option>
                      ))
                    )
                    : 
                    <>
                     <option value="">No data found</option>
                    </>
                  )
                  }
              </select>
          <span className="text-red-500 text-sm">{errors.province?.message}</span>
              </span>
            </div>

          <label for="nida" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Nida</label>
         <input id="nida" type="nida" name="nida" placeholder="19912710-02009-0000-124" autocomplete="nida" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.phone ? "border-red-500" : "border-sky-500"}`} 
           defaultValue={""}
           {...register("nida")}
         />
          <span className="text-red-500 text-sm">{errors.nida?.message}</span>
        
             <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
            <input id="password" type="password" name="password" placeholder="********" autocomplete="new-password" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.password ? "border-red-500" :  "border-sky-500"}`}
              defaultValue={""}
              {...register("password")}
            />
             <span className="text-red-500 text-sm">{errors.password?.message}</span>
         
            <label for="password-confirm" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Confirm password</label>
            <input id="password-confirm" type="password" name="password-confirm" placeholder="********" autocomplete="new-password" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400`} 
              defaultValue={""}
              {...register("confirmPassword")}
            />
             <span className="text-red-500 text-sm">{errors.confirmPassword?.message}</span>
           
             <div class="flex w-full my-1.5">
                <button onClick={loginClicked}  disabled={!isValid || !isDirty}
                  class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                   
                   {
                    btnClicked  &&(
                      <div class="w-12 h-12 border-4 border-white rounded-full loader"></div>
                    )
                   }
                   {
                    !btnClicked && (
                  <div className='bn1' style={{display:'flex'}}>
                    <span class="mr-2 uppercase">Register</span>
                    <span>
                      <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>

                    )
                   }
                  
                </button>
          </div>

        
       
       
    </form>
    <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <OTPform />
              {/* <SignUp /> */}
              <div className="absolute top-6 right-6 bg-red-500 rounded-full">
                <span   onClick={closeModal} className=" text-white text-3xl font-bold cursor-pointer">
                  <MdIcons.MdOutlineCancel  />
                </span>
              </div>
            </Modal>
  </div>
</div>
    </div>
  )
}
