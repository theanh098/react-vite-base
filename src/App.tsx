import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDarkMode } from 'usehooks-ts';
import { useTheme } from './hook/useTheme';
import { getListStudents } from './sevice/student';
import clsx from 'clsx';
const LIMIT = 10;

function App() {
  const [_page, setPage] = useState(1);

  const { toggle } = useDarkMode();
  useTheme();

  const { data } = useQuery({
    queryKey: ['students', { _page, _limit: LIMIT }],
    queryFn: () => getListStudents({ _limit: LIMIT, _page }),
  });
  console.log(Array(9));
  return (
    <>
      <button onClick={toggle}>change mode</button>
      <div className='mt-32 grid'>
        <div className='relative m-auto w-[80%] overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='py-3 px-6'>
                  Id
                </th>
                <th scope='col' className='py-3 px-6'>
                  Name
                </th>
                <th scope='col' className='py-3 px-6'>
                  Email
                </th>
                <th scope='col' className='py-3 px-6'>
                  Phone
                </th>
                <th scope='col' className='py-3 px-6'>
                  Region
                </th>
                <th scope='col' className='py-3 px-6'>
                  Address
                </th>
                <th scope='col' className='py-3 px-6'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.list.map((student, index) => (
                <tr
                  className={clsx('border-b', 'dark:border-gray-700', {
                    ['bg-white']: index % 2 === 0,
                    ['bg-gray-50']: index % 2 !== 0,
                    ['dark:bg-gray-900']: index % 2 === 0,
                    ['dark:bg-gray-700']: index % 2 !== 0,
                  })}
                >
                  <td className='py-4 px-6'>{student.id}</td>

                  <th
                    scope='row'
                    className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'
                  >
                    {student.name}
                  </th>
                  <td className='py-4 px-6'>{student.email}</td>
                  <td className='py-4 px-6'>{student.phone}</td>
                  <td className='py-4 px-6'>{student.region}</td>
                  <td className='py-4 px-6'>{student.address}</td>

                  <td className='py-4 px-6'>
                    <button className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
                      Edit
                    </button>
                    <span> / </span>
                    <button className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='mt-8 grid'>
        <nav aria-label='Page navigation example' className='m-auto'>
          <ul className='inline-flex -space-x-px'>
            <li>
              <button className='ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                Previous
              </button>
            </li>
            {data?.list.length &&
              Array(Math.ceil(Number(data.count) / LIMIT))
                .fill(0)
                .map((_, index) => (
                  <li>
                    <button
                      className={clsx(
                        'border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                        {
                          ['bg-blue-50']: true,
                        }
                      )}
                    >
                      {index}
                    </button>
                  </li>
                ))}
            <li>
              <button className='rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default App;
