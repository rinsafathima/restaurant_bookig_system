import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Toaster, toast } from 'sonner'

type FormData = {
    name: string;
    email: string;
    contactReason: string;
    message: string;
    privacyPolicy: boolean;
};

const ContactForm: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post('/api/sendEmail', data);
            if (response.status === 200) {
                toast.success('Email sent successfully');
                reset();
            } else {
                toast.error('Error sending email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Error sending email');
        }
        console.log(data);
    };

    return (
        <>
            <Toaster closeButton richColors position="top-right" />
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-3">
                        <label htmlFor="name">Name:</label>
                        <input className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300" id="name" {...register("name", { required: "Este campo es obligatorio" })} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email">Email:</label>
                        <input className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300" id="email" type="email" {...register("email", { required: "Este campo es obligatorio" })} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="contactReason">Contact Reason:</label>
                    <select className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                        id="contactReason" {...register("contactReason", { required: "This field is required" })}>
                        <option value="">Select a reason</option>
                        <option value="reserva">Reservation</option>
                        <option value="consulta">Inquiry</option>
                        <option value="sugerencia">Suggestion</option>
                        <option value="reclamacion">Complaint</option>
                        <option value="katering">Catering</option>
                        <option value="otros">Others</option>
                    </select>
                    {errors.contactReason && <p className="text-red-500 text-sm">{errors.contactReason.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                        id="message"
                        rows={4}
                        {...register("message")}></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="privacyPolicy">
                        <input
                            className="mr-2"
                            id="privacyPolicy"
                            type="checkbox" {...register("privacyPolicy", { required: "You must accept the data protection policy" })} />
                         I have read and accept the website's data protection policy
                    </label>
                    {errors.privacyPolicy && <p className="text-red-500 text-sm">{errors.privacyPolicy.message}</p>}
                </div>

                <div className="mb-3">
                    <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        type="submit">Send
                    </button>
                </div>
            </form>
        </>
    );
};

export default ContactForm;
