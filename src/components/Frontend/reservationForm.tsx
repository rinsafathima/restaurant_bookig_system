import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import Calendar from 'react-calendar';
import axios from 'axios';
import { Toaster, toast } from 'sonner'

type FormValues = {
	date: Date;
	time: string;
	numPersons: string;
	name: string;
	lastName: string;
	email: string;
	phone: string;
};

function ReservationForm() {
	const [date, setDate] = useState<Date | null>(null);
	const [showPersonalInfo, setShowPersonalInfo] = useState(false);
	const [showForm, setShowForm] = useState(true);
	const [selectedTime, setSelectedTime] = useState('');
	const [selectedNumPersonas, setSelectedNumPersonas] = useState('');
	const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = async data => {
		try {
			await axios.post('/api/reservation/post', data);
			toast.success(`Reservation created for the ${date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${selectedTime} for ${selectedNumPersonas} people`, {
				duration: Infinity,
			});
			reset();
			setDate(null);
			setSelectedTime('');
			setSelectedNumPersonas('');
			setShowPersonalInfo(false);
			setShowForm(true);

		} catch (error) {

			toast.error('Error when creating the reservation');
		}
	};

	const handleDateChange = (value: Date | Date[]) => {
		if (value instanceof Date) {
			setDate(value);
			setValue('date', value.toLocaleDateString('en-CA', { timeZone: 'America/New_York' }) as any);
		}
	};

	const handleContinue = () => {
		setShowPersonalInfo(true);
		setShowForm(false);
	};

	const handleBack = () => {
		setShowPersonalInfo(false);
		setShowForm(true);
	};

	const getAvailableHours = () => {
		const currentHour = new Date().getHours() + 1;
		const availableHours = Array.from({ length: 12 }, (_, i) => i + 12).filter(hour => hour > currentHour);
		return availableHours;
	};

	return (
		<div className="mt-12 mb-14">
			<Toaster richColors closeButton position="top-right" />
			{showForm && (
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row justify-center items-center transition">
					<div className="md:mr-10">
						<Calendar
							onChange={handleDateChange as any}
							value={date}
							locale="en-US"
							minDate={new Date()}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="time" className="mb-1 text font-medium text-gray-500">Time:</label>
						<select {...register('time')} id="time"
							className="mb-2 bg-gray-100 border border-gray-300 text-gray-500 text rounded-lg focus:ring-green-500 focus:border-green-500 w-96 md:w-64 p-2.5" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
							<option value="">Select</option>
							{getAvailableHours().map(hour => (
								<option key={hour} value={`${hour}:00`}>
									{`${hour}:00`}
								</option>
							))}
						</select>

						<label htmlFor="numPersons" className="mb-1 text font-medium text-gray-500">Number of People:</label>
						<select {...register('numPersons')} id="numPersons"
							className="mb-2 bg-gray-100 border border-gray-300 text-gray-500 text rounded-lg focus:ring-green-500 focus:border-green-500 w-96 md:w-64 p-2.5" value={selectedNumPersonas} onChange={(e) => setSelectedNumPersonas(e.target.value)}>
							<option value="">Select</option>
							{Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
								<option key={num} value={num}>
									{num}
								</option>
							))}
						</select>

						{!showPersonalInfo && (
							<button
								type="button"
								onClick={handleContinue}
								className={`mt-3 py-3 rounded text-center transition font-medium ${!date || !selectedTime || !selectedNumPersonas
									? "bg-gray-500 text-white cursor-not-allowed"
									: "bg-green-500 text-white"
									}`}
								disabled={!date || !selectedTime || !selectedNumPersonas}>
								Continue
							</button>
						)}
					</div>
				</form>
			)}

			{!showForm && (
				<form onSubmit={handleSubmit(onSubmit)} className='md:my-20 xl:mx-80 md:mx-36 sm:mx-20 mx-10'>
					<div className="grid gap-6 mb-6 md:grid-cols-2">
						<div>
							<label htmlFor="name" className='block mb-2 font-medium text-gray-500'>Your Name:</label>
							<input  {...register('name', { required: true })} id="name" placeholder='Nombre' className='bg-gray-100 border text-gray-500 text rounded-lg block w-full p-2.5 focus:ring-green-500 focus:border-green-500' />
							{errors.name && <p className='text-red-500 font-medium'>This field is required</p>}
						</div>

						<div>
							<label htmlFor="lastName" className='block mb-2 font-medium text-gray-500'>Last Name:</label>
							<input {...register('lastName', { required: true })} id="lastName" placeholder='Apellido' className='bg-gray-100 border text-gray-500 text rounded-lg block w-full p-2.5 focus:ring-green-500 focus:border-green-500' />
							{errors.lastName && <p className='text-red-500 font-medium'>This field is required</p>}
						</div>
					</div>

					<div className="mb-6">
						<label htmlFor="email" className='block mb-2 font-medium text-gray-500'>Your Email:</label>
						<input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder='example@gmail.com' className='bg-gray-100 border text-gray-500 text rounded-lg block w-full p-2.5 focus:ring-green-500 focus:border-green-500' id="email" type="email" />
						{errors.email && <p className='text-red-500 font-medium'>Please enter a valid email address</p>}

					</div>

					<div className="mb-6">
						<label htmlFor="phone" className='block mb-2 font-medium text-gray-500'>Phone Number:</label>
						<input {...register('phone', { required: true, pattern: /^[0-9]{9}$/ })} placeholder='Teléfono' className='bg-gray-100 border text-gray-500 text rounded-lg block w-full p-2.5 focus:ring-green-500 focus:border-green-500' id="phone" type="tel" />
						{errors.phone && <p className='text-red-500 font-medium'>Please enter a valid 10-digit phone number</p>}
					</div>

					<button type="submit" className='rounded-lg bg-green-500 transition hover:bg-green-600 px-5 p-2.5 text font-medium text-white mr-2'>To reserve</button>

					<button type="button" className='rounded-lg bg-red-500 transition hover:bg-red-600 px-5 p-2.5 text font-medium text-white' onClick={handleBack}>To return</button>
				</form>
			)}
		</div>
	);
}

export default ReservationForm;