'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, string } from 'zod';

const obj = {
    name: '',
    email: '',
    website: '',
    country: ''
}

const countries = [
    { value: 'United States', label: 'United States' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'France', label: 'France' },
    { value: 'Scotland', label: 'Scotland' },
    { value: 'Ireland', label: 'Ireland' }
];

const schema = z.object({
    name: string().min(1),
    email: string().email({ message: 'Please enter a valid email address.' }),
    website: string().url({ message: 'Please enter a valid website URL.' }),
    country: string().min(1, { message: 'Please select a country from the list.' })
})

export default function Form() {
    const { register, control, reset, handleSubmit, formState } = useForm({ 
        // defaultValues: obj, 
        resolver: zodResolver(schema) 
    });
    const { errors } = formState;

    function handleSave(formValues) {
        console.log({ formValues });
    }

    function handleReset(event) {
        event.preventDefault();            
        reset();
    }

    return (
      <form className="form" onSubmit={handleSubmit(handleSave)}>
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input {...register('name')} className={`form-control ${errors.name && 'invalid'}`} />
                <div className="form-error">
                    {errors.name?.message}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input {...register('email')} className={`form-control ${errors.email && 'invalid'}`} />
                <div className="form-error">
                    {errors.email?.message}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="website">Website</label>
                <input {...register('website')} className={`form-control ${errors.website && 'invalid'}`} />
                <div className="form-error">
                    {errors.website?.message}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="website">Country</label>
                <select
                    {...register('country')}
                    className={`form-control ${errors.country && 'invalid'}`}>
                    <option value="">-- Select a Country --</option>
                    {countries.map((country) => <option value={country.value} key={country.value}>{country.label}</option>)}
                </select>
                <div className="form-error">
                    {errors.country?.message}
                </div>
            </div>
        </div>
        <div className="form-row row-btns">
            <div className="form-group group-btns">
                    <button 
                        onClick={handleReset}
                        className="btn btn-cancel">Cancel</button>
                    <button type="submit" className="btn btn-save">Save</button>
                </div>
            </div>
      </form>
    )
  }
  