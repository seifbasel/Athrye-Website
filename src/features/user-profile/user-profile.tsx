// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// interface ProfileFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// const ProfilePage = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>();

//   const onSubmit = (data: ProfileFormData) => {
//     console.log('Form data:', data);
//     // Here you would typically send the data to your backend
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-text-dark dark:text-text mb-8">Profile Settings</h1>
      
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-text-dark dark:text-text">
//               First Name
//             </label>
//             <Input
//               {...register("firstName", { required: "First name is required" })}
//               className="w-full"
//               placeholder="John"
//             />
//             {errors.firstName && (
//               <p className="text-red-500 text-sm">{errors.firstName.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium text-text-dark dark:text-text">
//               Last Name
//             </label>
//             <Input
//               {...register("lastName", { required: "Last name is required" })}
//               className="w-full"
//               placeholder="Doe"
//             />
//             {errors.lastName && (
//               <p className="text-red-500 text-sm">{errors.lastName.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium text-text-dark dark:text-text">
//               Email
//             </label>
//             <Input
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Invalid email address"
//                 }
//               })}
//               type="email"
//               className="w-full"
//               placeholder="john@example.com"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium text-text-dark dark:text-text">
//               Phone
//             </label>
//             <Input
//               {...register("phone")}
//               type="tel"
//               className="w-full"
//               placeholder="+1 234 567 8900"
//             />
//           </div>

//           <div className="space-y-2 md:col-span-2">
//             <label className="text-sm font-medium text-text-dark dark:text-text">
//               Address
//             </label>
//             <Input
//               {...register("address")}
//               className="w-full"
//               placeholder="123 Main St"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium text-text-dark dark:text-text">
//               City
//             </label>
//             <Input
//               {...register("city")}
//               className="w-full"
//               placeholder="New York"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium text-text-dark dark:text-text">
//               Country
//             </label>
//             <Input
//               {...register("country")}
//               className="w-full"
//               placeholder="United States"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium text-text-dark dark:text-text">
//               Postal Code
//             </label>
//             <Input
//               {...register("postalCode")}
//               className="w-full"
//               placeholder="10001"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end space-x-4 pt-6">
//           <Button
//             type="button"
//             variant="outline"
//             className="w-24"
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             className="w-24"
//           >
//             Save
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;