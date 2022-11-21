import { useDispatch } from '@/hooks/useDispatch';
import { addStudent, editStudent, getStudent, Student } from '@/sevice/student';
import { updateDialogAction } from '@/store/dialog.slice';
import { updateSnackbarAction } from '@/store/snackbar.slice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { FormEvent, useState } from 'react';
import Spinner from '../common/Spinner';

type StudentFormProp = {
  id?: number;
  setPage?: (id: number) => void;
  page: number;
};

type StudentKey = keyof Omit<Student, 'id'>;

const initStudent: Omit<Student, 'id'> = {
  address: '',
  email: '',
  name: '',
  phone: '',
  region: '',
};

function StudentForm({ id, setPage, page }: StudentFormProp) {
  const [student, setStudent] = useState<Omit<Student, 'id'>>(initStudent);

  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation({
    mutationFn: (student: Omit<Student, 'id'>) =>
      id ? editStudent(id, student) : addStudent(student),
    onSuccess: (_, __, context) => {
      console.log('context: ', context);
      console.log('run');
      dispatch(
        updateSnackbarAction({
          message: 'success',
          messageType: 'success',
          show: true,
        })
      );
      dispatch(updateDialogAction({ show: false }));
      queryClient.invalidateQueries({
        queryKey: ['students'],
      });
      if (!id && setPage) setPage(1);
    },
  });

  const { isFetching } = useQuery({
    queryKey: ['student', { id }],
    queryFn: () => getStudent(id as number),
    enabled: !!id,
    onSuccess: ({ id, ...rest }) => setStudent(rest),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(student);
  };

  const handleChange =
    (key: StudentKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setStudent({ ...student, [key]: e.target.value });
    };

  return (
    <form onSubmit={handleSubmit}>
      {(isFetching || isLoading) && <Spinner />}
      <div className='group relative z-0 mb-6 w-full'>
        <input
          id='name'
          className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
          placeholder=' '
          value={student.name}
          onChange={handleChange('name')}
        />
        <label
          htmlFor='name'
          className='transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
        >
          Name
        </label>
      </div>
      <div className='group relative z-0 mb-6 w-full'>
        <input
          id='email'
          className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
          placeholder=' '
          onChange={handleChange('email')}
          value={student.email}
        />
        <label
          htmlFor='email'
          className='transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
        >
          Email
        </label>
      </div>
      <div className='group relative z-0 mb-6 w-full'>
        <input
          id='region'
          className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
          placeholder=' '
          onChange={handleChange('region')}
          value={student.region}
        />
        <label
          htmlFor='region'
          className='transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
        >
          Region
        </label>
      </div>

      <div className='grid md:grid-cols-2 md:gap-6'>
        <div className='group relative z-0 mb-6 w-full'>
          <input
            id='phone'
            className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
            placeholder=' '
            required
            onChange={handleChange('phone')}
            value={student.phone}
          />
          <label
            htmlFor='phone'
            className='transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
          >
            Phone number (123-456-7890)
          </label>
        </div>
        <div className='group relative z-0 mb-6 w-full'>
          <input
            id='address'
            className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
            placeholder=' '
            onChange={handleChange('address')}
            value={student.address}
          />
          <label
            htmlFor='address'
            className='transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
          >
            Address
          </label>
        </div>
      </div>
      <button
        type='submit'
        className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto'
      >
        Submit
      </button>
    </form>
  );
}

export default StudentForm;
